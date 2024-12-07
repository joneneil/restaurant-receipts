import { MenuItem } from '../types/receipt';

export const calculateTotal = (items: MenuItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const formatCurrency = (amount: number): string => {
  return `¥${amount.toFixed(2)}`;
};