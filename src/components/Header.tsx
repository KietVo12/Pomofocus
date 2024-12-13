import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <h1>Pomofocus</h1>
      <div className="controls">
        <button>Report</button>
        <button>Setting</button>
        <button>Sign In</button>
      </div>
    </header>
  );
};

export default Header;
