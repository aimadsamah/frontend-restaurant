import React from "react";

const Hamburger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between items-center group">
      <span
        className={`w-full h-[1px] bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[9px]" : ""}`}
      />
      <span
        className={`w-full h-[1px] bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`w-full h-[1px] bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[10px]" : ""}`}
      />
    </div>
  );
};

export default Hamburger;
