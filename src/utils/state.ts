import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';
import { IUserState } from '@/types';

const { persistAtom } = recoilPersist();

const userState = atom<IUserState>({
  key: 'userState',
  default: {
    userId: '',
    nickname: '',
    age: '',
    gender: '',
    isLogin: false,
  },
  effects_UNSTABLE: [persistAtom],
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

