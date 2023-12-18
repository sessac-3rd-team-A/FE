import Image from 'next/image';

import '@/styles/profile/diaryModal.scss';

export default function DiaryModal() {
  return (
    <div className="diaryModal-container">
      <div className="date">2023.12.08</div>
      <Image
        src="/images/profileShop_background.jpg"
        alt="picture diary"
        width={300}
        height={400}
      />
    </div>
  );
}
