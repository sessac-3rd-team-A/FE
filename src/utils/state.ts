import { atom } from 'recoil';

const userState = atom({
  key: 'userState',
  default: {
    userId: '',
    password: ''}
});

const selectedIconState = atom({
  key: 'selectedIconState',
  default: 2,
});

const selectedImageState = atom({
  key: 'selectedImageState',
  default: '/images/profileMenu_2.svg',
});

export { userState, selectedIconState, selectedImageState };