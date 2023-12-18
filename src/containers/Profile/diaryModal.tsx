import Image from 'next/image';

import '@/styles/profile/diaryModal.scss';

export default function DiaryModal() {
  return (
    <div className="diaryModal-container">
      <div className="date">2023.12.08</div>
      <Image
        src="/images/profile_background.png"
        width={500}
        height={500}
        alt="picture diary"
      />
    </div>
  );
}
