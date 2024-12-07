export interface MenuItem {
  name: string;
  price: number;
  quantity: number;
}

export interface Receipt {
  restaurantName: string;
  date: Date;
  items: MenuItem[];
  total: number;
  serialNumber: string;
  discount?: number;
  finalTotal?: number;
}