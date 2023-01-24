import React, { useState } from "react";
import './App.css'

function PillReminder() {
  const [numDoses, setNumDoses] = useState(1);
  const [firstDoseTime, setFirstDoseTime] = useState("09:00");
  const [nextDoses, setNextDoses] = useState([]);
  const [error, setError] = useState("");
  
  function handleSubmit(e) {
    e.preventDefault();
    if(numDoses <= 0) {
      setError("Number of doses must be greater than 0");
    } else if (!/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(firstDoseTime)) {
      setError("Invalid time format. Time should be in 24 hour format (HH:MM)");
    }else{
      setError("");
      let nextDoses = [];
      let time = new Date("1970-01-01 " + firstDoseTime + ":00");
      for (let i = 1; i <= numDoses; i++) {
        time.setHours(time.getHours() + 24 / numDoses);
        nextDoses.push(time.toLocaleTimeString());
      }
      setNextDoses(nextDoses);
    }
  }

  return (
    <div>
      <h2>When is the next dose?</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number of doses per day:
          <input
            type="number"
            value={numDoses}
            onChange={(e) => setNumDoses(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Time of first dose:
          <input
            type="time"
            value={firstDoseTime}
            onChange={(e) => setFirstDoseTime(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">Calculate</button>
      </form>
      <br />
      <br />
      {error && <p style={{color:'red'}}>{error}</p>}
      {nextDoses.length > 0 && (
        <div>
          <p>Next doses:</p>
          <ul>
            {nextDoses.map((dose, index) => (
              <li key={index}>Take dose {index +2 } at {dose}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PillReminder;
