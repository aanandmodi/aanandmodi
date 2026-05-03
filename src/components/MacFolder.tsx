"use client";

import React from "react";

export function MacFolder() {
  return (
    <div className="group/folder cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:rotate-[2deg]">
      <div className="relative w-[155px] h-[155px] transition-all duration-300 group-hover/folder:drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]">
        {/* Back panel */}
        <img
          src="/mac-folder-back-opt.svg"
          alt=""
          className="absolute inset-0 w-full h-full z-0"
          draggable={false}
        />
        {/* Items that pop out on hover */}
        <img
          src="/stickers/1.jpg"
          alt="Project"
          className="absolute left-1/2 bottom-[30%] w-[85px] rounded-lg -translate-x-1/2 transition-all duration-500 ease-out opacity-0 group-hover/folder:opacity-100 group-hover/folder:-translate-y-[75px] group-hover/folder:-translate-x-[120px] group-hover/folder:rotate-[-15deg] z-10"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
          draggable={false}
        />
        <img
          src="/stickers/3.jpg"
          alt="Work"
          className="absolute left-1/2 bottom-[30%] w-[65px] rounded-lg -translate-x-1/2 transition-all duration-500 ease-out delay-75 opacity-0 group-hover/folder:opacity-100 group-hover/folder:-translate-y-[95px] group-hover/folder:-translate-x-[30px] group-hover/folder:rotate-[5deg] z-10"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
          draggable={false}
        />
        <img
          src="/stickers/5.jpg"
          alt="Research"
          className="absolute left-1/2 bottom-[30%] w-[85px] rounded-lg -translate-x-1/2 transition-all duration-500 ease-out delay-150 opacity-0 group-hover/folder:opacity-100 group-hover/folder:-translate-y-[65px] group-hover/folder:translate-x-[40px] group-hover/folder:rotate-[10deg] z-10"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
          draggable={false}
        />
        {/* Front panel — opens on hover */}
        <img
          src="/mac-folder-front-opt.svg"
          alt="Folder"
          className="absolute inset-0 w-full h-full z-20 transition-transform duration-500 ease-out origin-bottom group-hover/folder:[transform:rotateX(-22deg)]"
          draggable={false}
        />
      </div>
    </div>
  );
}
