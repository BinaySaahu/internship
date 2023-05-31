import React, { useEffect, useState } from "react";
import "./Modal.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Loader from "./Loader";
import { BASE_URL } from "../helper";
function Modal({ setShowModal, setInfo, info }) {
  const [user, setUser] = useState({
    name: "",
    mobileNo: "",
    email: "",
    hobbies: "",
  });
  const [err, setErr] = useState("");
  const [loader, setLoader] = useState(false);
  const dataInp = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(user);
  };
  const handleSave = async () => {
    
    if (
      user.name !== "" &&
      user.email !== "" &&
      user.mobileNo !== "" &&
      user.mobileNo.length>=10 &&
      user.mobileNo.length<=12 &&
      user.hobbies !== ""
    ) {
      setLoader(true);
      try {
        await axios
          .post(`${BASE_URL}/user/postdata`, user)
          .then((res) => {
            if (res.status === 200) {
              setLoader(false);
              console.log("success");
              setInfo((info) => [...info, user]);
              localStorage.setItem('user',info);
              setShowModal(false);
            }
          });
      } catch (err) {
        setLoader(false);
        if (err.response.data.code === 1) {
          setErr("An entry already exists with the same email id");
        }
        else if (err.response.data.code === 3) {
          setErr("Invalid Email Format");
        }
        console.log(err);
      }
    } else {
      if(user.mobileNo !== "" && (user.mobileNo.length<10 || user.mobileNo.length>12))
      {
        setErr("Invalid mobile number");
      }
      else{
      setErr("Please fill all the fields");
      }
    }
  };

  useEffect(() => {
    setErr("");
  }, [user]);
  return (
    <div className="modal">
      <div className="modal_form">
        <h1>Enter details</h1>
        <CloseIcon onClick={() => setShowModal(false)} className="closebtn" />
        <input
          type="text"
          name="name"
          id=""
          placeholder="Enter your name"
          onChange={dataInp}
        />
        <input
          type="number"
          name="mobileNo"
          id=""
          placeholder="Enter your number"
          onChange={dataInp}
        />
        <input
          type="email"
          name="email"
          id=""
          placeholder="Enter your email"
          onChange={dataInp}
        />
        <input
          type="text"
          name="hobbies"
          id=""
          placeholder="Enter your hobbies"
          onChange={dataInp}
        />
        <button className="btn_save" onClick={handleSave}>
          Save
        </button>
        <p className="errmssg" style={{ color: err ? "red" : "transparent" }}>
          {err}
        </p>
      </div>
      {loader&&<Loader/>}
    </div>
  );
}

export default Modal;
