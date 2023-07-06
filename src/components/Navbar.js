import React, { useState } from "react";
import "../assets/css/Navbar.css";

const daysEngPol = [
  ["mon", "pn"],
  ["tue", "wt"],
  ["wed", "sr"],
  ["thu", "czw"],
  ["fri", "pt"],
  ["sat", "sb"],
  ["sun", "nd"],
];

const Navbar = ({ filter, specificDay, setSearch }) => {
  const [input, setInput] = useState({ name: "", specialization: "" });

  function handleInput(e) {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));

    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  }
  function handleChange(e) {
    filter((prev) => ({
      ...prev,
      [e.target.id]: e.target.value === "true" ? false : true,
    }));
  }
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="health">Health</span>
        <span className="online">Online</span>
      </div>
      <form action="#">
        <input
          type="text"
          name="name"
          placeholder="DOKTOR"
          value={input.name}
          onChange={handleInput}
        />
        <input
          type="text"
          name="specialization"
          placeholder="SPECJALIZACJA"
          value={input.specialization}
          onChange={handleInput}
        />
        {/* <button type="submit">SZUKAJ</button> */}
        <div className="daysFilter">
          {daysEngPol.map((day, indx) => {
            return (
              <label
                key={indx}
                htmlFor={`${day[0]}`}
                className={`day ${day[0]}`}
                style={
                  specificDay[day[0]] === false ? { background: "#3d3c3c" } : {}
                }
              >
                {day[1].charAt(0).toUpperCase() + day[1].slice(1)}
                <input
                  type="checkbox"
                  id={`${day[0]}`}
                  value={specificDay[day[0]]}
                  onChange={handleChange}
                />
              </label>
            );
          })}
        </div>
      </form>
    </nav>
  );
};

export default Navbar;
