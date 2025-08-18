import { Flex } from "../common/Flex";
import { Typography } from "../common/Typography";
import * as S from "./Intro.css";

export const Intro = () => {
  return (
    <div className={S.IntroPageContainer}>
      <Flex vertical gap="xl">
        <Flex vertical gap="md">
          <Typography variant="title_02">게스트 스냅</Typography>
          <Typography>신랑 신부의 행복한 순간을 담아주세요</Typography>
        </Flex>
        <img className={S.MRImage} src="/images/MR1.JPG" alt="밍락이" />
        <img className={S.HandImage} src="/images/hands.png" alt="맞잡은 손" />
      </Flex>
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
