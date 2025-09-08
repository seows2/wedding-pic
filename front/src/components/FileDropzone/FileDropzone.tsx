"use client";

import { useState } from "react";
import { FileUploader } from "./FileUploader";

export const FileDropzone = () => {
  const [files, setFiles] = useState<string[]>([]);

  const handleLoad = (result: string | ArrayBuffer | null) => {
    if (!result) return;
    if (typeof result !== "string") return;
    setFiles((prev) => [...prev, result]);
  };

  return (
    <FileUploader
      readAs="readAsDataURL"
      options={{
        onDropRejected(fileRejections) {
          alert("지원하지 않는 포맷입니다.");
        },
        onDropAccepted(files, event) {
          console.log(files);
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
      test
    </FileUploader>
  );
};
