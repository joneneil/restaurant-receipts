import React from 'react';
import { MenuItem } from '../types/receipt';
import { MenuItemInput } from './MenuItemInput';
import { Plus, Wand2, RefreshCw } from 'lucide-react';

interface ReceiptFormProps {
  restaurantName: string;
  date: Date;
  items: MenuItem[];
  total: number;
  onRestaurantNameChange: (name: string) => void;
  onDateChange: (date: Date) => void;
  onItemChange: (index: number, field: keyof MenuItem, value: string | number) => void;
  onItemDelete: (index: number) => void;
  onItemAdd: () => void;
  onTotalChange: (total: number) => void;
  onGenerate: () => void;
  onRefreshSerial: () => void;
}

export const ReceiptForm: React.FC<ReceiptFormProps> = ({
  restaurantName,
  date,
  items,
  total,
  onRestaurantNameChange,
  onDateChange,
  onItemChange,
  onItemDelete,
  onItemAdd,
  onTotalChange,
  onGenerate,
  onRefreshSerial,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          餐厅名称
        </label>
        <input
          type="text"
          value={restaurantName}
          onChange={(e) => onRestaurantNameChange(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            消费日期
          </label>
          <button
            onClick={onRefreshSerial}
            className="flex items-center text-blue-600 hover:text-blue-700"
            title="刷新流水号"
          >
            <RefreshCw size={16} className="mr-1" />
            刷新流水号
          </button>
        </div>
        <input
          type="datetime-local"
          value={date.toISOString().slice(0, 16)}
          onChange={(e) => onDateChange(new Date(e.target.value))}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            菜品明细
          </label>
          <button
            onClick={onItemAdd}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <Plus size={16} className="mr-1" />
            添加菜品
          </button>
        </div>
        {items.map((item, index) => (
          <MenuItemInput
            key={index}
            item={item}
            index={index}
            onChange={onItemChange}
            onDelete={onItemDelete}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label className="mr-2">总价:</label>
          <input
            type="number"
            value={total}
            onChange={(e) => onTotalChange(parseFloat(e.target.value) || 0)}
            className="w-32 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={onGenerate}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Wand2 size={16} className="mr-2" />
          智能生成
        </button>
      </div>
    </div>
  );
};