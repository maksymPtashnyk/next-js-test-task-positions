"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Tab1 from '../pages/tab1';
import Tab2 from '../pages/tab2';
import Tab3 from '../pages/tab3';
import Tab4 from '../pages/tab4';

const pages = [
  {
    number: 1,
    title: 'Иерархия'
  },
  {
    number: 2,
    title: 'Должности'
  },
  {
    number: 3,
    title: 'Список персонала'
  },
  {
    number: 4,
    title: 'Наборы экипировки'
  }
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (number) => {
    setActiveTab(number);
  };

  return (
    <div className=" m-6 border-2 rounded-lg">
      <div className="flex">
        {pages.map(page => (
        <button 
          className={activeTab === page.number 
            ? " flex-initial p-4 text-violet-500 bg-gray-800 rounded-t-lg border-gray-400 border-2 border-b-0" 
            : "text-gray-300 border-gray-400 border-2 rounded-lg"} 
          onClick={() => handleTabClick(page.number)}
          key={page.number}
        >
            {page.title}
        </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === 1 && <Tab1 />}
        {activeTab === 2 && <Tab2 />}
        {activeTab === 3 && <Tab3 />}
        {activeTab === 4 && <Tab4 />}
      </div>
    </div>
  );
};

export default Tabs;
