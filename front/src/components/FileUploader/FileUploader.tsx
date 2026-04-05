"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import { ImagePreview, VideoPreview } from "./Preview";
import * as S from "./FileUploader.css";

export type CustomFile = {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
};

export type FileUploaderProps = {
  options?: DropzoneOptions;
  onFilesChange?: (files: CustomFile[]) => void;
};

export const FileUploader = ({ options, onFilesChange }: FileUploaderProps) => {
  const [files, setFiles] = useState<CustomFile[]>([]);

  const filesRef = useRef(files);
  filesRef.current = files; // 최신 상태의 files를 유지하여 언마운트 시 정확히 해제

  // 컴포넌트 언마운트 시 메모리 해제
  useEffect(() => {
    return () => {
      filesRef.current.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        alert("지원하지 않는 형식이거나 파일이 너무 큽니다.");
      }

      const newFiles = acceptedFiles.map((file) => ({
        id: `${file.name}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
        type: (file.type.startsWith("video/") ? "video" : "image") as
          | "video"
          | "image",
      }));

      setFiles((prev) => {
        const combined =
          options?.multiple === false ? newFiles : [...prev, ...newFiles];
        const nextFiles = combined.slice(0, options?.maxFiles ?? 20); // 최대 개수 제한 반영
        onFilesChange?.(nextFiles); // useEffect 대신 이벤트 핸들러에서 직접 부모에게 전송 (React 권장 패턴)
        return nextFiles;
      });
    },
    [options?.multiple, options?.maxFiles, onFilesChange],
  );

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.preview); // 메모리 해제

      const nextFiles = prev.filter((f) => f.id !== id);
      onFilesChange?.(nextFiles); // 삭제 이벤트 핸들러에서 직접 부모에게 전송
      return nextFiles;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...options,
    useFsAccessApi: false,
    onDrop,
  });

  return (
    <div className={S.container}>
      {/* 업로드 영역 */}
      <div
        {...getRootProps({
          className: S.dropzone({
            isDragActive,
            hasFiles: files.length > 0,
          }),
        })}
      >
        <input {...getInputProps({ style: { display: "none" } })} />
        <div style={{ pointerEvents: "none" }}>
          <span style={{ fontSize: "32px" }}>{isDragActive ? "📥" : "📸"}</span>
          <p style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
            {isDragActive
              ? "여기에 놓으세요!"
              : "사진이나 영상을 추가해주세요."}
          </p>
        </div>
      </div>

      {/* 프리뷰 영역 */}
      {files.length > 0 && (
        <div className={S.previewGrid}>
          {files.map((file) => (
            <div key={file.id} style={{ position: "relative" }}>
              {file.type === "image" ? (
                <ImagePreview src={file.preview} />
              ) : (
                <VideoPreview src={file.preview} />
              )}
              {/* 삭제 버튼 */}
              <button
                onClick={() => removeFile(file.id)}
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  background: "black",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "12px",
                  border: "none",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
