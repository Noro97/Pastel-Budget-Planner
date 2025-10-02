import React from 'react';

const Header = () => {
  return (
    <header className="bg-teal-200 shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-teal-800 tracking-wide">
          Pastel Budget Planner
        </h1>
      </div>
    </header>
  );
};

export default Header;