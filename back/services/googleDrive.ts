import { google } from 'googleapis';
import { Readable } from 'stream';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const getDriveClient = () => {
  const credentialsStr = process.env.GOOGLE_CREDENTIALS_JSON;
  if (!credentialsStr) {
    throw new Error("GOOGLE_CREDENTIALS_JSON environment variable is not defined.");
  }

  const credentials = JSON.parse(credentialsStr);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });

  return google.drive({ version: 'v3', auth });
};

export const getOrCreateFolder = async (folderName: string, parentFolderId: string): Promise<string> => {
  const drive = getDriveClient();
  
  // 1. Check if folder already exists
  const query = `name='${folderName.replace(/'/g, "\\'")}' and '${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  
  const res = await drive.files.list({
    q: query,
    spaces: 'drive',
    fields: 'files(id, name)',
  });
  
  if (res.data.files && res.data.files.length > 0) {
    if(res.data.files[0].id) {
       return res.data.files[0].id;
    }
  }
  
  // 2. If not, create a new folder
  const fileMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [parentFolderId],
  };
  
  const folder = await drive.files.create({
    requestBody: fileMetadata,
    fields: 'id',
  });
  
  if (!folder.data.id) {
    throw new Error("Failed to create folder");
  }
  
  return folder.data.id;
};

export const uploadFileToDrive = async (file: any, targetFolderId: string): Promise<{ id: string | null; link: string | null }> => {
  try {
    const drive = getDriveClient();
    
    // multer memoryStorage() 사용 가정 (file.buffer)
    const fileMetadata = {
      name: file.originalname,
      parents: [targetFolderId],
    };

    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    return {
      id: response.data.id || null,
      link: response.data.webViewLink || null,
    };
  } catch (error) {
    console.error('Error uploading file to Drive:', error);
    throw error;
  }
};
