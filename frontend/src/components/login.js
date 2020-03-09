import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  TextField
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import CloseIcon from "@material-ui/icons/Close";

import { connect } from "react-redux";
import { login } from "../_actions/auth";
import { getUser } from "../_actions/user";

const styles = theme => ({
  root: {
    textAlign: "center"
  },
  closeButton: {
    position: "absolute",
    top: 2,
    right: 2,
    color: theme.palette.primary.main
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isopen: false, email: "", password: "" };
  }

  componentDidMount() {
    console.log("component did mount");
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = async () => {
    console.log("login");
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(data);
    const res = await this.props.login(data);
    console.log("resxxxxxx", res);
    console.log("resxxxxxx fullfil1", res.action.type);

    if (res.action.type === "LOGIN_FULFILLED") {
      console.log("resxxxxxx fullfil", res.action.type);

      this.props.getUser();
    }
  };

  handleClose = () => {
    this.setState({ isopen: false });
  };

  render() {
    const { classes } = this.props;
    // let history = useHistory();
    //console.log("dsfs", this.props.auth);
    const { error, loading } = this.props.auth;
    return (
      <div className={classes.root}>
        <Button
          className={classes.menuButton}
          variant="outlined"
          color="primary"
          onClick={() => this.setState({ isopen: true })}
          // style={{ borderRadius: 20 }}
        >
          Login
        </Button>
        <Dialog
          open={this.state.isopen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
        >
          <DialogTitle style={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              component="div"
              style={{ textAlign: "center" }}
            >
              Login
            </Typography>
            <IconButton
              size="small"
              aria-label="close"
              className={classes.closeButton}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <form noValidate autoComplete="off">
              <TextField
                id="email"
                type="email"
                margin="dense"
                label="Email"
                variant="filled"
                name="email"
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
                id="password"
                type="password"
                margin="dense"
                label="Password"
                variant="filled"
                name="password"
                fullWidth
                onChange={this.handleChange}
              />

              <Button
                style={{ borderRadius: 20, margin: "20px 0" }}
                // type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                onClick={!loading ? this.handleLogin : null}
              >
                {loading ? "Login..." : "Login"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data)),
    getUser: () => dispatch(getUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
