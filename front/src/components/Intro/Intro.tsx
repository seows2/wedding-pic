import Image from "next/image";
import { Flex } from "../common/Flex";
import { Typography } from "../common/Typography";
import * as S from "./Intro.css";
import { Spacing } from "../common/Spacing";

export const Intro = () => {
  return (
    <div className={S.IntroPageContainer}>
      <Flex vertical gap="xl">
        <Flex vertical gap="md">
          <Typography variant="title_02">게스트 스냅</Typography>
          <Typography>신랑 신부의 행복한 순간을 담아주세요</Typography>
        </Flex>
        <Image
          className={S.MRImage}
          src="/images/MR1.JPG"
          alt="밍락이"
          width={345}
          height={460}
          priority
        />
        <Image
          className={S.HandImage}
          width={75}
          height={75}
          src="/images/hands.png"
          alt="맞잡은 손"
        />
      </Flex>
      <Spacing size={16} />
      <Flex vertical gap="md">
        <Typography variant="title_01">
          📸 함께 저희의 스냅작가가 되어주세요! 📸
        </Typography>
        <Flex vertical gap="xs">
          <Typography>[ 이런 순간들을 담아주세요! ]</Typography>
          <Typography>1. 행복한 신락 & 신밍 사진</Typography>
          <Typography>2. 신락 & 신밍 행진</Typography>
          <Typography>3. 행복한 신락&신밍 사진</Typography>
          <Typography>4. 행복한 신락&신밍 사진</Typography>
        </Flex>
      </Flex>
    </div>
  );
};
