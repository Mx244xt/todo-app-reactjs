import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAccount from "../screen/CreateAccount";
import Error500 from "../screen/Error500";
import TodoFrom from "../screen/TodoFrom";
import TopPage from "../screen/TopPage";
import PasswordReset from "../screen/PasswordReset";
import SendPasswordReset from "../screen/SendPasswordReset";

export const RouterConfig: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TopPage />} />
        <Route path="/" element={<TopPage />} />
        <Route path="createAccount" element={<CreateAccount />} />
        <Route path="sendPasswordReset" element={<SendPasswordReset />} />
        <Route path="passwordReset" element={<PasswordReset />} />
        <Route path="todos" element={<TodoFrom />} />
        <Route path="Internal-Server-Error" element={<Error500 />} />
      </Routes>
    </BrowserRouter>
  );
};