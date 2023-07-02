import React, { useState } from "react";
import "../assets/css/Navbar.css";

// const days = {
//   pn: "pn",
//   wt: "wt",
//   sr: "sr",
//   czw: "czw",
//   pt: "pt",
//   sb: "sb",
//   nd: "nd",
// };
const days = ["pn", "wt", "sr", "czw", "pt", "sb", "nd"];

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
          {days.map((day, indx) => {
            return (
              <label
                key={indx}
                htmlFor={`${day}`}
                className={`day ${day}`}
                style={
                  specificDay[day] == false ? { background: "#3d3c3c" } : {}
                }
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
                <input
                  type="checkbox"
                  id={`${day}`}
                  value={specificDay[day]}
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
