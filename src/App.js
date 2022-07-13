import React from "react";
import mailSvg from "./assets/mail.svg";
// import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
// import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import loadingGif from "./assets/loading.gif";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import users from "./components/data";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [isData, setIsData] = useState({
    firstName: "",
    email: "",
    phone: "",
    age: "",
  });
  const [isShow, setIsShow] = useState(true);
  const [user, setUser] = useState(users);
  const [showName, setShowName] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getData = async () => {
    try {
      const res = await axios(url);
      const data = await res.data.results[0];
      setIsData(data);
      setIsShow(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (isShow) {
    return (
      <div>
        <img src={loadingGif} alt="loading" />
      </div>
    );
  }

  const {
    name: { title, first, last },
    email,
    dob: { age },
    location: { country },
    cell,
    login: { password },
    picture: { large },
  } = isData;

  const handleName = () => {
    setShowName(true);
    setShowEmail(false);
    setShowMap(false);
    setShowAge(false);
    setShowPhone(false);
    setShowPassword(false);
  };
  const handleEmail = () => {
    setShowName(false);
    setShowEmail(true);
    setShowMap(false);
    setShowAge(false);
    setShowPhone(false);
    setShowPassword(false);
  };
  const handleAge = () => {
    setShowName(false);
    setShowEmail(false);
    setShowMap(false);
    setShowAge(true);
    setShowPhone(false);
    setShowPassword(false);
  };
  const handleMap = () => {
    setShowName(false);
    setShowEmail(false);
    setShowMap(true);
    setShowAge(false);
    setShowPhone(false);
    setShowPassword(false);
  };
  const handlePhone = () => {
    setShowName(false);
    setShowEmail(false);
    setShowMap(false);
    setShowAge(false);
    setShowPhone(true);
    setShowPassword(false);
  };
  const handlePassword = () => {
    setShowName(false);
    setShowEmail(false);
    setShowMap(false);
    setShowAge(false);
    setShowPhone(false);
    setShowPassword(true);
  };
  const handleAdd = () => {
    setUser([
      ...user,
      {
        firstName:
          isData.name.title + " " + isData.name.first + " " + isData.name.last,
        email: isData.email,
        age: isData.dob.age,
        phone: isData.phone,
      },
    ]);
  };

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img
            src={isShow ? defaultImage : large}
            alt="random user"
            className="user-img"
          />
          {showName && (
            <div>
              <p className="user-title"> My name is </p>
              <p className="user-value">{title + " " + first + " " + last}</p>
            </div>
          )}
          {showEmail && (
            <div>
              <p className="user-title">My email is</p>
              <p className="user-value">{email}</p>
            </div>
          )}
          {showAge && (
            <div>
              <p className="user-title"> My age is </p>
              <p className="user-value">{age}</p>
            </div>
          )}
          {showMap && (
            <div>
              <p className="user-title"> My country is </p>
              <p className="user-value">{country}</p>
            </div>
          )}
          {showPhone && (
            <div>
              <p className="user-title"> My phone is </p>
              <p className="user-value">{cell}</p>
            </div>
          )}
          {showPassword && (
            <div>
              <p className="user-title"> My password is </p>
              <p className="user-value">{password}</p>
            </div>
          )}

          <div className="values-list">
            <button className="icon" data-label="name" onClick={handleName}>
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button className="icon" data-label="email" onClick={handleEmail}>
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age" onClick={handleAge}>
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" data-label="street" onClick={handleMap}>
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone" onClick={handlePhone}>
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="password"
              onClick={handlePassword}
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={() => getData()}>
              new user
            </button>
            <button className="btn" type="button" onClick={handleAdd}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {user.map((person, index) => {
                const { firstName, email, age, phone } = person;
                return (
                  <tr className="body-tr" key={index}>
                    <td>{firstName}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>{age}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;