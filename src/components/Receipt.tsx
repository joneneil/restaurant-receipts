import React from 'react';
import { Receipt as ReceiptType } from '../types/receipt';
import { format } from 'date-fns';
import { calculateDiscount } from '../utils/mockAI';

interface ReceiptProps {
  receipt: ReceiptType;
}

export const Receipt: React.FC<ReceiptProps> = ({ receipt }) => {
  const discount = calculateDiscount(receipt.total);
  const finalTotal = receipt.total * discount;

  return (
    <div className="bg-white p-8 max-w-md mx-auto shadow-lg rounded-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{receipt.restaurantName}</h2>
        <p className="text-gray-600">
          {format(receipt.date, 'yyyy年MM月dd日 HH:mm:ss')}
        </p>
        <p className="text-sm text-gray-500">流水号: {receipt.serialNumber}</p>
      </div>

      <div className="border-t border-b py-4 my-4">
        <div className="grid grid-cols-4 font-semibold mb-2 text-sm">
          <div className="col-span-2">品名</div>
          <div>单价</div>
          <div>小计</div>
        </div>
        {receipt.items.map((item, index) => (
          <div key={index} className="grid grid-cols-4 text-gray-600 py-1 text-sm">
            <div className="col-span-2">{item.name} × {item.quantity}</div>
            <div>¥{item.price.toFixed(2)}</div>
            <div>¥{(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="text-right space-y-1">
        <p className="text-gray-600">
          原价: ¥{receipt.total.toFixed(2)}
        </p>
        {discount < 1 && (
          <p className="text-blue-600">
            折扣: {(discount * 100).toFixed(0)}%
          </p>
        )}
        <p className="text-xl font-bold">
          实付: ¥{finalTotal.toFixed(2)}
        </p>
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>谢谢惠顾，欢迎再次光临！</p>
        <p className="mt-1">请保管好小票</p>
      </div>
    </div>
  );
};