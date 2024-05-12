import React, { useState } from "react";
import { useNavigate, useHref } from "react-router-dom";
import {
  BsBarChartLineFill,
  BsCalendarFill,
  BsFillBagFill,
  BsFillBasket3Fill,
  BsFillCartFill,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import "../styles/sidebar.scss";
import logo from "../images/logo.png";
import { getWeekFromDate } from "../utils/functions";
import { FaMoneyBillWaveAlt } from "react-icons/fa";

export default function Sidebar(props) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const href = useHref();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="sidebar-global-container">
      <div className={`sidebar-container ${open ? "open" : ""}`}>
        <div className="sidebar-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="sidebar-body">
          <div
            className={`sidebar-item ${href === "/" ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            <BsFillGrid3X3GapFill />
            <p className="gradient-text">Résumé</p>
          </div>
          <div
            className={`sidebar-item ${
              href === "/budgetisation" ? "active" : ""
            }`}
            onClick={() => navigate("/budgetisation")}
          >
            <FaMoneyBillWaveAlt />
            <p className="gradient-text">Budgetisation</p>
          </div>
          <div
            className={`sidebar-item ${href === "/graphique" ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            <BsBarChartLineFill />
            <p className="gradient-text">Graphique</p>
          </div>
          <div
            className={`sidebar-item ${href === "/calendrier" ? "active" : ""}`}
            onClick={() => navigate("/calendrier")}
          >
            <BsCalendarFill />
            <p className="gradient-text">Calendrier</p>
          </div>
          <div
            className={`sidebar-item ${
              href === `/depenses/jour/${year}-${month}-${day}` ? "active" : ""
            }`}
            onClick={() => navigate(`/depenses/jour/${year}-${month}-${day}`)}
          >
            <BsFillBagFill />
            <p className="gradient-text">Aujourd'hui</p>
          </div>
          <div
            className={`sidebar-item ${
              href === `/depenses/semaine/${getWeekFromDate(year, month, day)}`
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate(`/depenses/semaine/${getWeekFromDate(year, month, day)}`)
            }
          >
            <BsFillBasket3Fill />
            <p className="gradient-text">Cette semaine</p>
          </div>
          <div
            className={`sidebar-item ${
              href === `/depenses/mois/${year}-${month}` ? "active" : ""
            }`}
            onClick={() => navigate(`/depenses/mois/${year}-${month}`)}
          >
            <BsFillCartFill />
            <p className="gradient-text">Ce mois</p>
          </div>
        </div>
      </div>
      <div
        onClick={handleSidebar}
        className={`sidebar-filter ${open ? "open" : ""}`}
      ></div>
      <div className={`sidebar-page-container ${open ? "open" : ""}`}>
        <div
          onClick={handleSidebar}
          className={`open-close-btn ${open ? "open" : ""}`}
        >
          <HiOutlineBars3 />
        </div>
        {props.children}
      </div>
    </div>
  );
}
