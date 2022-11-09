/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
import { isMobile } from "../../utils";
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
  searchBar: {
    height: "30px",
    width: "200px",
    [theme.breakpoints.up("sm")]: {
      height: "40px",
    },
  },
}));

export default function UploadTaDa({ onClose, subjectId }) {
  const classes = useStyles();
  const [flag, setFlag] = useState({ type: "", msg: "" });

  // New Company Details - Hide/Show
  const [newcompany, setNewCompany] = useState(true);
  const [contactperson, setContactPerson] = useState(true);
  const [contactnumber, setContactNumber] = useState(true);

  // Existing Company - Hide/Show
  const [existingcompany, setExistingCompany] = useState(true);

  // General - Hide/Show
  const [meetingstatus, setMeetingStatus] = useState(true);
  const [remarks, setRemarks] = useState(true);
  const [submit, SetSubmit] = useState(true);

  // New Company Details - Values
  const [newcompanyval, setNewCompanyVal] = useState("");
  const [contactpersonval, setContactPersonVal] = useState("");
  const [contactnumberval, setContactNumberVal] = useState("");

  // Existing Company - Values

  // General - Values
  const [meetingstatusval, setMeetingStatusVal] = useState("");
  const [remarksval, setRemarksVal] = useState("");

  // const navigate = useNavigate();

  const [existingcustomerval, setExistingCustomerVal] = useState("");
  const selectionCustomer = (event) => {
    console.log(event.target.value);
    setExistingCustomerVal(event.target.value);
  };

  const handleChange = (e) => {
    console.log("Handle Change: " + e.target.name);
    switch (e.target.name) {
      case "newcompany":
        setNewCompanyVal(e.target.value);
        break;
      case "contactperson":
        setContactPersonVal(e.target.value);
        break;
      case "contactnumber":
        setContactNumberVal(e.target.value);
        break;
      case "remarks":
        setRemarksVal(e.target.value);
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

  function unixTimeStamp() {
    const d = new Date();
    return Math.floor(d.getTime() / 1000);
  }

  const handleClick = (e) => {
    if (customerType === "New") {
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
        var activity = "CustomerVisit";

        axios
          .post(APIS.newCustomer, {
            UID: uid,
            DTIME: dTime,
            UTIME: uTime,
            LAT: lat,
            LOT: lot,
            ADDR: addr,
            BAT: bat,
            USERNAME: username,
            COMPANY: newcompanyval,
            CONTACTPERSON: contactpersonval,
            CONTACTNUMBER: contactnumberval,
            STATUS: purpose,
            REMARKS: remarksval,
            Activity: activity,
          })
          .then((response) => {
            if (
              response &&
              (response.status === 200 || response.status === 201)
            ) {
              setFlag({ type: "success", msg: "Completed Successfully .." });
              setTimeout(() => {
                setNewCompanyVal("");
                setContactPersonVal("");
                setContactNumberVal("");
                setMeetingStatusVal("");
                setRemarksVal("");
                setCustomerType("");
                setMeetingStatus("");
                setPurpose("");
                setNewCompany(true);
                setContactPerson(true);
                setContactNumber(true);
                setExistingCompany(true);
                setMeetingStatus(true);
                setRemarks(true);
                SetSubmit(true);
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
    } else if (customerType === "Existing") {
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
        var activity = "CustomerVisitUpdate";

        axios
          .post(APIS.updateCustomer, {
            ID: existingcustomerval,
            UID: uid,
            DTIME: dTime,
            UTIME: uTime,
            LAT: lat,
            LOT: lot,
            ADDR: addr,
            BAT: bat,
            USERNAME: username,
            STATUS: purpose,
            REMARKS: remarksval,
            Activity: activity,
          })
          .then((response) => {
            if (
              response &&
              (response.status === 200 || response.status === 201)
            ) {
              setFlag({ type: "success", msg: "Completed Successfully .." });
              setTimeout(() => {
                SetCustomer_Existing_List([]);
                setNewCompanyVal("");
                setContactPersonVal("");
                setContactNumberVal("");
                setMeetingStatusVal("");
                setRemarksVal("");
                setCustomerType("");
                setMeetingStatus("");
                setPurpose("");
                setNewCompany(true);
                setContactPerson(true);
                setContactNumber(true);
                setExistingCompany(true);
                setMeetingStatus(true);
                setRemarks(true);
                SetSubmit(true);
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
    }
  };

  const [customer_existing_list, SetCustomer_Existing_List] = useState([]);
  const [customerType, setCustomerType] = useState("");
  const selectionCustomerType = (event) => {
    if (isMobile()) {
      setCustomerType(event.target.value);
      if (event.target.value === "New") {
        setNewCompany(false);
        setContactPerson(false);
        setContactNumber(false);
        setExistingCompany(true);
        setMeetingStatus(false);
        setRemarks(false);
        SetSubmit(false);
      } else if (event.target.value === "Existing") {
        setNewCompany(true);
        setContactPerson(true);
        setContactNumber(true);
        setExistingCompany(true);
        setMeetingStatus(true);
        setRemarks(true);
        SetSubmit(true);
        setFlag({ type: "success", msg: "Please Wait .." });
        var uid = window.Android.getUniqueID();

        axios
          .post(APIS.findByUID, {
            UID: uid,
          })
          .then((response) => {
            window.alert(JSON.stringify(response));
            if (
              response &&
              (response.status === 200 || response.status === 201)
            ) {
              if (response.data.customer_list.length === 0) {
                setFlag({ type: "error", msg: "No Records Found" });
                setTimeout(() => {
                  setFlag({ type: "", msg: "" });
                }, 3000);
              } else {
                // window.Android.showToast("No Records Found123");
                var temp_customer_list = [];
                for (var j = 0; j < response.data.customer_list.length; j++) {
                  var temp = {
                    label: response.data.customer_list[j].COMPANY,
                    value: response.data.customer_list[j].ID,
                  };
                  console.log(JSON.stringify(temp));
                  temp_customer_list.push(temp);
                }
                SetCustomer_Existing_List(temp_customer_list);
                console.log(JSON.stringify(customer_existing_list));
                setFlag({ type: "", msg: "" });
                setNewCompany(true);
                setContactPerson(true);
                setContactNumber(true);
                setExistingCompany(false);
                setMeetingStatus(false);
                setRemarks(false);
                SetSubmit(false);
              }
            }
          })
          .catch(function (error) {
            setFlag({ type: "error", msg: error });
            setTimeout(() => {
              setFlag({ type: "", msg: "" });
            }, 1000);
          });
        // Pending Load all Existing Customers
        // Pending Select Previous Status
      } else {
        setNewCompany(true);
        setContactPerson(true);
        setContactNumber(true);
        setExistingCompany(true);
        setMeetingStatus(true);
        setRemarks(true);
        SetSubmit(true);
      }
    } else {
      setFlag({ type: "error", msg: "Only Mobile Devices are Supported" });
      setTimeout(() => {
        setFlag({ type: "", msg: "" });
      }, 2000);
    }
  };

  const [purpose, setPurpose] = useState("");

  const selectionPurpose = (event) => {
    console.log(event.target.value);
    setPurpose(event.target.value);
    console.log(purpose);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Customer Visit
        </Typography>
        <form className={classes.form} fullWidth>
          <Select
            displayEmpty
            fullWidth
            value={customerType}
            onChange={selectionCustomerType}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"New"}>New</MenuItem>
            <MenuItem value={"Existing"}>Existing</MenuItem>
          </Select>
          <FormHelperText>Customer Type</FormHelperText>
          {/* New Company Details */}
          <Box hidden={newcompany}>
            <TextField
              variant="outlined"
              margin="normal"
              required={!newcompany}
              value={newcompanyval}
              fullWidth
              id="newcompany"
              label="Company Name"
              name="newcompany"
              autoComplete="newcompany"
              onChange={handleChange}
            />
          </Box>
          <Box hidden={contactperson}>
            <TextField
              variant="outlined"
              margin="normal"
              required={!contactperson}
              value={contactpersonval}
              fullWidth
              id="contactperson"
              label="Contact Person"
              name="contactperson"
              autoComplete="contactperson"
              onChange={handleChange}
            />
          </Box>
          <Box hidden={contactnumber}>
            <TextField
              variant="outlined"
              margin="normal"
              required={!contactnumber}
              value={contactnumberval}
              fullWidth
              id="contactnumber"
              label="Contact Number"
              name="contactnumber"
              type="number"
              autoComplete="contactnumber"
              onChange={handleChange}
            />
          </Box>
          {/* Existing Company */}
          <Box hidden={existingcompany}>
            <Select
              displayEmpty
              fullWidth
              required={!existingcompany}
              defaultValue={customer_existing_list}
              onChange={selectionCustomer}
            >
              {customer_existing_list?.map((option) => {
                return (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label ?? option.value}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Select Customer</FormHelperText>
          </Box>
          {/* General  */}
          <Box hidden={meetingstatus}>
            <Select
              displayEmpty
              fullWidth
              required
              value={purpose}
              onChange={selectionPurpose}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Initial Meeting"}>Initial Meeting</MenuItem>
              <MenuItem value={"Quotation"}>Quotation</MenuItem>
              <MenuItem value={"Site / Factory Visit"}>
                Site / Factory Visit
              </MenuItem>
              <MenuItem value={"Finalization of quotation"}>
                Finalization of quotation
              </MenuItem>
              <MenuItem value={"Documents handed over to Financier"}>
                Documents handed over to Financier
              </MenuItem>
              <MenuItem value={"Purchase Order"}>Purchase Order</MenuItem>
              <MenuItem value={"Advance"}>Advance</MenuItem>
              <MenuItem value={"DO"}>DO</MenuItem>
              <MenuItem value={"MM complete"}>MM complete</MenuItem>
              <MenuItem value={"Invoice"}>Invoice</MenuItem>
              <MenuItem value={"Credit Days"}>Credit Days</MenuItem>
              <MenuItem value={"Fin Pay due"}>Fin Pay due (Close)</MenuItem>
              <MenuItem value={"Lost to competition"}>
                Lost to competition (Close)
              </MenuItem>
              <MenuItem value={"Delayed purchased"}>
                Delayed purchased (Close)
              </MenuItem>
              <MenuItem value={"Abandoned"}>Abandoned (Close)</MenuItem>
            </Select>
            <FormHelperText>Purpose of Visit</FormHelperText>
          </Box>
          <Box hidden={remarks}>
            <TextField
              variant="outlined"
              multiline
              minRows={4}
              maxRows={8}
              margin="normal"
              fullWidth
              id="remarks"
              label="Remarks"
              name="remarks"
              type="text"
              value={remarksval}
              onChange={handleChange}
            />
          </Box>
          <Box hidden={submit}>
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
          </Box>
          <Box mt={8}>
            {flag.type && <h3 className={classes[flag.type]}>{flag.msg}</h3>}
          </Box>
        </form>
      </div>
    </Container>
  );
}
