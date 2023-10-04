import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./Top";
import CreateAccount from "./pages/CreateAccount";
import Error500 from "./pages/Error500";
import Todos from "./pages/Todos";

export const RouterConfig: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Top />} />
          <Route path="/" element={<Top />} />
          <Route path="createAccount" element={<CreateAccount />} />
          <Route path="todos" element={<Todos />} />
          <Route path="Internal-Server-Error" element={<Error500 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};