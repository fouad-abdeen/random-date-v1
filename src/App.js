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
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const currentYear = moment().format("YYYY");
    const currentMonth = moment().format("MM");
    const currentDay = moment().format("DD");
    const currentDate = moment([
      parseInt(currentYear),
      parseInt(currentMonth),
      parseInt(currentDay),
    ]);
    const passedDate = moment([2020, 4, 3]);

    const _years = currentDate.diff(passedDate, "years");
    setYears(_years);
    passedDate.add(_years, "years");

    const _months = currentDate.diff(passedDate, "months");
    setMonths(_months);
    passedDate.add(_months, "months");

    const _days = currentDate.diff(passedDate, "days");
    setDays(_days);
  }, []);

  const time = (
    <h2>
      {years === 0
        ? ""
        : years === 1
        ? " " + years + " year"
        : " " + years + " years"}
      {months === 0
        ? ""
        : months === 1
        ? " " + months + " month"
        : " " + months + " months"}
      {days === 0
        ? ""
        : days === 1
        ? " " + days + " day"
        : " " + days + " days"}{" "}
      <FontAwesomeIcon icon={faHeart} />
    </h2>
  );

  const handleInputDate = () => {
    setDateAsChosen(true);
    setDay(moment(specialDate).format("DD"));
    setMonth(moment(specialDate).format("MM"));
    setYear(moment(specialDate).format("YYYY"));

    setTimeout(() => {
      setUpDate(true);
    }, 5000);

    setTimeout(() => {
      tellHerILoveYou();
    }, 7000);
  };

  const tellHerILoveYou = () => {
    const body = document.querySelector(".love");
    const message = document.createElement("h5");
    message.innerHTML = "I love you Layla!";
    message.className = "mt-5 mb-2";
    for (let i = 1; i <= 2020; i++) {
      const msg = message.cloneNode(true);
      body.appendChild(msg);
    }
  };

  const formatValue = (value) => `0${value}`;

  const formatYearValue = (value) => {
    if (dateIsChosen) {
      return value;
    } else {
      return `000${value}`;
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
          onChange={handleInputDate}
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
