import React from 'react';

// Define the shape of the line items and the main invoice data
interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceCardProps {
  invoiceData: {
    clientName: string;
    invoiceDate: string;
    lineItems: LineItem[];
    totalAmount: number;
  };
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoiceData }) => {
  // A simple function to format numbers as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md min-w-[350px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{invoiceData.clientName}</h3>
        <span className="text-sm text-gray-500">{invoiceData.invoiceDate}</span>
      </div>
      
      <div className="border-t border-gray-200">
        {invoiceData.lineItems.map((item, index) => (
          <div key={index} className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-700">{item.description} ({item.quantity} x {formatCurrency(item.unitPrice)})</span>
            <span className="font-medium text-gray-800">{formatCurrency(item.quantity * item.unitPrice)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-lg font-bold text-gray-900">{formatCurrency(invoiceData.totalAmount)}</span>
      </div>
    </div>
  );
};

export default InvoiceCard;
