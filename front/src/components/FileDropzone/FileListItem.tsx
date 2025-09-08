import { DropzoneFile } from "./FileUploader";
import * as S from "./FileListItem.css";

export interface FileListItemProps {
  file: DropzoneFile;
  removeFile?: (file: DropzoneFile) => void;
}

export const FileListItem = (props: FileListItemProps) => {
  const { file: customFile, removeFile } = props;

  const { file, progress } = customFile;

  if (progress && file.size > progress) {
    return (
      <>
        <progress max={file.size} value={progress} />
        {Math.round((progress / file.size) * 100)}
      </>
    );
  }
  if (progress) {
    console.log(Math.round((progress / file.size) * 100));
  }

  return <div className={S.FileListItemWrap}></div>;
};
