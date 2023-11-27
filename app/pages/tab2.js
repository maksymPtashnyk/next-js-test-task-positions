import React, { useState, useEffect } from 'react';

const Positions = () => {
  const [positions, setPositions] = useState([
    { id: 'position-1', name: 'Должность 1' },
    { id: 'position-2', name: 'Должность 2' },
    // Додайте інші посади за вашим вибором
  ]);

  const [editName, setEditName] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCreatePosition = () => {
    const newPosition = {
      id: `position-${positions.length + 1}`,
      name: 'Новая должность',
      // Інші властивості посади
    };
    setPositions([...positions, newPosition]);
  };

  const handleEditName = (e) => {
    setEditName(e.target.value);
  };

  useEffect(() => {
    setEditName(positions[selectedPosition].name);
  }, [selectedPosition, positions]);

  const handleSave = () => {
    if (editName.trim() !== '') {
      const updatedPositions = [...positions];
      updatedPositions[selectedPosition].name = editName;
      setPositions(updatedPositions);
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const dropIndex = parseInt(e.dataTransfer.getData('index'));
    const dragIndex = parseInt(e.currentTarget.dataset.index);

    const newPositions = [...positions];
    const [draggedItem] = newPositions.splice(dropIndex, 1);
    newPositions.splice(dragIndex, 0, draggedItem);

    setPositions(newPositions);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '20px' }}>
        {positions.map((position, index) => (
          <div
            key={position.id}
            draggable
            onClick={() => setSelectedPosition(index)}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-index={index}
            style={{
              margin: '8px',
              padding: '8px',
              backgroundColor: index === selectedPosition ? 'lightblue' : 'lightgrey',
              cursor: 'grab',
            }}
          >
            {position.name}
          </div>
        ))}
      </div>
        <div style={{ backgroundColor: 'white', padding: '20px' }}>
          <h2>Редактировать должность</h2>
          <input type="text" value={editName} onChange={handleEditName} />
          <button onClick={handleSave}>Сохранить</button>
        </div>
      <button onClick={handleCreatePosition}>Создать новую должность</button>
    </div>
  );
};

export default Positions;
