import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [users, setUser] = useState();

  useEffect(() => {
    const getUsers = async() =>{
        await axios.get("http://localhost:4000/api/users").then((res) => setUser(res.data));
    }
    getUsers();
  }, []);

  return <>
    {
      (users) && users.map((user) => {
        return(
          <div>
            <li>{`${user.empId} ${user.empname} ${user.salary}`}</li>
          </div>
        )
      })
    }
  </>;
}

export default App;
