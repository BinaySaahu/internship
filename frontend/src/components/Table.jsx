import React, { useState } from "react";
import UpdateModal from "./UpdateModal";
import axios from "axios";
import Loader from "./Loader";
import { BASE_URL } from "../helper";

function Table({ idx, ind, info, setInfo, selected, setSelected }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [loader, setLoader] = useState(false);
  
  const handleUpdate = () => {
    setShowUpdateModal(true);
  };
  const handleDelete = () => {
    const email = ind.email;
    setLoader(true);
    try {
      axios
        .post(`${BASE_URL}/user/deleteData`, { email })
        .then((res) => {
          if (res.status === 200) {
            setInfo(res.data);
            setLoader(false);
          } else {
            console.log("Cannot find the email");
          }
        });
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  const handleChange = (e,idx)=>{
    if (e.target.checked) {
      setCheck(true);
      setSelected(selected=>[...selected, idx]);
    }else {
      setCheck(false)
      setSelected(selected.filter(id => id !== idx));
    }
  }
  console.log(selected);
  return (
    <>
      <tr key={idx} style={{backgroundColor: check?'rgb(74 85 113)':'rgb(49 55 71)'}}>
        <td>
          <input type="checkbox" name="row" onChange={(e)=>handleChange(e,idx)} />
        </td>
        <td>{idx + 1}</td>
        <td>{ind.name}</td>
        <td>{ind.mobileNo}</td>
        <td>{ind.email}</td>
        <td>{ind.hobbies}</td>
        <td>
          <button className="btn btn_update" onClick={handleUpdate}>
            Update
          </button>
          <button className="btn btn_delete" onClick={handleDelete}>
            delete
          </button>
        </td>
      </tr>
      {showUpdateModal && (
        <UpdateModal
          setShowUpdateModal={setShowUpdateModal}
          idx={idx}
          info={info}
          setInfo={setInfo}
          ind={ind}
        />
      )}
      {loader&&<Loader/>}
    </>
  );
}

export default Table;
