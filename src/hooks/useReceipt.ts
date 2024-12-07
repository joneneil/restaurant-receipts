import { useState } from 'react';
import { Receipt, MenuItem } from '../types/receipt';
import { generateMenuItems, generateSerialNumber } from '../utils/mockAI';
import { calculateTotal } from '../utils/calculations';

export function useReceipt() {
  const [receipt, setReceipt] = useState<Receipt>({
    restaurantName: '美味餐厅',
    date: new Date(),
    items: [{ name: '', price: 0, quantity: 1 }],
    total: 0,
    serialNumber: generateSerialNumber(),
  });

  const handleItemChange = (index: number, field: keyof MenuItem, value: string | number) => {
    const newItems = [...receipt.items];
    newItems[index] = { ...newItems[index], [field]: value };
    const total = calculateTotal(newItems);
    setReceipt({ ...receipt, items: newItems, total });
  };

  const handleDeleteItem = (index: number) => {
    if (receipt.items.length === 1) {
      setReceipt({
        ...receipt,
        items: [{ name: '', price: 0, quantity: 1 }],
        total: 0,
      });
      return;
    }
    const newItems = receipt.items.filter((_, i) => i !== index);
    const total = calculateTotal(newItems);
    setReceipt({ ...receipt, items: newItems, total });
  };

  const addNewItem = () => {
    setReceipt({
      ...receipt,
      items: [...receipt.items, { name: '', price: 0, quantity: 1 }],
    });
  };

  const generateFromTotal = () => {
    const targetTotal = receipt.total || 100;
    const items = generateMenuItems(targetTotal);
    setReceipt({
      ...receipt,
      items,
      total: calculateTotal(items),
      serialNumber: generateSerialNumber(),
      date: new Date(),
    });
  };

  const refreshSerialNumber = () => {
    setReceipt({
      ...receipt,
      serialNumber: generateSerialNumber(),
      date: new Date(),
    });
  };

  const updateRestaurantName = (name: string) => {
    setReceipt({ ...receipt, restaurantName: name });
  };

  const updateDate = (date: Date) => {
    setReceipt({ ...receipt, date });
  };

  const updateTotal = (total: number) => {
    setReceipt({ ...receipt, total });
  };

  return {
    receipt,
    handlers: {
      handleItemChange,
      handleDeleteItem,
      addNewItem,
      generateFromTotal,
      refreshSerialNumber,
      updateRestaurantName,
      updateDate,
      updateTotal,
    },
  };
}