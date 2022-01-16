import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserComponent() {
  const [ProfileID, setProfileID] = useState("");
  const [UserName, setUserName] = useState("");
  const [StateOfProcess, setStateOfProcess] = useState("");

  useEffect(() => {
    setProfileID(localStorage.getItem("UserID"));
    setUserName(localStorage.getItem("UserName"));
  }, []);

  function logoutFunc() {
    localStorage.removeItem("UserID");
    localStorage.removeItem("UserName");
    window.location = "/";
  }

  function deleteAccount() {
    const config = {
      headers: {
        "Ocp-Apim-Subscription-Key":  process.env.REACT_APP_OCP_KEY,
      },
    };

    axios
      .delete(
        `https://eastus.api.cognitive.microsoft.com/face/v1.0/largefacelists/msclubmember/persistedfaces/${ProfileID}`,
        config
      )
      .then(() => {
        setStateOfProcess("Processing....");
        axios
          .post(
            "https://eastus.api.cognitive.microsoft.com/face/v1.0/largefacelists/msclubmember/train",
            "",
            config
          )
          .then(() => {
            setStateOfProcess("Processing....");
            axios
              .delete(
                `${process.env.REACT_APP_BACKEND_URL}/users/delete/` +
                  ProfileID
              )
              .then(() => {
                localStorage.removeItem("UserID");
                localStorage.removeItem("UserName");
                setStateOfProcess("Account Deleted....");
                window.location = "/";
              })
              .catch((err) => {
                alert(err);
              });
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-12 text-center">
        <img
          src="/assets/ms_club_logo.png"
          alt="ms-club-logo"
          className="navbar-logo"
          width="200px"
        />
        </div>
        <div className="col-md-12  text-center">
        <h1>MS CLUB FACE AUTHENTICATOR</h1>
        </div>

      </div>
      <hr/>
      <div className="text-center">
        <div className="container">
          <h3 style={{ color: "red" }}>{StateOfProcess}</h3>
        </div>
        <br />
        <h1>Hello {UserName}</h1>
        <br />
        <button
          className="btn btn-warning"
          onClick={logoutFunc}
          style={{ margin: "10px" }}
        >
          Logout
        </button>
        <button
          className="btn btn-danger"
          onClick={deleteAccount}
          style={{ margin: "10px" }}
        >
          Remove Account
        </button>
      </div>
    </div>
  );
}
