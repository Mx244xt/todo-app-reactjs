import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAccount from "../CreateAccount";
import Error500 from "../Error500";
import TodoFrom from "../TodoFrom";
import TopPage from "../TopPage";

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