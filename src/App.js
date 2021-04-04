import { useEffect, useState } from "react";
import "./App.css";
import moment from "moment";
import AnimatedNumber from "animated-number-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const specialDate = "2020-04-03";
  const [dateIsChosen, setDateAsChosen] = useState(false);
  const [dateIsSetUp, setUpDate] = useState(false);
  const [day, setDay] = useState("00");
  const [month, setMonth] = useState("00");
  const [year, setYear] = useState("0000");
  const [counterDuration] = useState(3000);
  const [years, setYears] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(new Date().getFullYear(), 3, 3);
    const secondDate = new Date();

    setYears(moment(specialDate).fromNow(true));
    setDays(Math.round(Math.abs((firstDate - secondDate) / oneDay)));
  }, []);

  const time = (
    <h2>
      {years} & {days > 1 ? days + " days " : "a day "}
      <FontAwesomeIcon icon={faHeart} />
    </h2>
  );

  const handleinputDay = () => {
    setDateAsChosen(true);
    changeDay();
  };

  const changeDay = () => {
    setDay(moment(specialDate).format("DD"));
    changeMonth();
  };

  const changeMonth = () => {
    setMonth(moment(specialDate).format("MM"));
    changeYear();
  };

  const changeYear = () => {
    setYear(moment(specialDate).format("YYYY"));
    setTimeout(() => {
      setUpDate(true);
    }, 5000);
    setTimeout(() => {
      tellHerILoveYou();
    }, 7000);
  };

  const formatValue = (value) => `0${value}`;

  const formatYearValue = (value) => {
    if (dateIsChosen) {
      return value;
    } else {
      return `000${value}`;
    }
  };

  const tellHerILoveYou = () => {
    const body = document.querySelector(".love");
    const message = document.createElement("h5");
    message.innerHTML = "I love you Layla!";
    message.className = "mt-5 mb-2";
    for (let i = 1; i < 2020; i++) {
      const msg = message.cloneNode(true);
      body.appendChild(msg);
    }
  };

  return (
    <div className="App">
      <div className="date-picker mt-5 mb-5">
        <label htmlFor="date" className=" mb-2">
          <h4>Choose a Random Date</h4>
        </label>
        <input
          type="date"
          name="date"
          className="btn-light  form-control"
          onChange={handleinputDay}
        />
      </div>

      <br />

      <h1 className="date mt-5 mb-5">
        <AnimatedNumber
          value={day}
          formatValue={formatValue}
          duration={counterDuration}
        />
        <AnimatedNumber
          value={month}
          formatValue={formatValue}
          duration={counterDuration}
        />
        <AnimatedNumber
          value={year}
          formatValue={formatYearValue}
          duration={counterDuration}
        />
      </h1>

      <div className="time mt-5 mb-5">
        {dateIsSetUp === true ? <span>{time}</span> : <span></span>}
      </div>

      <div className="love mt-5 mb-5" />
    </div>
  );
};

export default App;