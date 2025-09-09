"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type VideoPreviewProps = {
  src: string;
};

export const VideoPreview = ({ src }: VideoPreviewProps) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;

    const video = document.createElement("video");
    video.src = src;
    video.crossOrigin = "anonymous";
    video.currentTime = 0.1;
    video.preload = "metadata";

    const capture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/png");
      setThumbnail(imageUrl);
    };

    video.addEventListener("loadeddata", capture);

    return () => {
      video.removeEventListener("loadeddata", capture);
    };
  }, [src]);

  if (!thumbnail) return null;

  return <Image src={thumbnail} alt="비디오 썸네일" width={100} height={100} />;
};
