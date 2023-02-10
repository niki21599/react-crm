import React from "react";
import "./Main.css";
import Customers from "../Customers/Customers";
import Dashboard from "../Dashboard/Dashboard";
import Sales from "../Sales/Sales";
import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";

export default function Main({ activeSite, drawerOpen }) {
  return (
    <div className={drawerOpen ? "mainContent left" : "mainContent"}>
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/customers" element={<Customers />}></Route>
        <Route path="/sales" element={<Sales />}></Route>
      </Routes>
    </div>
  );
}
