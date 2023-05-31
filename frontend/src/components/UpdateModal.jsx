import React, { useEffect, useState } from "react";
import "./UpdateModal.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Loader from "./Loader";
import { BASE_URL } from "../helper";

function UpdateModal({ setShowUpdateModal, info, setInfo, idx, ind }) {
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
  };
  const handleSave = async () => {
    const oldEmail = ind.email;
    const { email, mobileNo, name, hobbies } = user;
    const userObj = {
      oldEmail,
      email,
      mobileNo,
      name,
      hobbies,
    };
    if (
      user.name !== "" &&
      user.email !== "" &&
      user.mobileNo !== "" &&
      user.mobileNo.length >= 10 &&
      user.mobileNo.length <= 12 &&
      user.hobbies !== ""
    ) {
      setLoader(true);
      try {
        await axios
          .post(`${BASE_URL}/user/updatedata`, userObj)
          .then((res) => {
            if (res.status === 200) {
              
              let updateditem = info[idx];
              updateditem = user;
              setInfo(
                info.map((item, indx) => (indx === idx ? updateditem : item))
              );
              setLoader(false);
              setShowUpdateModal(false);
            }
          });
      } catch (err) {
        setLoader(false);
        if (err.response.data.code === 2){
          setErr("Unwanted error");
        }else if(err.response.data.code === 3)
        {
          setErr("Invalid email format");
        } 
        console.log(err);
      }
    } else {
      if (user.mobileNo !== "" && (user.mobileNo.length < 10 || user.mobileNo.length > 12)) {
        setErr("Invalid mobile number");
      } else {
        setErr("Please fill all the fields");
      }
    }
  };
  useEffect(() => {
    user.name = ind.name;
    user.email = ind.email;
    user.mobileNo = ind.mobileNo;
    user.hobbies = ind.hobbies;
    document.getElementById("name").setAttribute("value", ind.name);
    document.getElementById("phno").setAttribute("value", ind.mobileNo);
    document.getElementById("email").setAttribute("value", ind.email);
    document.getElementById("hob").setAttribute("value", ind.hobbies);
  }, []);


  useEffect(()=>{
    setErr("")

  },[user])
  return (
    <div className="updatemodal">
      <div className="updatemodal_form">
        <h1>Update details</h1>
        <CloseIcon
          onClick={() => setShowUpdateModal(false)}
          className="closebtn_update"
        />
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          onChange={dataInp}
        />
        <input
          type="number"
          name="mobileNo"
          id="phno"
          placeholder="Enter your number"
          onChange={dataInp}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          onChange={dataInp}
        />
        <input
          type="text"
          name="hobbies"
          id="hob"
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

export default UpdateModal;
