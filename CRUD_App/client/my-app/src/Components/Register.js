import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";

const Register = ({ modal, setModal, userData, setUserData, getAllUsers }) => {
  const toggle = () => setModal(!modal);

  const handleOnChange = (e) => {
    // I change user data through e
    // setUserData({ ...userData, [e.target.value]: e.target.value });
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  //   handleSubmit method to make changes the data

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      if (userData.id) {
        await axios
          .patch(`/users/${userData.id}`, userData)
          .then((res) => console.log(res));
      } else {
        await axios.post("/users", userData).then((res) => console.log(res));
      }
      setUserData(null);
      getAllUsers();
      toggle();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Register Here</ModalHeader>
          <ModalBody>
            <div>
              <label> First Name : </label>
              <Input
                type="text"
                placeholder="Enter your Name"
                name="name"
                value={userData?.name || ""}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label> Salary : </label>
              <Input
                type="text"
                placeholder="Enter your Salary"
                name="salary"
                value={userData?.salary || ""}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label> Department : </label>
              <Input
                type="text"
                placeholder="Enter your department"
                name="department"
                value={userData?.department || ""}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label> Machine Id : </label>
              <Input
                type="text"
                placeholder="Enter your machineID"
                name="machineId"
                value={userData?.machineId || ""}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label> Experience : </label>
              <Input
                type="text"
                placeholder="Enter your Experience"
                name="experience"
                value={userData?.experience || ""}
                onChange={handleOnChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={handleSubmit}>
              Update
            </Button>{" "}
            <Button color="danger" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default Register;
