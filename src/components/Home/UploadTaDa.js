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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIS } from "../../config";

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
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState(false);
  const [rowData, setRowData] = useState([]);
  // const navigate = useNavigate();

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

  const handleClick = (e) => {
    if (filename && file && tags) {
      e.preventDefault();

      let tagsArr = tags.split(",").map((tag) => {
        return tag.trim();
      });
      const tagsList = [];

      // if (tagsArr.length > 0 && !tagsArr[tagsArr.length - 1]) {
      //   // tagsArr.pop();
      //   tagsList.push(tagsArr)
      // }
      // for(let i =0; tagsArr.length; i++ ) {
      //   tagsList.push(tagsArr)
      // }

      tagsArr.forEach(myFunction);
      function myFunction(value) {
        tagsList.push(value);
      }

      var myJSON = JSON.stringify(tagsList);
      const userToken =
        sessionStorage.getItem("userToken") ||
        localStorage.getItem("userToken");
      const data = new FormData();
      data.append("name", filename);
      data.append("file", file);
      data.append("tags", myJSON);
      data.append("subject_hive_id", subjectId);
      data.append("pluser", userToken);

      axios
        .post(APIS.uploadNewTopic, data)
        .then((response) => {
          if (
            response &&
            (response.status === 200 || response.status === 201)
          ) {
            setFlag({ type: "success", msg: "Uploaded in successfully!" });

            setTimeout(() => {
              onClose();
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
    }
  };

  function uploadExcel() {
    window.Android.uploadFile();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Upload TA-DA
        </Typography>
        <div style={{ marginTop: 10, marginLeft: 200 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => uploadExcel()}
          >
            Upload New
          </Button>
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
    </Container>
  );
}
