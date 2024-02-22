// import PuppyList from "./PuppyList.jsx";
import { puppyList } from "./data.js";
import { useState } from "react";
import "./App.css";


function App() {
  console.log(puppyList);
  const [puppies, setPuppies] = useState(puppyList);
  const [featPupId, setFeatPupId] = useState(null);

  
  const featuredPup = puppies.find((pup) => pup.id === featPupId);
  // console.log(featuredPup);

  return (
    <>
      <div>
        <h1 className="header"> 🐶 Puppy List 🐶</h1>
      </div>
      <div className="puppyList">
        {puppies.map((puppy) => {
          return (
            <p
              key={puppy.id}
              onClick={() => {
                setFeatPupId(puppy.id);
              }}
            >
              <li>
                🆔 : {puppy.name}
              </li>
            </p>
          );
        })}
      </div>

      <div className="newList">
        <h2> Your Puppy Choice : </h2>
        🐶 🆔 ➡{" "}
        {featPupId && (
          <div>
            <h3>{featuredPup.name}</h3>
            <ul className="ulList">
              <li>Age: {featuredPup.age}</li>
              <li>Email: {featuredPup.email}</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
