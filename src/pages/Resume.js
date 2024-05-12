import React, { useState } from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import "../styles/resume.scss";

export default function Resume() {
  const [active, setActive] = useState("semaine");
  const hadleTable = (x) => {
    setActive(x);
  };
  const week = ["Date", "Dépenses", "Budget", "Reste", "Réintégré", "Épargné"];
  const content = [
    {
      Date: "05/08/2022",
      Total: 10,
      Budget: 10,
      Reste: 10,
      Réintégré: 10,
      Épargné: 10,
    },
    {
      Date: "06/08/2022",
      Total: 70,
      Budget: 10,
      Reste: 10,
      Réintégré: 10,
      Épargné: 10,
    },
    {
      Date: "07/08/2022",
      Total: 10,
      Budget: 10,
      Reste: 10,
      Réintégré: 10,
      Épargné: 10,
    },
  ];
  return (
    <>
      <div className="resume-btn-container">
        <div
          onClick={() => hadleTable("mois")}
          className={`round-btn ${active === "mois" ? "active" : ""}`}
        >
          Par mois
        </div>
        <div
          onClick={() => hadleTable("semaine")}
          className={`round-btn ${active === "semaine" ? "active" : ""}`}
        >
          Par semaine
        </div>
        <div
          onClick={() => hadleTable("jour")}
          className={`round-btn ${active === "jour" ? "active" : ""}`}
        >
          Par jour
        </div>
      </div>
      <Card>
        <Table
          mobile={["Reste", "Réintégré", "Épargné"]}
          headers={week}
          content={content}
          total={["Dépenses"]}
        />
      </Card>
    </>
  );
}
