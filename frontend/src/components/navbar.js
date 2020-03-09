import React from "react";

import { withStyles, AppBar, Container, Toolbar, Typography } from "@material-ui/core";

import Login from "../components/login";
import Register from "../components/register";
import UserDropdown from "../components/userDropdown";

import { connect } from "react-redux";

const styles = theme => ({
  appbar: {
    backgroundColor: "#fff",
    color: theme.palette.primary.main
  },
  logo: {
    flexGrow: 1,
    fontFamily: "Mandali",
    color: theme.palette.primary.main,
    fontSize: 35,
    fontWeight: "bold"
  }
});

class NavBar extends React.Component {
  render() {
    const { classes } = this.props;
    const { authenticated } = this.props.auth;

    return (
      <AppBar position="fixed" color="default" className={classes.appbar}>
        <Container>
          <Toolbar style={{ padding: 0 }}>
            <div className={classes.logo} style={{}}>
              land
              {/* <Typography component="span" variant="inherit" color="textSecondary">tick</Typography> */}
              <span style={{ color: "#143350" }}>tick</span>
            </div>
            {authenticated ? (
              <>
                <UserDropdown />
              </>
            ) : (
              <>
                <Login />
                <Register />
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(NavBar));
