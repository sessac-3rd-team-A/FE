// my-shop details
export interface ShopApiRes {
  items: Array<{
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
  }>;
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
export interface ProfileResultType {
  calendar: {
    date: string;
    result: SighResultType;
  }[];
  error: null | string;
  monthlyStatistics: {
    [date: string]: {
      positiveRatio: number;
      negativeRatio: number;
      neutralRatio: number;
    };
  };
}

// recoil user
export interface UserStateType {
  userId: string;
  nickname: string;
  age: string;
  gender: string;
  isLogin: boolean;
}
