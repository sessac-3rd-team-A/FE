'use client';
import '@/styles/main.scss';
import '@/styles/profile/profileMenu.scss';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectedIconState } from '@/utils/state';
import Link from 'next/link';

export default function ProfileMenu() {
  const [selectedIcon, setSelectedIcon] = useRecoilState(selectedIconState);
  // const [selectedIcon, setSelectedIcon] = useState(2);
  const [selectedImage, setSelectedImage] = useState(`/images/profileMenu/profileMenu_${selectedIcon}.svg`);

  const handleIconClick = (index: number) => {
    setSelectedImage(`/images/profileMenu/profileMenu_${index}.svg`)
    setSelectedIcon(index)
  };

  useEffect(() => {}, [selectedImage]);
  const link: (index: number) => string = (index: number) => {
    switch (index) {
      case 1:
        return '/profile/my-shop';
      case 2:
        return '/profile';
      case 3:
        return '/profile/account';
      default:
        return '/profile';
    }
  };

  return (
    <div className="profile-menu-container">
      <nav className="profile-menu-nav">
        <div className="profile-menu-detail">
          {[1, 2, 3].map((index) => (
            <Link key={index} href={link(index)}>
              <div
                key={index}
                className={
                  selectedIcon === index
                    ? 'icon-selected-circle'
                    : 'icon-unselected-circle'
                }
                onClick={() =>
                  handleIconClick(index)
                }
              >
              <img
                src={`/images/profileMenu/profileMenu_icon${index}.svg`}
                alt={`아이콘 ${index}`}
                className={`icon`}
              />
              </div>
            </Link>
          ))}
        </div>
      </nav>
      <img src={selectedImage} alt="메뉴바" className="profile-menu-bottom" />
    </div>
  );
}
