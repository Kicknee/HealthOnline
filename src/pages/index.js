import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DoctorTile from "../components/DoctorTile";
import MoreInfo from "../components/MoreInfo";
import "../assets/css/main.css";
import source from "../assets/tempSource/doctorList.json";

const IndexPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [currDoctor, setCurrDoctor] = useState(null);
  const [checkedState, setCheckedState] = React.useState({
    pn: true,
    wt: true,
    sr: true,
    czw: true,
    pt: true,
    sb: true,
    nd: true,
  });
  const [doctorList, setDoctorList] = useState([...source]);
  const [search, setSearch] = useState({ name: "", specialization: "" });

  //female 26 male 28

  useEffect(() => {
    let f_count = 0,
      m_count = 0;

    source.forEach((doctor) => {
      doctor.room = Math.floor(Math.random() * 145 + 1);
      doctor.pic = doctor.sex === "female" ? `f${f_count}` : `m${m_count}`;
      if (doctor.sex === "female") f_count++;
      if (doctor.sex === "male") m_count++;
    });
  }, []);
  useEffect(() => {
    let newDoctorList = source.filter((doctor) => {
      return doctor.days.some((day) => checkedState[day] === true);
    });

    if (search.name || search.specialization) {
      newDoctorList = newDoctorList.filter((doctor) => {
        return (
          doctor.name.toLowerCase().includes(search.name.toLowerCase()) &&
          doctor.specialization
            .toLowerCase()
            .includes(search.specialization.toLowerCase())
        );
      });
    }
    setDoctorList([...newDoctorList]);
  }, [checkedState, search]);

  return (
    <>
      <Navbar
        filter={setCheckedState}
        specificDay={checkedState}
        setSearch={setSearch}
      />
      <div className="tiles">
        {doctorList.length > 0 ? (
          doctorList.map((doctor, indx) => {
            return (
              <DoctorTile
                key={indx}
                showInfo={setShowModal}
                name={doctor.name}
                specialization={doctor.specialization}
                services={doctor.services}
                days={doctor.days}
                setDoctor={() => {
                  setCurrDoctor(indx);
                }}
              />
            );
          })
        ) : (
          <div className="no-results">BRAK WYNIKÓW</div>
        )}
      </div>
      {showModal && (
        <MoreInfo
          hideInfo={setShowModal}
          doctor={doctorList[currDoctor]}
          number={currDoctor}
          resetCurrDoctor={() => {
            setCurrDoctor(null);
          }}
        />
      )}
    </>
  );
};

export default IndexPage;
