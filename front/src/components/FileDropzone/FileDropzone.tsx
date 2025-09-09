"use client";

import { useState } from "react";
import { FileUploader } from "../FileUploader";
import { ImagePreview } from "./ImagePreview";
import { VideoPreview } from "./VideoPreview";

export const FileDropzone = () => {
  const [imagesSrc, setImagesSrc] = useState<string[]>([]);

  const handleLoad = (result: string | ArrayBuffer | null) => {
    if (!result) return;
    if (typeof result !== "string") return;
    setImagesSrc((prev) => [...prev, result]);
  };

  return (
    <FileUploader
      readAs="readAsDataURL"
      options={{
        onDropRejected(fileRejections) {
          alert("지원하지 않는 포맷입니다.");
        },
        onDropAccepted(files, event) {
          alert(JSON.stringify(files));
        },
        accept: {
          "image/*": [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".webp",
            ".heic",
            ".heif",
          ],
          "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"],
        },
        multiple: true,
        maxFiles: 20,
      }}
      onLoad={handleLoad}
    >
      {imagesSrc.map((src, idx) => {
        const isImage = src.startsWith("data:image");
        alert(src);

        return isImage ? (
          <ImagePreview key={idx} src={src} />
        ) : (
          <VideoPreview key={idx} src={src} />
        );
      })}
    </FileUploader>
  );
};
