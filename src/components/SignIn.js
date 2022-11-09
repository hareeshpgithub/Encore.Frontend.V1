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

export default function SignIn() {
  const classes = useStyles();
  const [flag, setFlag] = useState({ type: "", msg: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "remember":
        setRemember(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleClick = (e) => {
    if (username && password) {
      e.preventDefault();

      axios
        .post(APIS.login, {
          username,
          password,
        })
        .then((response) => {
          if (
            response &&
            (response.status === 200 || response.status === 201)
          ) {
            sessionStorage.setItem("userToken", username);
            remember && localStorage.setItem("userToken", username);
            setFlag({ type: "success", msg: "Logged in successfully!" });

            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else {
            setFlag({ type: "error", msg: response.data.details });
          }
        })
        .catch((error) => {
          let msg =
            error.response?.data?.detail ||
            error.message ||
            "some error occurred";

          setFlag({ type: "error", msg });
          // sessionStorage.setItem("userToken", username);
          // remember && localStorage.setItem("userToken", username);
          // setFlag({ type: "success", msg: "Logged in successfully!" });

          // setTimeout(() => {
          //   navigate("/");
          // }, 1000);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
            name="remember"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Sign In
          </Button>
          <Box mt={8}>
            {flag.type && <h3 className={classes[flag.type]}>{flag.msg}</h3>}
          </Box>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
