import Koa from 'koa';
import cors from '@koa/cors';
import dotenv from 'dotenv';
import uploadRouter from './routes/upload';

dotenv.config();

const app = new Koa();
const PORT = process.env.PORT || 3000;

// CORS 설정
app.use(cors());

// 에러 핸들링 미들웨어
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: err.message || 'Internal Server Error',
    };
    ctx.app.emit('error', err, ctx);
  }
});

// 업로드 라우터 등록
app.use(uploadRouter.routes());
app.use(uploadRouter.allowedMethods());

// 기본 헬스 체크 라우트
app.use(async (ctx, next) => {
  if (ctx.path === '/') {
    ctx.body = "Wedding Pic API Server is running.";
  } else {
    await next();
  }
});

app.on('error', (err, ctx) => {
  console.error('Server error:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
