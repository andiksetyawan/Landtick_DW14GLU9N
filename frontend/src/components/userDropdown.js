import React from "react";

import {
  withStyles,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";

import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

import { connect } from "react-redux";
import { logout } from "../_actions/auth";

import { withRouter } from "react-router-dom";

const styles = theme => ({
  avatar: {
    backgroundColor: "blue",
    cursor: "pointer"
  }
});

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  componentDidMount(){
    
  }

  handleClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { classes, user, history } = this.props;
    return (
      <>
        <Typography style={{ marginRight: 10 }} variant="h6">
          {user.data && user.data.name}
        </Typography>
        <Avatar className={classes.avatar} onClick={this.handleClick}>
          {user.data && user.data.name ? user.data.name.substring(0, 1) : "..."}
        </Avatar>

        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {user.data && user.data.level == "user" ? (
            <MenuItem onClick={() => history.push("/myticket")}>
              <ListItemIcon>
                <ConfirmationNumberOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Tiket Saya" />
            </MenuItem>
          ) : (
            <MenuItem onClick={() => history.push("/addticket")}>
              <ListItemIcon>
                <ConfirmationNumberOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Tambah Tiket" />
            </MenuItem>
          )}

          <Divider />
          <MenuItem onClick={() => this.props.logout()}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(UserDropdown)));
