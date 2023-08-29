import React from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <div>
      <div className="container mx-auto">
        <Navbar />
        {children}
      </div>
    </div>
  );
};
