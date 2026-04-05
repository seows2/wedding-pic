import axios from 'axios';

// 백엔드 URL이 환경 변수에 없을 경우 기본값으로 localhost:3000 사용
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * 여러 개의 사진 및 동영상 파일을 백엔드로 전송하는 API 함수
 * @param {string} nickname - 업로드하는 사용자의 닉네임 (백엔드 폴더명으로 사용됨)
 * @param {File[]} fileList - 업로드할 File 객체들의 배열
 * @returns {Promise<{ id: string; link: string }[]>} 업로드된 파일들의 구글 드라이브 정보
 */
export const uploadMediaFiles = async (nickname: string, fileList: File[]) => {
  if (!fileList || fileList.length === 0) {
    throw new Error('업로드할 파일이 없습니다.');
  }

  if (!nickname || nickname.trim() === '') {
    throw new Error('닉네임을 입력해주세요.');
  }

  // 백엔드의 multer.array('files') 설정에 맞게 FormData를 구성합니다.
  const formData = new FormData();
  
  formData.append('nickname', nickname);

  fileList.forEach((file) => {
    formData.append('files', file);
  });

  try {
    const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // 서버에서 보내주는 응답 데이터: { message, results }
    return response.data.results;
  } catch (error) {
    console.error('파일 업로드 에러:', error);
    throw error;
  }
};
