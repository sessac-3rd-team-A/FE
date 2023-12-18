import '@/styles/main.scss';

export default function MainPage() {
  return (
    <div className="mainWindContainer">
      <img className="mainWindImg" src="/main/mainBlow.png" alt="바람" />
      <img
        className="mainFace mainSmileImg"
        src="/main/main_smile.png"
        alt="행복한얼굴"
      />
      <img className="mainFace mainStar3" src="/main/Star3.png" alt="스타3" />
      <img className="mainFace mainStar4" src="/main/Star4.png" alt="스타4" />
      <img className="mainFace mainStar1" src="/main/Star1.png" alt="스타1" />
      <img
        className="mainFace mainBadImg"
        src="/main/main_bad.png"
        alt="나쁜얼굴"
      />
      <img
        className="mainFace mainSadImg"
        src="/main/main_sad.png"
        alt="슬픈얼굴"
      />
      <img
        className="mainFace mainDieImg"
        src="/main/main_die.png"
        alt="죽은얼굴"
      />
      <p className="mainFace mainTitle">AH-WHEW!</p>
      <p className="mainContent">
        {`Give Me Your Sigh.\nI'll Give You Happiness.`}
      </p>
    </div>
  );
}
