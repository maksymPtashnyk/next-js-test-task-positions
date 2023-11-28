import classNames from "classnames";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Positions = () => {
  const [positions, setPositions] = useState([
    {
      id: "position-1",
      name: "Должность 1",
      categories: {
        trade: {
          'Продавать продукты': false,
          'Выставлять цены': false,
          'Смотреть аналитику': false,
        },
        conflicts: {
          'Дуель': false,
          'Выставлять претензии': false,
        },
        production: {
          'Закупать сырье': false,
          'Назначать рабочих': false,
        },
        management: {
          'Назначать должности': false,
          'Выгонять из банды': false,
        },
      },
    },
  ]);

  const [editName, setEditName] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(0);

  const handleCreatePosition = () => {
    const newPosition = {
      id: `position-${positions.length + 1}`,
      name: "Новобранец",
      categories: {
        trade: {
          'Продавать продукты': false,
          'Выставлять цены': false,
          'Смотреть аналитику': false,
        },
        conflicts: {
          'Дуель': false,
          'Выставлять претензии': false,
        },
        production: {
          'Закупать сырье': false,
          'Назначать рабочих': false,
        },
        management: {
          'Назначать должности': false,
          'Выгонять из банды': false,
        },
      },
    };
    setPositions([...positions, newPosition]);
  };

  const handleEditName = (e) => {
    setEditName(e.target.value);
  };

  const handleCheckboxChange = (categoryName, checkboxName) => {
    const updatedPositions = [...positions];
    updatedPositions[selectedPosition].categories[categoryName][checkboxName] = !updatedPositions[selectedPosition].categories[categoryName][checkboxName];
    setPositions(updatedPositions);
  };

  useEffect(() => {
    setEditName(positions[selectedPosition].name);
  }, [selectedPosition, positions]);

  const handleSave = () => {
    if (editName.trim() !== "") {
      const updatedPositions = [...positions];
      updatedPositions[selectedPosition].name = editName;
      setPositions(updatedPositions);
    }
  };

  const handleDragStart = (e, index) => {
    const isDotClicked = e.target.tagName === 'IMG';
    if (isDotClicked) {
      e.dataTransfer.setData('index', index.toString());
    } else {
      e.preventDefault();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const dropIndex = parseInt(e.dataTransfer.getData('index'));
    const dragIndex = parseInt(e.currentTarget.dataset.index);

    const isDotDropped = e.target.tagName === 'IMG';
    if (isDotDropped) {
      const newPositions = [...positions];
      const [draggedItem] = newPositions.splice(dropIndex, 1);
      newPositions.splice(dragIndex, 0, draggedItem);

      setPositions(newPositions);
    }
  };

  return (
    <div className="flex pt-7 px-10">
      <div className="flex flex-col h-[680px] justify-between">
        <div className=" flex flex-col gap-2 mr-5 overflow-auto shadow-white">
          {positions.map((position, index) => {
            const allCategories = {
              ...position.categories.trade,
              ...position.categories.conflicts,
              ...position.categories.production,
              ...position.categories.management
            };

            const totalTrueValues = Object.values(allCategories).filter(val => val).length;

            return (
              <div
                key={position.id}
                draggable
                onClick={() => setSelectedPosition(index)}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-index={index}
                className={classNames("flex flex-shrink-0 w-[18.5rem] h-20 rounded-lg border-2 bg-[#303038] cursor-pointer justify-between",
                  index === selectedPosition ? "border-[#6764f1]" : "border-transparent",
                )}
              >
                <div className="flex items-center gap-4">
                  <Image src={"/dotted.png"} width="12" height="20" alt="dotted" className="w-[12px] h-5 ml-4 flex-initial cursor-grab"></Image>
                  <div>
                    <p className=" text-neutral-100 text-sm font-semibold leading-5 mb-1">{position.name}</p>
                    <p className=" text-[#6b6b7b] text-xs font-semibold leading-[1.125rem]">{totalTrueValues} заданий</p>
                  </div>
                </div>
                <div className="text-[#6b6b7b] text-right font-['TT text-xs font-medium mt-[25px] mr-4"><span className="text-yellow-500 text-right text-xs not-italic font-bold leading-4">${totalTrueValues * 10 + 50}</span> / час</div>
              </div>
            );
          })}
        </div>
        <button className="rectangle_231 flex-shrink-0 w-[18.5rem] h-12 rounded-lg border-2 border-neutral-100/[.16] bg-[#6764f1] mb-4 text-white" onClick={handleCreatePosition}>Создать новую должность</button>
      </div>


      <div className="flex-shrink-0 w-[592px] h-[680px] rounded-lg bg-[#303038]">
        <div className="flex-shrink-0 w-[560px] h-[6.875rem] rounded-lg bg-[#292930] m-4">
          <h2 className="text-[#6b6b7b] mx-4 text-xs pt-4 pb-1">Название</h2>
          <input type="text" value={editName} onChange={handleEditName} className="flex-shrink-0 w-[528px] h-12 ml-4 py-4 pl-4 text-neutral-100 rounded-lg border-2 border-neutral-100/[.08] bg-[#292930] outline-none focus:border-[#6764f1]" />
        </div>

        <div className="relative">
          <div className="absolute top-[-40px] left-[15px] w-[560px] h-[40px] shadow-xl rounded-tl-lg rounded-tr-lg bg-[#292930]" >
            <p className="mt-[11px] ml-[16px] mb-[9px] Smalls'] text-[#6b6b7b] font-['TT text-sm font-medium leading-5">Обязаности</p>
          </div>
          <div className="">
            <div className=" pl-[11px] flex flex-wrap flex-shrink-0 w-[555px] h-[427px] rounded-b-lg bg-[#292930] ml-5 mt-[50px]">
            <div className="w-1/2">
              <div className="flex gap-2 flex-col mt-3">
                <h3 className="Smalls'] text-[#6b6b7b] font-['TT text-xs font-medium leading-[1.125rem]">Торговля</h3>
                {Object.entries(positions[selectedPosition].categories.trade).map(([key, value], index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleCheckboxChange("trade", key)}
                      className="hidden"
                      id={`checkbox-${key}`}
                    />
                    <label
                      htmlFor={`checkbox-${key}`}
                      className="flex items-center cursor-pointer"
                    >
                      <div className={classNames(
                        "w-5 h-5 border-2 rounded flex-shrink-0 mr-2",
                        value ? "border-[#6764f1]" : "border-neutral-100/[.08]"
                      )}>
                        {value && (
                          <svg
                            className="w-6 h-6 text-[#6764f1]"
                            fill="none"
                            viewBox="0 0 36 36"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="Smalls'] text-neutral-100 font-['TT text-xs font-medium leading-[1.125rem]">{key}</span>
                    </label>

                  </div>
                ))}
              </div>
              <div className="flex gap-2 flex-col mt-3">
                <h3 className="Smalls'] text-[#6b6b7b] font-['TT text-xs font-medium leading-[1.125rem]">Разборки</h3>
                {Object.entries(positions[selectedPosition].categories.conflicts).map(([key, value], index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleCheckboxChange("conflicts", key)}
                      className="hidden"
                      id={`checkbox-${key}`}
                    />
                    <label
                      htmlFor={`checkbox-${key}`}
                      className="flex items-center cursor-pointer"
                    >
                      <div className={classNames(
                        "w-5 h-5 border-2 rounded flex-shrink-0 mr-2",
                        value ? "border-[#6764f1]" : "border-neutral-100/[.08]"
                      )}>                        {value && (
                        <svg
                          className="w-6 h-6 text-[#6764f1]"
                          fill="none"
                          viewBox="0 0 36 36"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                      </div>
                      <span className="Smalls'] text-neutral-100 font-['TT text-xs font-medium leading-[1.125rem]">{key}</span>
                    </label>

                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex gap-2 flex-col mt-3">
                <h3 className="Smalls'] text-[#6b6b7b] font-['TT text-xs font-medium leading-[1.125rem]">Производство</h3>
                {Object.entries(positions[selectedPosition].categories.production).map(([key, value], index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleCheckboxChange("production", key)}
                      className="hidden"
                      id={`checkbox-${key}`}
                    />
                    <label
                      htmlFor={`checkbox-${key}`}
                      className="flex items-center cursor-pointer"
                    >
                      <div className={classNames(
                        "w-5 h-5 border-2 rounded flex-shrink-0 mr-2",
                        value ? "border-[#6764f1]" : "border-neutral-100/[.08]"
                      )}>
                        {value && (
                          <svg
                            className="w-6 h-6 text-[#6764f1]"
                            fill="none"
                            viewBox="0 0 36 36"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="Smalls'] text-neutral-100 font-['TT text-xs font-medium leading-[1.125rem]">{key}</span>
                    </label>

                  </div>
                ))}
              </div>
              <div className="flex gap-2 flex-col mt-3">
                <h3 className="Smalls'] text-[#6b6b7b] font-['TT text-xs font-medium leading-[1.125rem]">Управление</h3>
                {Object.entries(positions[selectedPosition].categories.management).map(([key, value], index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleCheckboxChange("management", key)}
                      className="hidden"
                      id={`checkbox-${key}`}
                    />
                    <label
                      htmlFor={`checkbox-${key}`}
                      className="flex items-center cursor-pointer"
                    >
                      <div className={classNames(
                        "w-5 h-5 border-2 rounded flex-shrink-0 mr-2",
                        value ? "border-[#6764f1]" : "border-neutral-100/[.08]"
                      )}>
                        {value && (
                          <svg
                            className="w-6 h-6 text-[#6764f1]"
                            fill="none"
                            viewBox="0 0 36 36"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="Smalls'] text-neutral-100 font-['TT text-xs font-medium leading-[1.125rem]">{key}</span>
                    </label>

                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
        <button onClick={handleSave} className=" ml-[21px] mt-[12px] h-12 w-[555px] rounded-lg border-2 border-neutral-100/[.16] bg-[#6764f1] mb-4 text-white">Сохранить</button>
      </div>
    </div>
  );
};

export default Positions;

