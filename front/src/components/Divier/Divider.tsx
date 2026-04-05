import Image from "next/image";
import * as S from "./Divider.css";

export const Divider = () => {
  return (
    <div className={S.Divider}>
      <Image
        className={S.DividerImg}
        width={460}
        height={42}
        alt="선"
        src="/images/divider.png"
      />
    </div>
  );
};
