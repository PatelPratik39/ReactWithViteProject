// import PuppyList from "./PuppyList.jsx";
import { puppyList } from "./data.js";
import { useState } from "react";
import './App.css'

function App() {
  console.log(puppyList);
  const [puppies, setPuppies] = useState(puppyList);
  // console.log(puppies);
  return (
    <>
      <div>
        <h1 className="header"> 🐶 Puppy List 🐶</h1>
      </div>
      <div className="puppyList">
        {puppies.map((puppy) => {
          return (
            <p key={puppy.id}>
              <li>
                Name : {puppy.name} - Age :  {puppy.age}
              </li>
            </p>
          );
        })}
      </div>
    </>
  );
}

export default App;
