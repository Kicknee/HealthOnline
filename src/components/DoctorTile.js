import React from "react";
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
            return (
              <div className={`day ${day}`} key={day}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
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
