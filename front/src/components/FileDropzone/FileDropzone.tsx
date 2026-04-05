"use client";

import { useState } from "react";
import { FileUploader } from "../FileUploader";
import type { CustomFile } from "../FileUploader";
import { uploadMediaFiles } from "@/api/uploadApi";

export const FileDropzone = () => {
  const [uploadedFiles, setUploadedFiles] = useState<CustomFile[]>([]);
  const [nickname, setNickname] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFilesChange = (files: CustomFile[]) => {
    setUploadedFiles(files);
  };

  const handleUpload = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요!");
      return;
    }
    if (uploadedFiles.length === 0) {
      alert("업로드할 파일을 선택해주세요!");
      return;
    }

    try {
      setIsUploading(true);
      const filesToUpload = uploadedFiles.map((f) => f.file);
      await uploadMediaFiles(nickname, filesToUpload);
      alert("업로드가 완료되었습니다!");
      // 초기화 로직이 필요하면 여기에 추가
      setUploadedFiles([]);
    } catch (error: any) {
      console.error(error);
      alert(
        error.response?.data?.error ||
          error.message ||
          "업로드 중 오류가 발생했습니다.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label
          htmlFor="nickname"
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
        >
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="홍길동"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </div>

      <FileUploader
        onFilesChange={handleFilesChange}
        options={{
          multiple: true,
          accept: {
            "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic"],
            "video/*": [".mp4", ".mov", ".webm"],
          },
        }}
      />

      <button
        onClick={handleUpload}
        disabled={isUploading || uploadedFiles.length === 0 || !nickname.trim()}
        style={{
          padding: "16px",
          backgroundColor:
            isUploading || uploadedFiles.length === 0 || !nickname.trim()
              ? "#ccc"
              : "#000",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor:
            isUploading || uploadedFiles.length === 0 || !nickname.trim()
              ? "not-allowed"
              : "pointer",
        }}
      >
        {isUploading ? "업로드 중..." : "사진/동영상 업로드하기"}
      </button>
    </div>
  );
};
