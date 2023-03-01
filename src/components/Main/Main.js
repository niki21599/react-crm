import React, { useState } from "react";
import "./Main.css";
import Customers from "../Customers/Customers";
import Dashboard from "../Dashboard/Dashboard";
import Sales from "../Sales/Sales";
import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ResizeSensor from "css-element-queries/src/ResizeSensor";

export default function Main() {
  let { openDrawer } = useSelector((state) => state.headerMenu);

  //Damit bei offenem normal Drawer die Sachen beim übergang zu Responsive Drawer mittig angezeigt werden.
  let [width, setWidth] = useState(window.screen.width);
  let element = document.body;
  new ResizeSensor(element, function () {
    setWidth(window.innerWidth);
  });

  return (
    <div
      className={openDrawer && width > 850 ? "mainContent left" : "mainContent"}
    >
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/customers" element={<Customers />}></Route>
        <Route path="/sales" element={<Sales />}></Route>
      </Routes>
    </div>
  );
}
