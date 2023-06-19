import React, { useState, useEffect } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  query MyQuery {
    allFile {
      nodes {
        name
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  }
`;
const days_list = {
  pn: "poniedziałek",
  wt: "wtorek",
  sr: "środę",
  czw: "czwartek",
  pt: "piątek",
  sb: "sobotę",
  nd: "niedzielę",
};
const MoreInfo = ({ hideInfo, doctor, number, resetCurrDoctor }) => {
  const [input, setInput] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    day_: doctor.days[0],
    hour_: "12-15",
  });
  const [confirmation, setConfirmation] = useState(false);

  function handleChange(e) {
    setInput((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "radio" && prev["day_"] === e.target.value
          ? ""
          : e.target.type === "radio" && prev["hour_"] === e.target.value
          ? ""
          : e.target.value.trim(),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setConfirmation(true);
  }
  const data = useStaticQuery(query);
  const nodes = data.allFile.nodes;

  const pic_path = nodes.find((image) => image.name === doctor.pic);
  const pathToImage = getImage(pic_path);

  return (
    <div
      className="modalBack"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          resetCurrDoctor();
          hideInfo(false);
        }
      }}
    >
      <div className="modal">
        <div className="upperSide">
          <div className="leftSide">
            <div className="name">{doctor.name}</div>
            <div className="specialization">{doctor.specialization}</div>
            <div className="address">
              <div className="hospital">Szpital Wojskowy im. Sienkiewicz</div>
              <div className="room">3. piętro - pokój {doctor.room}</div>
            </div>
          </div>
          {<GatsbyImage image={pathToImage} alt="doct" className="rightSide" />}
        </div>
        <form action="#" className="bottomSide" onSubmit={handleSubmit}>
          <div className="leftSide">
            <fieldset>
              <legend>Wybierz dzień:</legend>
              {doctor.days.map((day, indx) => {
                return (
                  <label
                    key={indx}
                    htmlFor={`${day}_`}
                    className={`day ${day}`}
                    style={
                      input["day_"] === day
                        ? { boxShadow: "inset 0 0 3px black, 0 0 5px black" }
                        : {}
                    }
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                    <input
                      type="radio"
                      id={`${day}_`}
                      name="day_"
                      value={day}
                      checked={input["day_"] === day ? true : false}
                      onChange={handleChange}
                    />
                  </label>
                );
              })}
            </fieldset>
            <fieldset>
              <legend>Wybierz godzinę:</legend>
              <label
                htmlFor="hourv1"
                className="hour"
                style={
                  input["hour_"] === "12-15"
                    ? { boxShadow: "inset 0 0 3px black, 0 0 5px black" }
                    : {}
                }
              >
                12-15
                <input
                  type="radio"
                  id="hourv1"
                  name="hour_"
                  value="12-15"
                  checked={input["hour_"] === "12-15" ? true : false}
                  onChange={handleChange}
                />
              </label>
              <label
                htmlFor="hourv2"
                className="hour"
                style={
                  input["hour_"] === "14-17"
                    ? { boxShadow: "inset 0 0 3px black, 0 0 5px black" }
                    : {}
                }
              >
                14-17
                <input
                  type="radio"
                  id="hourv2"
                  name="hour_"
                  value="14-17"
                  checked={input["hour_"] === "14-17" ? true : false}
                  onChange={handleChange}
                />
              </label>
            </fieldset>
            <input
              type="text"
              name="name"
              id="name"
              value={input.name}
              onChange={handleChange}
              placeholder="Imię"
              required
            />
            <input
              type="text"
              name="surname"
              id="surname"
              value={input.surname}
              onChange={handleChange}
              placeholder="Nazwisko"
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              value={input.email}
              onChange={handleChange}
              placeholder="E-mail"
              required
            />
            <input
              type="text"
              name="phone"
              id="phone"
              value={input.phone}
              onChange={handleChange}
              placeholder="Telefon"
              required
            />
          </div>

          <div className="services rightSide">
            <div>Usługi:</div>
            <ul>
              {doctor.services.map((service, indx) => {
                return (
                  <li key={indx}>
                    {service.service}: {service.price}zł
                  </li>
                );
              })}
            </ul>
          </div>
          <button type="submit">Umów wizytę</button>
        </form>
        {confirmation === true && (
          <div className="modal-confirmation">
            <div className="confirmation">
              <div className="confirmation-greeting">
                Dziękujemy za skorzystanie z naszych usług.
              </div>
              <div className="confirmation-info">
                Twoja wizyta z {doctor.name}{" "}
                {input["day_"] === "wt" ? "we" : "w"} {days_list[input["day_"]]}{" "}
                na {input["hour_"]} została potwierdzona.{" "}
              </div>
              <button
                onClick={() => {
                  resetCurrDoctor();
                  setConfirmation(false);
                  hideInfo(false);
                }}
              >
                Zamknij
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreInfo;
