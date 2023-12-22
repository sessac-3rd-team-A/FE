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

// diary result
export interface sighResultType {
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

// profile result (array)
export type profileResultType = sighResultType[];
