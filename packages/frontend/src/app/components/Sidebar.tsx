import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <button className="w-full text-left p-2 mb-4 bg-gray-700 rounded-md hover:bg-gray-600">
        + New Invoice
      </button>
      <nav className="flex-grow">
        <h2 className="text-sm font-semibold text-gray-400 mb-2">History</h2>
        {/* This will be populated with real data later */}
        <ul className="space-y-2">
          <li className="p-2 rounded-md hover:bg-gray-700 cursor-pointer">Acme Corp - $500.00</li>
          <li className="p-2 rounded-md hover:bg-gray-700 cursor-pointer">Test Client LLC - $1350.00</li>
        </ul>
      </nav>
      <div>
        {/* User profile section */}
      </div>
    </aside>
  );
};

export default Sidebar;
