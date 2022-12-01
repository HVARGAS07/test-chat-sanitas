import React from "react";
import "./main.css";
import { MainType } from "./main.type";

const MainLayout: React.FC<MainType> = (props) => {
  return (
    <section className="layout">
      <div className="body">{props.children}</div>
    </section>
  );
};

export default MainLayout;
