import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";

function App() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/patients")
    .then((res) => res.json())
    .then((data) => setPatients(data.patients));
  }, []);
  return (
    <div className="App">
      {patients.map((patient, index) => (
        <div key={index}>
          <span>{patient.PREFERREDNAME}</span>
          <span>{patient.INTERNALID}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
