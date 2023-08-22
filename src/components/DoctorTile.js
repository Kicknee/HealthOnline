import React from "react";
import { daysEngPol } from "../assets/tempSource/daysEngPol";
import "../assets/css/DoctorTile.css";

const DoctorTile = ({
  showInfo,
  name,
  specialization,
  services,
  days,
  setDoctor,
}) => {
  function showModal() {
    setDoctor();
    showInfo((prev) => !prev);
  }
  return (
    <div className="doctorTile">
      <div className="upperTile">
        <div className="name">{name}</div>
        <div className="specialization">{specialization}</div>
      </div>
      <div className="bottomTile">
        <div className="days">
          {days.map((day) => {
            const polishDay = daysEngPol.find((el) => el.includes(day))[1];
            return (
              <div className={`day ${day}`} key={day}>
                {polishDay.charAt(0).toUpperCase() + polishDay.slice(1)}
              </div>
            );
          })}
        </div>
        <button onClick={showModal}>Więcej</button>
      </div>
    </div>
  );
};

export default DoctorTile;
