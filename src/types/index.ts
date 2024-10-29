export interface Product {
  id: number;
  brand: string;
  model: string;
  part: string;
  color: string;
  stock: number;
  retailPrice: number;
  wholesalePrice: number;
  partPrice: number;
}

export interface UnlockDevice {
  id: number;
  brand: string;
  model: string;
  version: string;
  security: string;
  baseband: string;
  googleLock: boolean;
  canUnlock: boolean;
  versionOptions: string[];
  securityOptions: string[];
  basebandOptions: string[];
}

export interface Quote {
  id: number;
  product: string;
  price: number;
  retailPrice: number;
  wholesalePrice: number;
  unitPrice: number;
  shipping: number;
  link: string;
}