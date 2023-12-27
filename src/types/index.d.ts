// my-shop details
export interface ShopApiRes {
  title: string;
  link: string;
  image: string;
  lprice: number;
  hprice: number;
  mallName: string;
  productId: number;
  productType: number;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

export interface ShoppingApiResponse {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: ShoppingItem[];
}

export interface TokenType {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface userDataType {
  userId: string;
  age: string;
  gender: string;
}

// diary result
export interface SighResultType {
  id: number;
  userId: string | null;
  pictureDiary: string;
  recommendedGif: string;
  sentiment: string;
  positiveRatio: number;
  negativeRatio: number;
  neutralRatio: number;
  date: string;
  // date: Date;
}

// profile result
export interface ProfileRatioType {
  currentMonthStatistics: {
    positiveRatio: number;
    negativeRatio: number;
    neutralRatio: number;
  };
}

export interface ProfileCalendarType {
  error: null | string;
  calendar: {
    date: string;
    result: SighResultType;
  }[];
}

// recoil user
export interface UserStateType {
  userId: string;
  nickname: string;
  age: string;
  gender: string;
  isLogin: boolean;
}
