import Router from '@koa/router';
import multer from '@koa/multer';
import { uploadFileToDrive, getOrCreateFolder } from '../services/googleDrive';

const router = new Router();

// 메모리 스토리지 사용 - 파일을 디스크에 저장하지 않고 버퍼 형태로 유지
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 동영상 업로드를 고려하여 100MB로 제한 증가
  },
});

// 여러 개의 파일을 받을 수 있도록 upload.array('files', 최대개수) 사용
router.post('/api/upload', upload.array('files', 20), async (ctx) => {
  try {
    // 폼 데이터에서 nickname 추출
    const { nickname } = ((ctx.request as any).body || {}) as { nickname?: string };
    
    // 여러 파일이므로 ctx.files를 사용합니다.
    const files = ctx.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      ctx.status = 400;
      ctx.body = { error: 'No files uploaded.' };
      return;
    }

    if (!nickname) {
      ctx.status = 400;
      ctx.body = { error: 'Nickname is required.' };
      return;
    }

    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!rootFolderId) {
      throw new Error("GOOGLE_DRIVE_FOLDER_ID is missing from environment variables.");
    }

    // 해당 닉네임 폴더가 있는지 확인하고 없으면 생성하여 ID를 가져옵니다.
    const targetFolderId = await getOrCreateFolder(nickname, rootFolderId);

    // 배열로 들어온 파일들을 병렬로 구글 드라이브(해당 닉네임 폴더)에 업로드합니다.
    const uploadPromises = files.map(file => uploadFileToDrive(file, targetFolderId));
    const results = await Promise.all(uploadPromises);

    ctx.status = 200;
    ctx.body = {
      message: `${files.length} files uploaded successfully for ${nickname}!`,
      results: results, // 업로드된 파일들의 id와 link 배열 반환
    };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = {
      error: 'Failed to upload files.',
      details: error.message,
    };
  }
});

export default router;
