/* eslint-disable no-unused-vars */
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import React, { useState, useEffect } from "react";
import { APIS } from "../../config";
import axios from "axios";
import { isMobile } from "../../utils";

export default function Welcome() {
  const [loader, setLoader] = useState(true);
  const [erroMsg, setErrorMsg] = useState("");
  const [uname, setUname] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [balance, setBalance] = useState(0.0);
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    console.log("Mobile: " + isMobile());
    if (isMobile()) {
      var UID = window.Android.getUniqueID();
      console.log("HOME: " + UID);
      setErrorMsg("");
      axios
        .post(APIS.getDetails, {
          UID: window.Android.getUniqueID(),
        })
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          if (
            response &&
            response &&
            (response.status === 200 || response.status === 201)
          ) {
            setUname(response.data["userDetails"]["UNAME"]);
            setRole(response.data["userDetails"]["ROLE"]);
            setBranch(response.data["userDetails"]["BR"]);
            setBalance(response.data["userDetails"]["BALANCE"].toFixed());
            setMobile(response.data["userDetails"]["PNUM"]);
            setStatus(response.data["userDetails"]["STATUS"]);
            console.log(status + ":::::::::::::::::");
          }
        })
        .catch((error) => displayErrorMessage(error));
    } else {
      displayErrorMessage("Only Mobile Support");
    }
  }, []);

  const displayErrorMessage = (error) => {
    let msg =
      error?.response?.data?.detail || error.message || "some error occurred";

    setLoader(false);
    setErrorMsg(msg);
  };

  return (
    <Container maxWidth="sm">
      {/* <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="-"
      /> */}
      <Typography
        component="h2"
        variant="h4"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Encore Heavy Machinery
      </Typography>
      <Typography variant="h5" align="left" color="textSecondary" paragraph>
        Welcome {uname}
      </Typography>
      <Typography variant="body1" align="left" color="textSecondary">
        Phone: {mobile}
      </Typography>
      <Typography variant="body1" align="left" color="textSecondary">
        Branch: {branch}
      </Typography>
      {/* <Typography variant="body1" align="left" color="textSecondary">
        Role: {role}
      </Typography> */}
      <Typography variant="body1" align="left" color="textSecondary">
        Balance: ₹ {balance}
      </Typography>
      <Typography
        hidden={status}
        variant="body1"
        align="left"
        color="secondary"
      >
        Status: Not Enabled, Please check with your Reporting Manager & Restart
        the Application
      </Typography>
    </Container>
  );
}
