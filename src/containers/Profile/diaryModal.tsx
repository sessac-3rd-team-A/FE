import Image from 'next/image';

import '@/styles/profile/diaryModal.scss';

export default function DiaryModal() {
  return (
    <div className="diaryModal-container">
      <div className="date">2023.12.08</div>
      <div className="img">
        <Image
          src="/images/profileShop_background.jpg"
          alt="picture diary"
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw"
        />
      </div>
    </div>
  );
}
