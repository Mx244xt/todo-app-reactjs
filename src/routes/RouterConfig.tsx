import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import Error500 from "../pages/Error500";
import TodoFrom from "../pages/TodoFrom";
import TopPage from "../pages/TopPage";

export const RouterConfig: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TopPage />} />
        <Route path="/" element={<TopPage />} />
        <Route path="createAccount" element={<CreateAccount />} />
        <Route path="todos" element={<TodoFrom />} />
        <Route path="Internal-Server-Error" element={<Error500 />} />
      </Routes>
    </BrowserRouter>
  );
};