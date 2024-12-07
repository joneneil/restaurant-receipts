import { MenuItem } from '../types/receipt';

const mockMenuItems: MenuItem[] = [
  { name: '宫保鸡丁', price: 38, quantity: 1 },
  { name: '麻婆豆腐', price: 28, quantity: 1 },
  { name: '水煮鱼', price: 68, quantity: 1 },
  { name: '青椒土豆丝', price: 18, quantity: 1 },
  { name: '蒜蓉空心菜', price: 22, quantity: 1 },
  { name: '番茄蛋汤', price: 16, quantity: 1 },
  { name: '红烧肉', price: 58, quantity: 1 },
  { name: '清炒时蔬', price: 24, quantity: 1 },
  { name: '酸菜鱼', price: 66, quantity: 1 },
  { name: '白切鸡', price: 48, quantity: 1 },
  { name: '可乐', price: 6, quantity: 1 },
  { name: '矿泉水', price: 3, quantity: 1 },
];

export const generateMenuItems = (targetTotal: number): MenuItem[] => {
  let items: MenuItem[] = [];
  let currentTotal = 0;
  const maxAttempts = 10;
  let attempts = 0;

  while (currentTotal < targetTotal && attempts < maxAttempts) {
    const remainingAmount = targetTotal - currentTotal;
    const availableItems = mockMenuItems.filter(item => item.price <= remainingAmount);
    
    if (availableItems.length === 0) break;
    
    const randomItem = {...availableItems[Math.floor(Math.random() * availableItems.length)]};
    const maxQuantity = Math.floor(remainingAmount / randomItem.price);
    randomItem.quantity = Math.min(Math.floor(Math.random() * 3) + 1, maxQuantity);
    
    items.push(randomItem);
    currentTotal += randomItem.price * randomItem.quantity;
    attempts++;
  }
  
  return items;
};

export const generateSerialNumber = (): string => {
  const date = new Date();
  const dateStr = date.getFullYear().toString().slice(-2) +
                 (date.getMonth() + 1).toString().padStart(2, '0') +
                 date.getDate().toString().padStart(2, '0');
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `RN${dateStr}${randomNum}`;
};

export const calculateDiscount = (total: number): number => {
  if (total >= 500) return 0.85;
  if (total >= 300) return 0.9;
  if (total >= 200) return 0.95;
  return 1;
};