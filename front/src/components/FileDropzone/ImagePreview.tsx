import Image from "next/image";

type ImagePreviewProps = {
  src: string;
};

export const ImagePreview = ({ src }: ImagePreviewProps) => {
  return <Image src={src} width={100} height={100} alt="업로드 사진" />;
};
