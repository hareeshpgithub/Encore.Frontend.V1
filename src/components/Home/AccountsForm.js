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
import { APIS } from "../../config";
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
}));

function createData(number, date, transaction, amount, by) {
    return { number, date, transaction, amount, by };
}

export default function Accounts({ onClose, subjectId }) {
    const classes = useStyles();
    const [flag, setFlag] = useState({ type: "", msg: "" });
    const [filename, setFilename] = useState("");
    const [file, setFile] = useState(null);
    const [tags, setTags] = useState(false);
    const [checked, setChecked] = useState(false);
    const [checkedMsg, setCheckedMsg] = useState("Punched Out");
    const [loader, setLoader] = useState(true);
    const [rowData, setRowData] = useState([]);
    // const navigate = useNavigate();

    const switchHandler = (event) => {
        setChecked(event.target.checked);
        var URI = ""
        var ACT = ""
        if (event.target.checked === true) {
            setCheckedMsg("Punched In")
            URI = APIS.setPunchIn
            ACT = "PunchIn"

        } else {
            setCheckedMsg("Punched Out")
            URI = APIS.setPunchOut
            ACT = "PunchOut"

        }
        // Check Pending - if already don't call
        if (isMobile()) {
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
                            // Update Shared Pref
                            if (ACT === "PunchOut") {
                                window.Android.punchOut();
                            } else {
                                window.Android.punchIn();
                            }
                        }
                    })
                    .catch((error) => console.log(error));
            }, 3000)


        } else {
            console.log("Only Mobile Support")
        }
    };

    function unixTimeStamp() {
        const d = new Date();
        return Math.floor(d.getTime() / 1000)
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
            var UID = window.Android.getUniqueID();
            axios.post(APIS.getAccounts, {
                "UID": UID
            })
                .then((response) => {
                    if (response &&
                        (response.status === 200 || response.status === 201)) {
                        console.log(JSON.stringify(response.data));
                        console.log(JSON.stringify(response.data.account_list));
                        console.log(JSON.stringify(response.data.account_list.length));
                        var rows = [];
                        for (var i = 0; i < response.data.account_list.length; i++) {
                            var j = i + 1;
                            var temp = createData(
                                j,
                                response.data.account_list[i].DTIME,
                                response.data.account_list[i].TRANS,
                                response.data.account_list[i].AMT,
                                response.data.account_list[i].BY,
                            )
                            rows.push(temp)
                        }
                        setRowData(rows);
                    }
                })
                .catch((error) => console.log(error));
        } else {
            console.log("Only Mobile Support")
        }

    }, []);


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Accounts
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowData.map((row) => (
                                <TableRow key={row.number}>
                                    <TableCell component="th" scope="row">
                                        {row.number}
                                    </TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">{row.transaction}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container >
    );
}
