/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import Settings from "@material-ui/icons/Settings";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { isMobile } from "./../utils";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIS } from "./../config";

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
}));

export default function SignUp() {
  const classes = useStyles();
  const [flag, setFlag] = useState({ type: "", msg: "" });
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  var uid,
    uName,
    pNum,
    fcmt,
    br,
    prod,
    dTime,
    uTime,
    lat,
    lot,
    addr,
    bat,
    activity = "";

  const handleChange = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "mobile":
        setMobile(e.target.value);
        break;
      case "remember":
        setRemember(e.target.checked);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setRole("HR Manager");
    if (isMobile()) {
      // uid = window.Android.getUniqueID();
      // fcmt = window.Android.getFCMID();
      // prod = "NA";
      // dTime = formatDate();
      // uTime = unixTimeStamp();
      // lat = window.Android.getLatitude();
      // lot = window.Android.getLongitude();
      // addr = window.Android.getAddress();
      // addr = window.Android.getBattery();
      // activity = "Register";
    }

    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>" + uid);
    // // sessionStorage.setItem("uid", uid);
    // // localStorage.setItem("uid", "uid");
    // // const uid1 = sessionStorage.getItem("uid") || localStorage.getItem("uid");
    // // console.log(">>>>>>>>>" + uid1);
    // // console.log(uid1);
    // if (typeof (Storage) !== "undefined") {
    //   console.log("localStorage is available.");
    //   try {
    //     // sessionStorage.removeItem("uid");
    //     // localStorage.removeItem("uid");
    //     // sessionStorage.setItem("uid", uid);
    //     // remember && localStorage.setItem("uid", uid);
    //   } catch (error) {
    //     console.log(error.message);
    //   }

    //   try {
    //     const userToken = sessionStorage.getItem("uid") || localStorage.getItem("uid");
    //     console.log("UniqueID: " + userToken);
    //   } catch (error) {
    //     console.log(error.message);
    //   }

    //   console.log(formatDate())
    //   console.log(unixTimeStamp())

    // }
    //   else {
    //     console.log("localStorage is not supported by current browser.");
    // }
  }, []);

  function unixTimeStamp() {
    const d = new Date();
    return Math.floor(d.getTime() / 1000);
  }

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
    } else if (iHourCheck === 0) {
      sHour = "12";
    }

    sHour = padValue(sHour);

    return (
      sDay +
      "-" +
      sMonth +
      "-" +
      sYear +
      " " +
      sHour +
      ":" +
      sMinute +
      ":" +
      sSeconds +
      " " +
      sAMPM
    );
  }

  function padValue(value) {
    return value < 10 ? "0" + value : value;
  }

  const selectionChangeHandler = (event) => {
    setRole(event.target.value);
  };

  const selectionChangeBranchHandler = (event) => {
    setBranch(event.target.value);
  };

  const checkPermissions = () => {
    const ret = window.Android.cPermissions();
    console.log("here >>>>>>>>>>>>>>>>" + ret);
    return ret;
  };

  const setPermissions = () => {
    window.Android.permissionsSet();
  };

  const getDetails = (username, mobile, role, branch) => {
    console.log("calling :::::::::::::::::::");
    const ret = window.Android.permissionsSet();
    console.log("Details :::::::::::::::::::" + ret);
    return ret;
  };

  const getMobileOS = () => {
    const ua = navigator.userAgent;
    console.log(ua);
    if (/android/i.test(ua)) {
      return "Android";
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ) {
      return "iOS";
    }
    return "Other";
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const handleClick = (e) => {
    setFlag({ type: "", msg: "" });
    if (username && role && mobile && branch) {
      e.preventDefault();
      if (mobile.length < 10) {
        return setFlag({ type: "error", msg: "Check Mobile Number" });
      } else if (checkPermissions() === false) {
        setPermissions();
        return setFlag({ type: "error", msg: "Click Settings" });
      }

      console.log(isMobile());
      if (!isMobile()) {
        console.log("Inside");
        <Popup trigger={<button> Trigger</button>} position="right center">
          <div>Popup content here !!</div>
        </Popup>;
        return setFlag({
          type: "error",
          msg: "Only mobile Device's are Supported",
        });
      } else {
        console.log("Outside");
        setFlag({ type: "success", msg: "Please Wait ....!" });
        window.Android.getLocation();
        setTimeout(() => {
          console.log(APIS.register);
          uid = window.Android.getUniqueID();
          fcmt = window.Android.getFCMID();
          prod = "NA";
          dTime = formatDate();
          uTime = unixTimeStamp();
          lat = window.Android.getLatitude();
          lot = window.Android.getLongitude();
          addr = window.Android.getAddress();
          bat = window.Android.getBattery();
          activity = "Register";
          axios
            .post(APIS.register, {
              UID: uid,
              UNAME: username,
              IMEI: "NA",
              PNUM: mobile,
              FCMT: fcmt,
              ROLE: role,
              BR: branch,
              PROD: prod,
              DTIME: dTime,
              UTIME: uTime,
              LAT: lat,
              LOT: lot,
              ADDR: addr,
              BAT: bat,
              Activity: activity,
            })
            .then((response) => {
              if (
                response &&
                (response.status === 200 || response.status === 201)
              ) {
                // On Android some issue in storage -  PFA
                // sessionStorage.setItem("userToken", username);
                // remember && localStorage.setItem("userToken", username);
                setFlag({ type: "success", msg: "Registered successfully!" });
                window.Android.registrationSuccessful();
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              } else {
                setFlag({ type: "error", msg: "some error occurred" });
              }
            })
            .catch((error) => {
              let msg =
                error.response?.data?.detail ||
                error.message ||
                "some error occurred";
              setFlag({ type: "error", msg });
            });
        }, 3000);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <AppBar position="relative">
        <Toolbar className={classes.topNav}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{ cursor: "pointer" }}
            className={classes.topNavTitle}
          >
            Encore
          </Typography>
          <Box display="flex" flexGrow={1} style={{ width: "67%" }}></Box>
          <Grid item>
            <IconButton color="inherit" onClick={setPermissions}>
              <Settings className={classes.settingsBar} />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile Number"
            name="mobile"
            autoComplete="mobile"
            type="number"
            onChange={handleChange}
          />

          {/* <FormControl
            required
            fullWidth
            style={{ marginTop: 10, marginLeft: 0 }}
          >
            <Select displayEmpty value={role} onChange={selectionChangeHandler}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Service Executive - Volvo"}>
                Service Executive - Volvo
              </MenuItem>
              <MenuItem value={"Service Coordinator - Volvo"}>
                Service Coordinator - Volvo
              </MenuItem>
              <MenuItem value={"F.S.S (TL) - Volvo"}>
                F.S.S (TL) - Volvo
              </MenuItem>
              <MenuItem value={"Service Manager - Volvo"}>
                Service Manager - Volvo
              </MenuItem>
              <MenuItem value={"CST - Volvo"}>CST - Volvo</MenuItem>
              <MenuItem value={"Sales Executive - Volvo"}>
                Sales Executive - Volvo
              </MenuItem>
              <MenuItem value={"Sales Manager - Volvo"}>
                Sales Manager - Volvo
              </MenuItem>
              <MenuItem value={"Service Executive - Ajax"}>
                Service Executive - Ajax
              </MenuItem>
              <MenuItem value={"Service Coordinator - Ajax"}>
                Service Coordinator - Ajax
              </MenuItem>
              <MenuItem value={"Team Lead / ASM - Ajax"}>
                Team Lead / ASM - Ajax
              </MenuItem>
              <MenuItem value={"Service Manager - Ajax"}>
                Service Manager - Ajax
              </MenuItem>
              <MenuItem value={"Business Head - Ajax"}>
                Business Head - Ajax
              </MenuItem>
              <MenuItem value={"Sales Executive - Ajax"}>
                Sales Executive - Ajax
              </MenuItem>
              <MenuItem value={"Sales Manager - Ajax"}>
                Sales Manager - Ajax
              </MenuItem>
              <MenuItem value={"Parts Executive - Sandvik"}>
                Parts Executive - Sandvik
              </MenuItem>
              <MenuItem value={"Accounts Executive"}>
                Accounts Executive
              </MenuItem>
              <MenuItem value={"Accounts Manager"}>Accounts Manager</MenuItem>
              <MenuItem value={"HR Executive"}>HR Executive</MenuItem>
              <MenuItem value={"HR Manager"}>HR Manager</MenuItem>
            </Select>
            <FormHelperText>Select the Role</FormHelperText>
          </FormControl> */}

          <FormControl
            required
            fullWidth
            style={{ marginTop: 10, marginLeft: 0 }}
          >
            {/* <InputLabel shrink>Months</InputLabel> */}
            <Select
              displayEmpty
              value={branch}
              onChange={selectionChangeBranchHandler}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"BANGALORE"}>BANGALORE</MenuItem>
              <MenuItem value={"BIJAPUR"}>BIJAPUR</MenuItem>
              <MenuItem value={"CHITRADURGA"}>CHITRADURGA</MenuItem>
              <MenuItem value={"DAVANGERE"}>DAVANGERE</MenuItem>
              <MenuItem value={"GULBARGA"}>GULBARGA</MenuItem>
              <MenuItem value={"HASSAN"}>HASSAN</MenuItem>
              <MenuItem value={"HOSPET"}>HOSPET</MenuItem>
              <MenuItem value={"HUBLI"}>HUBLI</MenuItem>
              <MenuItem value={"MANGALORE"}>MANGALORE</MenuItem>
              <MenuItem value={"MYSORE"}>MYSORE</MenuItem>
              <MenuItem value={"NELLORE"}>NELLORE</MenuItem>
            </Select>
            <FormHelperText>Select the Branch</FormHelperText>
          </FormControl>

          {/* <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
            name="remember"
            onChange={handleChange}
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Sign Up
          </Button>

          <Box mt={8}>
            {flag.type && <h3 className={classes[flag.type]}>{flag.msg}</h3>}
          </Box>
          {/* <Grid container>
            <Grid item>
              <Link href="/signin" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container>
  );
}
