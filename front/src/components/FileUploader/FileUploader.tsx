import * as S from "./FileUploader.css";

export const FileUploader = () => {
  return (
    <div className={S.FileUploaderContainer}>
      <input type="file" multiple />
    </div>
  );
};
