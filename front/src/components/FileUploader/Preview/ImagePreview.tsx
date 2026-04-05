import Image from "next/image";
import * as S from "./ImagePreview.css";

type ImagePreviewProps = {
  src: string;
};

export const ImagePreview = ({ src }: ImagePreviewProps) => {
  return (
    <div className={S.container}>
      <Image
        className={S.thumbnail}
        src={src}
        width={500}
        height={500}
        sizes="(max-width: 460px) 50vw, 230px"
        alt="업로드 사진"
      />
    </div>
  );
};
