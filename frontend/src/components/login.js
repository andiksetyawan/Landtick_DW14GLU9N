import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import LoginModal from "./loginModal";

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
    this.state = { isopen: false };
  }

  handleClose = () => {
    this.setState({ isopen: false });
  };

  render() {
    const { classes } = this.props;
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
        <LoginModal open={this.state.isopen} onClose={this.handleClose} />
      </div>
    );
  }
}

export default withStyles(styles)(Login);
