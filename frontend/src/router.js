import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { connect } from "react-redux";

import Home from "./pages/home";
import MyTicket from "./pages/myticket";
import Payment from "./pages/payment";
import Booking from "./pages/booking";
import Print from "./pages/print"; //print ticket

import Admin from "./pages/admin/index";
import AddTicket from "./pages/admin/addTicket";

// import Profile from "./profile";
import { auth } from "./_reducers/auth";
import { getAuth, autoAuth } from "./_actions/auth";

class Routers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirst: true
    };
  }
  componentDidMount() {
    // this.props.autoAuth();
  }
  render() {
    console.log("aut", this.props.auth);
    const { authenticated, loading, error } = this.props.auth;
    //const authenticated = true;
    console.log("loading,", loading);
    console.log("authenticated,", authenticated);

    let routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/myticket" component={MyTicket} />
        {/* <Route path="/payment" component={Payment} />  */}
        <Route path="/admin" component={Admin} />
        <Route path="/addticket" component={AddTicket} />
        <Route path="/booking" component={Booking} />
        <Route path="/payment/:id" component={Payment} /> 
        <Route path="/print/:id" component={Print} />
        <Redirect to="/" />
      </Switch>
    );

    if (authenticated) {
      routes = (
        <Switch>
          {/* <Route path="/profile" component={Profile} /> */}
          <Route path="/admin" component={Admin} />
          <Route path="/addticket" component={AddTicket} />
          <Route path="/booking" component={Booking} />
          <Route path="/payment/:id" component={Payment} />
          <Route path="/myticket" component={MyTicket} />
          {/* <Route path="/payment" component={Payment} /> */}
          <Route path="/" component={Home} />

          <Redirect to="/" />
        </Switch>
      );
    }
    return <Router>{routes}</Router>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // autoAuth: () => dispatch(getAuth())
    //autoAuth: () => dispatch(autoAuth())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routers);
