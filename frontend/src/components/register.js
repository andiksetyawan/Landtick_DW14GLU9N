import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import CloseIcon from "@material-ui/icons/Close";

import { connect } from "react-redux";

import { register } from "../_actions/auth";
import { getUser } from "../_actions/user";

const styles = theme => ({
  root: {
    textAlign: "center"
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    color: theme.palette.primary.main
  }
  // formControl: {
  //   margin: theme.spacing(2),
  //   minWidth: 200,
  // },
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isopen: false,
      name: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      gender: ""
    };
  }

  componentDidMount() {}

  handleClose = () => {
    this.setState({ isopen: false });
  };

  handleRegister = async () => {
    // alert("reg");
    const data = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      phone: this.state.phone,
      address: this.state.address,
      gender: this.state.gender
    };

    const res = await this.props.register(data);
    if (res.action.type === "REGISTER_FULFILLED") {
      console.log("resxxxxxx fullfil", res.action.type);

      this.props.getUser();
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes, auth } = this.props;
    const { loading, error } = auth;
    //let history = useHistory();

    // console.log("species props erorrrrrr", error);
    // console.log("selected", this.state.selectedSpesies);

    return (
      <div className={classes.root}>
        <Button
          //  style={{ borderRadius: 20, paddingLeft: 50, paddingRight: 50 }}
          variant="contained"
          color="primary"
          onClick={() => this.setState({ isopen: true })}
        >
          Daftar
        </Button>

        <Dialog
          open={this.state.isopen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
        >
          <DialogTitle>
            <Typography
              variant="h4"
              component="div"
              style={{ textAlign: "center" }}
            >
              Register
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
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
            <form noValidate autoComplete="off">
              <TextField
                type="text"
                margin="dense"
                label="Name"
                variant="filled"
                name="name"
                fullWidth
                onChange={this.handleChange}
                size="medium"
              />
              <TextField
                type="text"
                margin="dense"
                label="Username"
                variant="filled"
                name="username"
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
                type="email"
                margin="dense"
                label="Email"
                variant="filled"
                name="email"
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
                type="password"
                margin="dense"
                label="Password"
                variant="filled"
                name="password"
                fullWidth
                onChange={this.handleChange}
              />

              <div style={{ margin: "8px 0" }}>
                <FormControl variant="filled" size="small" style={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-filled-label-gender">
                    Jenis Kelamin
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label-gender"
                    id="demo-simple-select-filled-gender"
                    value={this.state.gender}
                    onChange={e => this.setState({ gender: e.target.value })}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <TextField
                type="tel"
                margin="dense"
                label="Telp"
                variant="filled"
                name="phone"
                fullWidth
                onChange={this.handleChange}
              />

              <TextField
                type="text"
                margin="dense"
                label="Alamat"
                variant="filled"
                name="address"
                fullWidth
                multiline
                onChange={this.handleChange}
              />

              <Button
                style={{ borderRadius: 20, margin: "20px 0" }}
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                onClick={this.handleRegister}
              >
                Register
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

const mapDispatchToProps = dispacth => {
  return {
    register: data => dispacth(register(data)),
    getUser: () => dispacth(getUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Register));
