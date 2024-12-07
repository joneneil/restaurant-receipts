import React from 'react';
import { Receipt as ReceiptIcon } from 'lucide-react';
import { Receipt } from './components/Receipt';
import { ReceiptForm } from './components/ReceiptForm';
import { useReceipt } from './hooks/useReceipt';

function App() {
  const { receipt, handlers } = useReceipt();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <ReceiptIcon className="mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">小票生成器</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <ReceiptForm
            restaurantName={receipt.restaurantName}
            date={receipt.date}
            items={receipt.items}
            total={receipt.total}
            onRestaurantNameChange={handlers.updateRestaurantName}
            onDateChange={handlers.updateDate}
            onItemChange={handlers.handleItemChange}
            onItemDelete={handlers.handleDeleteItem}
            onItemAdd={handlers.addNewItem}
            onTotalChange={handlers.updateTotal}
            onGenerate={handlers.generateFromTotal}
            onRefreshSerial={handlers.refreshSerialNumber}
          />
          <div>
            <Receipt receipt={receipt} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;