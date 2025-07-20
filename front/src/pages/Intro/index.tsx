import * as S from "./Intro.css";

const IntroPage = () => {
  return (
    <div className={S.IntroPageContainer}>
      <div className={S.BannerContainer}>
        <img alt="감사합니다 사진" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img className={S.MRImage} src="/images/MR1.JPG" alt="밍락이" />
        <img className={S.HandImage} src="/images/hands.png" alt="맞잡은 손" />
      </div>
      <p className="header">
        &quot;우리 손 잡을까요?&quot;
        <br />
      </p>
    </div>
  );
};

export default IntroPage;
