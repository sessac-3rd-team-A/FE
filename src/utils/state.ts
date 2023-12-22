import { atom } from 'recoil';

const nameState = atom({
  key: 'userState',
  default: '',
});

export { nameState };