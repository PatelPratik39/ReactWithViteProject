import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import Register from "./Components/Register";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  // get All users using useEffect hook
  useEffect(() => {
    getAllUsers();
  }, []);

  // Search function using useeffect hook

  useEffect(() => {
    const getSingleUser = async () => {
      try {
        const response = await axios.get(`/users/${search}`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getSingleUser();
  }, [search]);

  // edit the user by passing the "user"parameter
  // 1 . i will open the register modal and set= true and set the user data
  const editUser = (user) => {
    setModal(true);
    setUserData(user);
  };

  // Delete function
  // Delet the user using Id and passing id parameter in async function

  const deleteUser = async (id) => {
    await axios.delete(`/users/${id}`).then((res) => setUsers(res.data));
  };
  // useEffect(() => {
  //   const deleteUser = async (id) => {
  //     try {
  //       await axios.delete(`/users/${id}`).then((res) => setUsers(res.data));
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };
  //   deleteUser();
  // }, []);

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col justify-around items-center mt-[5px] mb-[10px] bg-[#282c35] text-white">
        <h1 className="text-[39px]">
          📝 " Modify Employee Table Data using CRUD " 📝
        </h1>
        <div className="w-[800px]">
          <input
            type="text"
            placeholder="Search Data using ID ..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[50px] rounded border border-black-2 my-[30px] pl-[10px] text-black"
          />
          <table className="border-collapse border border-slate-400 w-full ">
            <thead>
              <tr>
                <th className="border border-slate-300">Id</th>
                <th className="border border-slate-300">First Name</th>
                <th className="border border-slate-300">Salary</th>
                <th className="border border-slate-300">Department</th>
                <th className="border border-slate-300">Machine Id</th>
                <th className="border border-slate-300">Experience</th>
                <th className="border border-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="border border-slate-300">{user.id}</td>
                    <td className="border border-slate-300">{user.name}</td>
                    <td className="border border-slate-300">{user.salary}</td>
                    <td className="border border-slate-300">
                      {user.department}
                    </td>
                    <td className="border border-slate-300 ">
                      {user.machineId}
                    </td>
                    <td className="border border-slate-300">
                      {user.experience}
                    </td>
                    <td className="border border-slate-300">
                      <div className="flex justify-around">
                        <div className="text-[30px] text-yellow-500 cursor-pointer">
                          <MdModeEdit onClick={() => editUser(user)} />
                        </div>
                        <div className="text-[30px] text-red-500 cursor-pointer">
                          <MdDeleteForever
                            onClick={() => deleteUser(user.id)}
                          />
                        </div>
                      </div>
                    </td>{" "}
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-around items-center mt-[30px]">
            <button
              onClick={() => setModal(true)}
              className="text-[17px] border border-1 p-1 bg-green-700 w-[100px] text-white rounded"
            >
              Add User
            </button>
          </div>
        </div>
        {modal && (
          <Register
            modal={modal}
            setModal={setModal}
            userData={userData}
            setUserData={setUserData}
            getAllUsers={getAllUsers}
          />
        )}
      </div>
    </>
  );
}

export default App;
