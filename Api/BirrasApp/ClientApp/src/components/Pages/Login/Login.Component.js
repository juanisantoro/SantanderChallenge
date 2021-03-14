import { Button, CircularProgress } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../../../App";
import logo from "../../../logosSantander/elefanteSantander.gif";
import wheatherService from "../../../services/weatherService";
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='https://material-ui.com/'>
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const goToLogin = async () => {
    setLoading(true);
    var data = await wheatherService.Login(user, pass);
    setLoading(false);
    if (data.isAuthenticated) {
      sessionStorage.setItem("user", JSON.stringify(data));

      ReactDom.render(
        <BrowserRouter basename={baseUrl}>
          <App />
        </BrowserRouter>,
        document.getElementById("root")
      );
    }
  };
  const setearUser = (value) => {
    setUser(value.target.valueOf().value.toString());
  };

  const setearPass = (value) => {
    setPass(value.target.valueOf().value.toString());
  };

  return (
    <Card variant='outlined'>
      <CardContent>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div id='login'></div>
          <div className={classes.paper}>
            <img src={logo} alt='loading...' />

            {/* <Typography component='h1' variant='h5'>
          Ingresar
        </Typography> */}
            <form className={classes.form} noValidate>
              <TextField
                placeholder='user o admin'
                onChange={setearUser}
                variant='outlined'
                margin='normal'
                required
                error={user === "" ? true : false}
                fullWidth
                id='email'
                label='Usuario'
                name='email'
                autoComplete='email'
                autoFocus
                value={user}
              />
              <TextField
                placeholder='123456'
                onChange={setearPass}
                variant='outlined'
                margin='normal'
                error={pass === "" ? true : false}
                required
                fullWidth
                name='password'
                label='Contraseña'
                type='password'
                id='password'
                value={pass}
                autoComplete='current-password'
              />

              <Button
                disabled={pass === "" || user === "" ? true : false}
                onClick={goToLogin}
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                Ingresar
                {loading && <CircularProgress color='secondary' size={30} />}
              </Button>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </CardContent>
    </Card>
  );
}
