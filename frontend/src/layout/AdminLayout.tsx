import React from "react";
import { Sidebar } from "./Sidebar";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <Sidebar />
      </div>
      <main>{children}</main>
      <h1>Welcome</h1>
    </>
  );
};
