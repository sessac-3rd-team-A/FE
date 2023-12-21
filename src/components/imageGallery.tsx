// components/ImageGallery.tsx

import React, { useState, useEffect } from 'react';

interface ImageGalleryProps {
  category: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ category }) => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    // 백엔드에서 이미지를 가져오는 비동기 함수 호출
    fetchImages();
  }, [category]);

  const fetchImages = async () => {
    try {
      // 가상의 이미지 데이터를 가져오는 API 호출을 대신하여 하드코딩된 이미지 URL을 사용
      // 이 부분에서 실제로 백엔드로 요청을 보내 데이터를 받아오는 로직을 추가해야 합니다.
      const data = getDummyImageData(category);
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const getDummyImageData = (category: string) => {
    // 더미 이미지 데이터 생성
    return Array.from(
      { length: 10 },
      (_, index) =>
        `https://via.placeholder.com/150?text=${category}_${index + 1}`,
    );
  };

  const handleButtonClick = (index: number) => {
    // 클릭한 버튼의 이미지 인덱스를 선택된 이미지 인덱스로 설정
    setSelectedImageIndex(index);
    console.log(`Clicked button ${index} for category ${category}`);
  };

  return (
    <div>
      <div>{category} 이미지 갤러리</div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
            <button onClick={() => handleButtonClick(index)}>
              Button {index + 1}
            </button>
          </div>
        ))}
      </div>
      {selectedImageIndex !== null && (
        <div style={{ textAlign: 'center' }}>
          <img
            src={images[selectedImageIndex]}
            alt={`${category} 이미지 ${selectedImageIndex + 1}`}
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'cover',
              marginBottom: '10px',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
