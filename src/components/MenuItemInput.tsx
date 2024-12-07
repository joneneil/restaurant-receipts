import React from 'react';
import { MenuItem } from '../types/receipt';
import { Trash2 } from 'lucide-react';

interface MenuItemInputProps {
  item: MenuItem;
  index: number;
  onChange: (index: number, field: keyof MenuItem, value: string | number) => void;
  onDelete: (index: number) => void;
}

export const MenuItemInput: React.FC<MenuItemInputProps> = ({
  item,
  index,
  onChange,
  onDelete,
}) => {
  return (
    <div className="flex gap-2 items-center mb-2">
      <input
        type="text"
        value={item.name}
        onChange={(e) => onChange(index, 'name', e.target.value)}
        placeholder="菜品名称"
        className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="number"
        value={item.price}
        onChange={(e) => onChange(index, 'price', parseFloat(e.target.value) || 0)}
        placeholder="单价"
        min="0"
        step="0.1"
        className="w-24 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="number"
        value={item.quantity}
        onChange={(e) => onChange(index, 'quantity', parseInt(e.target.value) || 0)}
        placeholder="数量"
        min="1"
        className="w-20 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={() => onDelete(index)}
        className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
        title="删除"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};