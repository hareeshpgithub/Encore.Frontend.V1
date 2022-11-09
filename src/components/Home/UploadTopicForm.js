/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIS } from "./../../config";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Switch } from '@material-ui/core';
import { isMobile } from '../../utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  success: {
    color: "green",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  searchBar: {
    height: "30px",
    width: "200px",
    [theme.breakpoints.up("sm")]: {
      height: "40px",
    },
  },
  switchBase: {
    "&$disabled": {
      color: "yellow"
    },
    "&$disabled + $track": {
      backgroundColor: "green",
      opacity: 0.5
    }
  },
  track: {},
  disabled: {}
}));


function createData(number, date, activity) {
  return { number, date, activity };
}



export default function UploadTopicForm({ onClose, subjectId }) {

  const classes = useStyles();
  const [flag, setFlag] = useState({ type: "", msg: "" });
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedMsg, setCheckedMsg] = useState("Punched Out");
  const [loader, setLoader] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [switchStatus, setswitchStatus] = useState(false);

  // const navigate = useNavigate();

  const switchHandler = (event) => {
    setChecked(event.target.checked);
    var URI = ""
    var ACT = ""
    if (event.target.checked === true) {

      URI = APIS.setPunchIn
      ACT = "PunchIn"
    } else {
      URI = APIS.setPunchOut
      ACT = "PunchOut"
    }
    // Check Pending - if already don't call
    if (isMobile()) {
      setCheckedMsg("Please Wait ...");
      setswitchStatus(true); // disabled
      window.Android.getLocation();
      setTimeout(() => {
        var uid = window.Android.getUniqueID();
        var dTime = formatDate();
        var uTime = unixTimeStamp();
        var lat = window.Android.getLatitude();
        var lot = window.Android.getLongitude();
        var addr = window.Android.getAddress();
        var bat = window.Android.getBattery();
        var activity = ACT;

        axios.post(URI, {
          "UID": uid,
          "DTIME": dTime,
          "UTIME": uTime,
          "LAT": lat,
          "LOT": lot,
          "ADDR": addr,
          "BAT": bat,
          Activity: activity
        })
          .then((response) => {
            if (response &&
              (response.status === 200 || response.status === 201)) {
              console.log("inside" + ACT);
              setswitchStatus(false);
              // Update Shared Pref
              if (ACT === "PunchOut") {
                window.Android.punchOut();
                setCheckedMsg("Punched Out")
              } else {
                window.Android.punchIn();
                setCheckedMsg("Punched In")
              }
              getAttendanceData();
            }
          })
          .catch(function (error) {
            console.log(error);
            setCheckedMsg("Failed");

            setTimeout(() => {
              setswitchStatus(false);
              if (ACT === "PunchOut") {
                console.log(1);
                setChecked(true);
              } else {
                console.log(1);
                setChecked(false);
              }
            }, 1000)
            // if (error.response) {
            //   // Request made and server responded
            //   console.log(error.response.data);
            //   console.log(error.response.status);
            //   console.log(error.response.headers);
            // } else if (error.request) {
            //   // The request was made but no response was received
            //   console.log(error.request);
            // } else {
            //   // Something happened in setting up the request that triggered an Error
            //   console.log('Error', error.message);
            // }

          });
      }, 3000)


    } else {
      console.log("Only Mobile Support")
    }
  };

  function unixTimeStamp() {
    const d = new Date();
    return Math.floor(d.getTime() / 1000)
  }


  const handleChange = (e) => {
    switch (e.target.name) {
      case "filename":
        setFilename(e.target.value);
        break;
      case "file":
        setFile(e.target.files[0]);
        break;
      case "tags":
        setTags(e.target.value);
        break;
      default:
      // Eslint fix
    }
  };

  function formatDate() {
    const d = new Date();
    var newDate = new Date(d);

    var sMonth = padValue(newDate.getMonth() + 1);
    var sDay = padValue(newDate.getDate());
    var sYear = newDate.getFullYear();
    var sHour = newDate.getHours();
    var sMinute = padValue(newDate.getMinutes());
    var sSeconds = padValue(newDate.getSeconds());
    var sAMPM = "AM";

    var iHourCheck = parseInt(sHour);

    if (iHourCheck > 12) {
      sAMPM = "PM";
      sHour = iHourCheck - 12;
    }
    else if (iHourCheck === 0) {
      sHour = "12";
    }

    sHour = padValue(sHour);

    return sDay + "-" + sMonth + "-" + sYear + " " + sHour + ":" + sMinute + ":" + sSeconds + " " + sAMPM;
  }

  function padValue(value) {
    return (value < 10) ? "0" + value : value;
  }

  useEffect(() => {
    if (isMobile()) {
      getAttendanceData(true);
    } else {
      console.log("Only Mobile Support");
    }

  }, []);


  function getAttendanceData(loadStatus = false) {
    if (loadStatus) {
      var sharedPrefStatus = window.Android.getPunchStatus();
      setChecked(sharedPrefStatus);
    }
    var UID = window.Android.getUniqueID();
    axios.post(APIS.getAttendance, {
      "UID": UID
    })
      .then((response) => {
        if (response &&
          (response.status === 200 || response.status === 201)) {
          console.log(response.data);
          var rows = [];
          for (var i = 0; i < response.data.attendance_filter.length; i++) {
            console.log(response.data.attendance_filter[i].DTIME)
            var j = i + 1;
            var temp = createData(j, response.data.attendance_filter[i].DTIME, response.data.attendance_filter[i].Activity)
            rows.push(temp)
          }
          setRowData(rows);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Attendance
        </Typography>
        <div style={{ marginTop: 10, marginLeft: 250 }}>
          <Switch disabled={switchStatus} checked={checked} onChange={switchHandler} />
        </div>
        <div style={{ marginLeft: 250, fontWeight: 'bold' }} >
          {checkedMsg}
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map((row) => (
                <TableRow key={row.number}>
                  <TableCell component="th" scope="row">
                    {row.number}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.activity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container >
  );
}
