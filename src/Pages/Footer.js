import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { useLocation } from "react-router-dom";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
            Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
        </Typography>
    );
}

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const location = useLocation();
    const classes = useStyles();

    const [formData, setFormData] = useState({
        firstName: "",
        location: "",
        email: "",
    });
    const [postResponse, setPostResponse] = useState();
    const [message, setMessage] = useState(null);
    const [nameValidate, setNameValidate] = useState(null);
    const [locationValidate, setLocationValidate] = useState(null);
    const [emailValidate, setEmailValidate] = useState(null);
    const [nameStatus, setNameStatus] = useState(false);
    const [locationStaus, setLocationStaus] = useState(false);
    const [emailStatus, setEmailStatus] = useState(false);

    useEffect(() => {
        if (location.state) {
        setFormData({
            firstName: location.state.tourist_name,
            location: location.state.tourist_location,
            email: location.state.tourist_email,
        });
        }
    }, []);

    const postFormData = (event) => {
        event.preventDefault();

        if(nameStatus && locationStaus && emailStatus) {
            
            if (location.state) {
                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: location.state.id,
                        tourist_name: formData.firstName,
                        tourist_email: formData.email,
                        tourist_location: formData.location,
                    }),
                };
                fetch(
                    `http://restapi.adequateshop.com/api/Tourist/${location.state.id}`,
                    requestOptions
                )
                .then((response) => response.json())
                .then((data) => {
                    setPostResponse(data);
                });
                setMessage("tourist is successfully Update");
                setFormData({ firstName: "", location: "", email: "" });
            } else {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tourist_name: formData.firstName,
                        tourist_email: formData.email,
                        tourist_location: formData.location,
                    }),
                };
                fetch("http://restapi.adequateshop.com/api/Tourist", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setPostResponse(data);
                    setMessage("tourist is successfully registered...");
                    setFormData({ firstName: "", location: "", email: "" });
                });
            }
        }else {
            var alreadyValidate = (emailValidate) ? emailValidate : 'This Filed Is required';
            (!nameStatus)? setNameValidate('This Filed Is required'): setNameValidate('');
            (!locationStaus)? setLocationValidate('This Filed Is required'):setLocationValidate('');
            (!emailStatus)? setEmailValidate(alreadyValidate): setEmailValidate('');
        return false;
        }
    };

  const handleChange = (e) => {
    var flag = false;
    if(e.target.name == "firstName") {
		if (e.target.value == "") {
			
            flag = true;
            setNameValidate("This field is required");
            setNameStatus(false);
		}else {
            flag = false;
            setNameValidate("");
            setNameStatus(true);
        }
    }else if (e.target.name == "location") {
        if (e.target.value == "") {
            flag = true;
            setLocationValidate("This field is required");
            setLocationStaus(false);
        } else {
            flag = false;
            setLocationValidate("");
            setLocationStaus(true);
        }
    }else if (e.target.name == "email") {
        if (e.target.value == "") {
            flag = true;
            setEmailValidate("This field is required");
            setEmailStatus(false);
        }else {
            var touriesEmail = e.target.value.trim().toLowerCase();
            var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!filter.test(touriesEmail)) {
                flag = true;
                setEmailValidate("Please Enter valid email");
                setEmailStatus(false);
            } else {
                flag = false;
                setEmailValidate("");
                setEmailStatus(true);
            }
        }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeMsg = () => {
    setMessage(null);
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "30px" }}>
        <CssBaseline />
        {message ? (
            <MuiAlert elevation={6} variant="filled" severity="success">
                {message}{" "}
                <CloseIcon
                onClick={closeMsg}
                style={{ marginLeft: "80px", cursor: "pointer" }}
            />
            </MuiAlert>
        ) : null}

      <div className={classes.paper} style={{ marginTop: "10px" }}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {location.state ? "Update Tourist Details" : "Tourist Registration"}
        </Typography>

        <form className={classes.form} noValidate onSubmit={postFormData}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Full Name"
                autoFocus
                onChange={handleChange}
                value={formData.firstName}
              />
              <span id="firstName" className="validate">
                {nameValidate}
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="location"
                label="Location"
                name="location"
                autoComplete="location"
                onChange={handleChange}
                value={formData.location}
              />
              <span id="location" className="validate">
                {locationValidate}
              </span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={formData.email}
              />
              <span id="email" className="validate">
                {emailValidate}
              </span>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {location.state ? "Update" : "Add Tourist"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/">Back To List</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
