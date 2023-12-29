import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';
import { UserStateType } from '@/types';

const { persistAtom } = recoilPersist();

const userState = atom<UserStateType>({
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
  effects_UNSTABLE: [persistAtom],
});

const modalState = atom({
  key: 'modalState',
  default: {
    isModalOpen: false,
  },
});

export { userState, selectedIconState, modalState };
