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
        "Ocp-Apim-Subscription-Key": "f58a07582176480e9d753e31fe2c342c",
      },
    };

    axios
      .delete(
        `https://eastus.api.cognitive.microsoft.com/face/v1.0/largefacelists/msclubmember/persistedfaces/${ProfileID}`,
        config
      )
      .then(() => {
        //alert("Face Deleted from Large Face List Successfully");
        setStateOfProcess("Processing....");
        axios
          .post(
            "https://eastus.api.cognitive.microsoft.com/face/v1.0/largefacelists/msclubmember/train",
            "",
            config
          )
          .then(() => {
            //alert("Dataset Trained Successfully");
            setStateOfProcess("Processing....");
            axios
              .delete(
                "https://msclub-faceautheticator.herokuapp.com/users/delete/" +
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
      <div style={{ margin: "10% 25%" }}>
        <div className="container">
          <h3 style={{ color: "red" }}>{StateOfProcess}</h3>
        </div>
        <h1>Login Successful</h1>
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
