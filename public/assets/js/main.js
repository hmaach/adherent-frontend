import React, { useState } from 'react';

const OptionsMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleBtnClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <button className="options-btn" onClick={handleBtnClick}>Options</button>
      <div className={`options-menu ${showMenu ? 'show' : ''}`}>
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      </div>
    </div>
  );
};

export default OptionsMenu;
