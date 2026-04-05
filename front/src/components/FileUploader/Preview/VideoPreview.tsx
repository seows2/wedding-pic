"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import * as S from "./VideoPreview.css";

type VideoPreviewProps = {
  src: string; // Object URL (blob:...)
};

export const VideoPreview = ({ src }: VideoPreviewProps) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;

    const video = document.createElement("video");
    video.src = src;
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;

    // 0.5초 지점으로 이동 (검은 첫 프레임 방지)
    video.currentTime = 0.5;

    const captureThumbnail = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setThumbnail(canvas.toDataURL("image/jpeg", 0.8));
      }
    };

    // 'seeked' 이벤트가 발생했을 때(0.5초 이동 완료 후) 캡처
    video.addEventListener("seeked", captureThumbnail);

    return () => {
      video.removeEventListener("seeked", captureThumbnail);
    };
  }, [src]);

  return (
    <div className={S.container}>
      {/* 우측 상단 비디오 표시 태그 */}
      <div className={S.videoIcon}>
        <span>🎥</span> VIDEO
      </div>

      {thumbnail ? (
        <Image
          src={thumbnail}
          alt="Video Thumbnail"
          fill
          sizes="(max-width: 460px) 33vw, 150px"
          className={S.thumbnail}
        />
      ) : (
        <div className={S.loadingPlaceholder}>
          <span>...</span>
        </div>
      )}
    </div>
  );
};
