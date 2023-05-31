import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Modal from "../components/Modal";
import Table from "../components/Table";
import axios from "axios";
import Swal from "sweetalert2";
import EmptyRow from "../components/EmptyRow";
import Loader from "../components/Loader";
import { BASE_URL } from "../helper";

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);

  const [loader, setLoader] = useState(false);
  const [info, setInfo] = useState([]);
  const handleAdd = () => {
    setShowModal(true);
  };

  useEffect(() => {
    try {
      setLoader(true);
      axios.get(`${BASE_URL}/user/getData`).then((res) => {
        setLoader(false)
        setInfo(res.data);
      });
      console.log(info);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  }, []);

  const handleSend = async () => {
    if (info.length === 0) {
      Swal.fire({
        title: "No data in the table",
        icon: "error",
        confirmButtonText: "ok",
        confirmButtonColor: "#4CAF50",
        background: "rgb(49 55 71)",
        color: "#fff",
      });
      return;
    }
    else if(selected.length === 0){
      Swal.fire({
        title: "Please Select a row",
        icon: "error",
        confirmButtonText: "ok",
        confirmButtonColor: "#4CAF50",
        background: "rgb(49 55 71)",
        color: "#fff",
      });
      return;


    } else {
      setLoader(true);
      let selectedRows = [];
      for (let i = 0; i < selected.length; i++) {
        const index = selected[i];
        console.log(info[index]);
        selectedRows.push(info[index]);
      }
      try{
      await axios
        .post(`${BASE_URL}/user/sendMail`, selectedRows)
        .then((res) => {
          if (res.status === 200) {
            setLoader(false);
            Swal.fire({
              title: "Mail Sent",
              icon: "success",
              confirmButtonText: "ok",
              confirmButtonColor: "#4CAF50",
              background: "rgb(49 55 71)",
              color: "#fff",
            });
          }
        });
      }catch(err)
      {
        setLoader(false);
        console.log(err);
      }
    }
  };
  return (
    <div className="homepage">
      <div className="homepage_table">
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Hobbies</th>
              <th>Update/delete</th>
            </tr>
          </thead>
          <tbody>
            {info.length ? (
              info.map((ind, idx) => (
                <Table
                  idx={idx}
                  ind={ind}
                  info={info}
                  setInfo={setInfo}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))
            ) : (
              <EmptyRow />
            )}
            {/* {console.log(emptyRow)}
            {emptyRow&&} */}
          </tbody>
        </table>
        <div className="homapage_btns">
          <button onClick={handleAdd} className="btn btn_add">
            Add
          </button>
          <button onClick={handleSend} className="btn btn_send">
            Send
          </button>
        </div>
        {loader && (
          <Loader/>
        )}
        {showModal && (
          <Modal setShowModal={setShowModal} setInfo={setInfo} info={info} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
