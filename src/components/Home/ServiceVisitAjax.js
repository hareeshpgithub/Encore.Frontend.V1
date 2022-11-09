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
import axios from "axios";
import { APIS } from "../../config";
import { isMobile, formatDate, unixTimeStamp } from "../../utils";
import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
} from "@material-ui/core";

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

export default function ServiceAjax({ onClose, subjectId }) {
  const classes = useStyles();
  const [flag, setFlag] = useState({ type: "", msg: "" });
  const [submit, SetSubmit] = useState(true);
  const [newicticket, SetNewICTicket] = useState(true);

  // Ticket Details
  const [icticket, SetICTicket] = useState("");
  const [icdate, SetICDate] = useState("");
  const [customername, SetCustomerName] = useState("");
  const [contactnumber, SetContactNumber] = useState("");
  const [serialnumber, SetSerialNumber] = useState("");
  const [model, SetModel] = useState("");
  const [location, SetLocation] = useState("");
  const [problem, SetProblem] = useState("");
  const [warrantystart, SetWarrantyStart] = useState("");
  const [warrantyend, SetWarrantyEnd] = useState("");
  const [outstanding, SetOutstanding] = useState(0.0);

  var icTicket = [];
  useEffect(() => {
    if (isMobile()) {
      getAjaxServiceTeam(true);
    } else {
      console.log("Only Mobile Support");
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    var abcarr = "";
    var abc1 =
      "Call details:IC No:652450, IC Dt:20.09.2022, Customer name:SRI VENKATADRI CONSTRUCTIONS, Contact No:9955172769, Machine Sl. No:AF1ASP50CDK005014 & Model:ASP5009-CONCRETEPUMP, Location:Kolar(Gulbagal), Problem:PARTS REPLACEMENT, Warranty Start:27.08.2019, Warranty End:27.08.2020, Outstanding:NIL. From Ajax Engg. ";
    var abc2 =
      "Call details:IC No:654583, IC Dt:07.10.2022, Customer name:H  NAGESHA, Contact No:7975962138, Machine Sl. No:AF1ARG20LJK008356 & Model:ARGO2000SELFLOADINGCONCRET, Location:Chitradurga(Vasadurga), Problem:DA VALVE PROBLEM, Warranty Start:16.10.2019, Warranty End:16.10.2020, Outstanding:NIL. From Ajax Engg. ";
    var abc3 =
      "Call details:IC No:653905, IC Dt:30.09.2022, Customer name:ANU SPUN PIPES, Contact No:8971474274, Machine Sl. No:AF1RLA20K00000827 & Model:20cumRADIALARMCONCRETEBATC, Location:Hassan(Aluru), Problem:GENERAL INSPECTION, Warranty Start:24.07.2018, Warranty End:24.07.2019, Outstanding:4101.00- INR. From Ajax Engg. ";
    var abc4 =
      "Call details:IC No:653327, IC Dt:27.09.2022, Customer name:MAHESH T S, Contact No:8296383533, Machine Sl. No:AF1ARG20CCM009526 & Model:ARGO2000SELFLOADINGCONCRET, Location:Hassan(Hoskopnuru), Problem:1500 HRS. SERVICE, Warranty Start:30.09.2021, Warranty End:30.09.2022, Outstanding:NIL. From Ajax Engg. ";

    abc1 = abc1.trim();
    abc1 = abc1.replace(". From Ajax Engg.", "");
    abcarr = abc1.split(",");
    console.log(abcarr);
    for (var i = 0; i < abcarr.length; i++) {
      parseSMSToArray(abcarr[i]);
    }
    e.preventDefault();
    setFlag({ type: "success", msg: "Please Wait ...!!" });
    window.Android.getLocation();
    setTimeout(() => {
      var uid = window.Android.getUniqueID();
      var username = window.Android.getUserName();
      var dTime = formatDate();
      var uTime = unixTimeStamp();
      var lat = window.Android.getLatitude();
      var lot = window.Android.getLongitude();
      var addr = window.Android.getAddress();
      var bat = window.Android.getBattery();
      var activity = "NewTicket";
      axios
        .post(APIS.newICToken, {
          ICTICKET: icticket,
          ICDATE: icdate,
          CUSTOMERNAME: customername,
          CONTACTNUMBER: contactnumber,
          SERIALNUMBER: serialnumber,
          MODEL: model,
          LOCATION: location,
          PROBLEM: problem,
          WARRANTYSTART: warrantystart,
          WARRANTYEND: warrantyend,
          OUTSTANDING: outstanding,
          DATECREATED: dTime,
          DATEASSIGNEDUTIME: uTime,

          // ASSIGNED:
          // COMPLETED

          // DATEASSIGNED

          // AMOUNTPAID,
          // AMOUNT,
          // FSRDOCUMENT,
          // TSIR,
          // UID,
          // USERNAME,
          // LAT,
          // LOT,
          // ADDR,
          // BAT,
          // DTIME,
          // UTIME,
          // REMARKS,
          // Activity,
        })
        .then((response) => {
          if (
            response &&
            (response.status === 200 || response.status === 201)
          ) {
            setFlag({ type: "success", msg: "Completed Successfully .." });
            setTimeout(() => {
              setFlag({ type: "", msg: "" });
            }, 1000);
          }
        })
        .catch(function (error) {
          setFlag({ type: "error", msg: error });
          setTimeout(() => {
            setFlag({ type: "", msg: "" });
          }, 1000);
        });
    }, 3000);
  };

  function parseSMSToArray(sms) {
    if (sms.includes("Call details")) {
      sms = sms.replace("Call details:IC No:", "").trim();
      SetICTicket(sms);
    } else if (sms.includes("IC Dt")) {
      sms = sms.replace("IC Dt:", "").trim();
      SetICDate(sms);
    } else if (sms.includes("Customer name")) {
      sms = sms.replace("Customer name:", "").trim();
      SetCustomerName(sms);
    } else if (sms.includes("Contact No")) {
      sms = sms.replace("Contact No:", "").trim();
      SetContactNumber(sms);
    } else if (sms.includes("Machine Sl. No:")) {
      sms = sms.split("&");
      for (var j = 0; j < sms.length; j++) {
        var tmp = sms[j].trim();
        if (tmp.includes("Machine Sl. No:")) {
          tmp = tmp.replace("Machine Sl. No:", "").trim();
          SetSerialNumber(sms);
        } else if (tmp.includes("Model:")) {
          tmp = tmp.replace("Model:", "").trim();
          SetModel(sms);
        }
      }
    } else if (sms.includes("Location")) {
      sms = sms.replace("Location:", "").trim();
      SetLocation(sms);
    } else if (sms.includes("Problem")) {
      sms = sms.replace("Problem:", "").trim();
      SetProblem(sms);
    } else if (sms.includes("Warranty Start")) {
      sms = sms.replace("Warranty Start:", "").trim();
      SetWarrantyStart(sms);
    } else if (sms.includes("Warranty End")) {
      sms = sms.replace("Warranty End:", "").trim();
      SetWarrantyEnd(sms);
    } else if (sms.includes("Outstanding")) {
      sms = sms.replace("Outstanding:", "").trim();
      var amount = 0.0;
      if (sms === "NIL") {
        amount = 0.0;
      } else {
        sms = sms.replace("- INR", "").trim();
        amount = parseFloat(sms);
      }
      SetOutstanding(sms);
    }
  }

  const handleChange = (e) => {
    console.log("Handle Change: " + e.target.name);
    switch (e.target.name) {
      case "newcompany":
        break;
      default:
      // Eslint fix
    }
  };

  function getAjaxServiceTeam() {
    var sharedPrefStatus = window.Android.getPunchStatus();
    var UID = window.Android.getUniqueID();
    axios
      .post(APIS.getAttendance, {
        UID: UID,
      })
      .then((response) => {
        if (response && (response.status === 200 || response.status === 201)) {
          console.log(response.data);
          // var rows = [];
          // for (var i = 0; i < response.data.attendance_filter.length; i++) {
          //     console.log(response.data.attendance_filter[i].DTIME)
          //     var j = i + 1;
          //     var temp = createData(j, response.data.attendance_filter[i].DTIME, response.data.attendance_filter[i].Activity)
          //     rows.push(temp)
          // }
          // setRowData(rows);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          IC Tickets
        </Typography>
        <form className={classes.form} fullWidth>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="smsmessage"
            label="Paste SMS Message here..."
            name="smsmessage"
            type="text"
            multiline
            minRows={4}
            maxRows={6}
            autoComplete="smsmessage"
            onChange={handleChange}
          />
          {/* Existing Company */}
          {/* <Box hidden={existingcompany}>
                        <Select displayEmpty fullWidth required={!existingcompany} defaultValue={customer_existing_list} onChange={selectionCustomer}>
                            {customer_existing_list?.map(option => {
                                return (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label ?? option.value}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        <FormHelperText>Select Customer</FormHelperText>
                    </Box> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Submit
          </Button>
          <Box mt={8}>
            {flag.type && <h3 className={classes[flag.type]}>{flag.msg}</h3>}
          </Box>
        </form>
      </div>
    </Container>
  );
}
