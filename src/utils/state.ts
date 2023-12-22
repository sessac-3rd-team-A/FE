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

export { userState };
