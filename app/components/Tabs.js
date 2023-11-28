"use client"
import React, { useState } from 'react';
import classNames from 'classnames';
import Positions from '../pages/Positions';
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
    <div className="flex m-6 w-100 h-100 flex-col">
      <div className="flex">
        {pages.map(page => (
        <button 
          className={classNames(
            "flex-1 w-[15.875rem] h-12 rounded-tl-lg rounded-tr-lg border-2 border-neutral-100/[.08]",
            activeTab === page.number 
            ? "text-indigo-500 border-b-transparent shadow-3xl"
            : "text-gray-300", 
          )} 
          onClick={() => handleTabClick(page.number)}
          key={page.number}
        >
            {page.title}
        </button>
        ))}
      </div>
      <div className="flex-shrink-0 w-100 h-[747px] border-t-transparent rounded-bl-lg rounded-br-lg border-2 border-[#ffffff]/[.08]">
        {activeTab === 2 && <Positions />}
      </div>
    </div>
  );
};

export default Tabs;
