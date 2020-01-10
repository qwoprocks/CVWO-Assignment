import React from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDialog } from "muibox";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignupForm = () => {
  const classes = useStyles();
  const dialog = useDialog();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      e.currentTarget.password.value !== e.currentTarget.password_repeat.value
    ) {
      dialog.alert("Passwords do not match");
      return;
    }
    if (e.currentTarget.password.value.length < 8) {
      dialog.alert("Password must be at least 8 characters long");
      return;
    }
    axios
      .post("/api/v1/users", {
        user: {
          email: e.currentTarget.email.value,
          username: e.currentTarget.username.value,
          password: e.currentTarget.password.value
        },
        withCredentials: true
      })
      .then(response => {
        if (response.data.error) {
          dialog.alert("Error: " + String(response.data.error));
        } else {
          window.location.reload();
        }
      })
      .catch(
        error => "Error, unable to create account.\n" + dialog.alert(error)
      );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
        <form className={classes.form} onSubmit={handleSignup} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_repeat"
            label="Retype Password"
            type="password"
            id="password_repeat"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            {/*<Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>*/}
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Login."}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignupForm;
