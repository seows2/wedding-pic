import { google } from 'googleapis';
import { Readable } from 'stream';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

export const uploadFileToDrive = async (file: any): Promise<{ id: string | null; link: string | null }> => {
  try {
    const credentialsStr = process.env.GOOGLE_CREDENTIALS_JSON;
    if (!credentialsStr) {
      throw new Error("GOOGLE_CREDENTIALS_JSON environment variable is not defined.");
    }

    const credentials = JSON.parse(credentialsStr);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    const drive = google.drive({ version: 'v3', auth });
    
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    
    // multer memoryStorage() 사용 가정 (file.buffer)
    const fileMetadata = {
      name: file.originalname,
      parents: folderId ? [folderId] : undefined,
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
