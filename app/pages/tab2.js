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
          sellProduct: false,
          setPrices: false,
          viewAnalytics: false,
        },
        conflicts: {
          duel: false,
          raiseClaims: false,
        },
        production: {
          purchaseRawMaterials: false,
          appointWorkers: false,
        },
        management: {
          appointPositions: false,
          expelFromGang: false,
        },
      },
    },
    {
      id: "position-2",
      name: "Должность 2",
      categories: {
        trade: {
          sellProduct: false,
          setPrices: false,
          viewAnalytics: false,
        },
        conflicts: {
          duel: false,
          raiseClaims: false,
        },
        production: {
          purchaseRawMaterials: false,
          appointWorkers: false,
        },
        management: {
          appointPositions: false,
          expelFromGang: false,
        },
      },
      // Додайте інші посади за вашим вибором
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
          sellProduct: false,
          setPrices: false,
          viewAnalytics: false,
        },
        conflicts: {
          duel: false,
          raiseClaims: false,
        },
        production: {
          purchaseRawMaterials: false,
          appointWorkers: false,
        },
        management: {
          appointPositions: false,
          expelFromGang: false,
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
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const dropIndex = parseInt(e.dataTransfer.getData("index"));
    const dragIndex = parseInt(e.currentTarget.dataset.index);

    const newPositions = [...positions];
    const [draggedItem] = newPositions.splice(dropIndex, 1);
    newPositions.splice(dragIndex, 0, draggedItem);

    setPositions(newPositions);
  };

  return (
    <div className="flex pt-7 px-10">
      <div>
        <div style={{ marginRight: "20px" }}>
          {positions.map((position, index) => (
            <div
              key={position.id}
              draggable
              onClick={() => setSelectedPosition(index)}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              data-index={index}
              className={classNames("flex w-[18.5rem] h-20 rounded-lg border-2 bg-[#303038] cursor-grab justify-between",
              index === selectedPosition ? "border-[#6764f1]" : "border-transparent",
              )}
            >
              <div className="flex items-center gap-4">
                <Image src={"/dotted.png" } width="12" height="20" alt="dotted" className="w-[12px] h-5 ml-4 flex-initial"></Image>
                <div>
                  <p className=" text-neutral-100 text-sm font-semibold leading-5 mb-1">{position.name}</p>
                  <p className=" text-[#6b6b7b] text-xs font-semibold leading-[1.125rem]">5 заданий</p>
                </div>
              </div>
              <div className="text-[#6b6b7b] text-right font-['TT text-xs font-medium mt-[25px] mr-4"><span className="text-yellow-500 text-right text-xs not-italic font-bold leading-4">$50</span> / час</div>
            </div>
          ))}
        </div>
        <button className="rectangle_231 flex-shrink-0 w-[18.5rem] h-12 rounded-lg border-2 border-neutral-100/[.16] bg-[#6764f1]" onClick={handleCreatePosition}>Создать новую должность</button>
      </div>
      <div className="flex-shrink-0 w-[592px] h-[680px] rounded-lg bg-[#303038]">
        <div className="flex-shrink-0 w-[560px] h-[6.875rem] rounded-lg bg-[#292930] m-4">
          <h2 className="text-[#6b6b7b] ml-4 text-xs pt-4 pb-1">Название</h2>
          <input type="text" value={editName} onChange={handleEditName} className="flex-shrink-0 w-[528px] h-12 ml-4 py-4 pl-4 text-neutral-100 rounded-lg border-2 border-neutral-100/[.08] bg-[#292930] outline-none focus:border-[#6764f1]" />
        </div>
        <div className="mt-2">
          <div className="mb-4">
            <h3>Торговля</h3>
            {Object.entries(positions[selectedPosition].categories.trade).map(([key, value], index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleCheckboxChange("trade", key)}
                  className="mr-2"
                />
                <span>{key}</span>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3>Разборки</h3>
            {Object.entries(positions[selectedPosition].categories.conflicts).map(([key, value], index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleCheckboxChange("conflicts", key)}
                  className="mr-2"
                />
                <span>{key}</span>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3>Производство</h3>
            {Object.entries(positions[selectedPosition].categories.production).map(([key, value], index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleCheckboxChange("production", key)}
                  className="mr-2"
                />
                <span>{key}</span>
              </div>
            ))}
          </div>
          <div>
            <h3>Управление</h3>
            {Object.entries(positions[selectedPosition].categories.management).map(([key, value], index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleCheckboxChange("management", key)}
                  className="mr-2"
                />
                <span>{key}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleSave} className="rectangle_231 flex-shrink-0 w-[18.5rem] h-12 rounded-lg border-2 border-neutral-100/[.16] bg-[#6764f1]">Сохранить</button>
      </div>
    </div>
  );
};

export default Positions;
