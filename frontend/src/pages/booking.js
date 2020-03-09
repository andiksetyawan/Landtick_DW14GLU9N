import React from "react";
import moment from "moment";

import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { toRupiah } from "indo-formatter";

import {
  withStyles,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Button
} from "@material-ui/core";

import NavBar from "../components/navbar";

import PersonIcon from "@material-ui/icons/Person";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import ChildCareRoundedIcon from "@material-ui/icons/ChildCareRounded";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";

import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import LensIcon from "@material-ui/icons/Lens";

import { addOrder } from "../_actions/order";

const startStepIcons = () => <RadioButtonUncheckedIcon color="primary" />;

const endStepIcons = () => <LensIcon color="primary" />;

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passengers: {}
    };
  }

  generetePassengers = () => {
    let pass = [];
    for (let i = 1; i <= this.props.carts.adult; i++) {
      pass.push({
        name: eval("this.state.passengers.adult_name_" + i),
        id_number: eval("this.state.passengers.adult_id_" + i),
        email: eval("this.state.passengers.adult_email_" + i),
        type: "adult"
      });
    }
    if (this.props.carts.infant) {
      for (let i = 1; i <= this.props.carts.infant; i++) {
        pass.push({
          name: eval("this.state.passengers.infant_name_" + i),
          id_number: eval("this.state.passengers.infant_id_" + i),
          email: eval("this.state.passengers.infant_email_" + i),
          type: "infant"
        });
      }
    }

    return pass;
  };

  handleOrder = async () => {
    const passengers = this.generetePassengers();
    console.log("passenger array object", passengers);

    const data = {
      passengers,
      departure: this.props.carts.departure.ticket.id,
      return: this.props.carts.return.ticket
        ? this.props.carts.return.ticket.id
        : null,
      qty: this.props.carts.departure.qty
    };

    console.log("post data create order", data);
    const res = await this.props.addOrder(data);
    console.log("res order component", res);
    if (res.action.type === "ADD_ORDER_FULFILLED") {
      this.props.history.push("/payment/" + res.action.payload.order.id);
    }
  };

  componentDidMount() {
    this.generetePassengers();
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      passengers: {
        ...this.state.passengers,
        [e.target.name]: e.target.value
      }
    });
  };

  renderAdult = () => {
    let adult_component = [];
    for (var i = 1; i <= this.props.carts.adult; i++) {
      adult_component.push(
        <Paper key={i} className={this.props.classes.paper}>
          <Typography className={this.props.classes.subtitle}>
            Penumpang dewasa {i}
          </Typography>
          <TextField
            name={`adult_name_${i}`}
            // name="adult_name[]"
            label="Nama Lengkap"
            fullWidth
            margin="dense"
            onChange={this.handleChange}
          />
          <TextField
            name={`adult_id_${i}`}
            // name="adult_id[]"
            label="Nomor Identitas"
            fullWidth
            margin="dense"
            onChange={this.handleChange}
          />
          <TextField
            name={`adult_email_${i}`}
            // name="adult_email[]"
            label="Email"
            fullWidth
            margin="dense"
            type="email"
            onChange={this.handleChange}
          />
        </Paper>
      );
    }
    return adult_component;
  };

  renderInfant = () => {
    let infant_component = [];
    for (var i = 1; i <= this.props.carts.infant; i++) {
      infant_component.push(
        <Paper key={i} className={this.props.classes.paper}>
          <Typography className={this.props.classes.subtitle}>
            Penumpang bayi {i}
          </Typography>
          <TextField
            name={`infant_name_${i}`}
            label="Nama Lengkap"
            fullWidth
            margin="dense"
            onChange={this.handleChange}
          />
          <TextField
            name={`infant_id_${i}`}
            label="Nomor Identitas"
            fullWidth
            margin="dense"
            onChange={this.handleChange}
          />
          <TextField
            name={`infant_email_${i}`}
            label="Email"
            fullWidth
            margin="dense"
            type="email"
            onChange={this.handleChange}
          />
        </Paper>
      );
    }
    return infant_component;
  };

  render() {
    const { classes, carts } = this.props;
    console.log(this.state);

    if (!carts.departure.ticket.id)
      return (
        <>
          <NavBar />
          <Container className={classes.root}>
            Maaf, Kamu harus memilih jadwal tiket dahulu,{" "}
            <Link to="/">kembali ke Home</Link>.
          </Container>
        </>
      );

    return (
      <>
        <NavBar />
        <Container className={classes.root}>
          <Typography variant="h6">
            <b>Isi Data Penumpang</b>
          </Typography>
          <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
              <section>{this.renderAdult()}</section>
              {carts.infant > 0 && <section>{this.renderInfant()}</section>}
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={this.handleOrder}
              >
                Lanjutkan Pesan Tiket
              </Button>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Paper className={classes.side}>
                <div>
                  <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                      <b>Rincian Perjalanan</b>
                    </Typography>
                  </div>
                </div>

                {carts.departure.ticket && (
                  <>
                    <div style={{ backgroundColor: "white" }}>
                      <div>
                        {carts.return.ticket && (
                          <Typography variant="subtitle2" color="primary">
                            Tiket Pergi
                          </Typography>
                        )}
                        <Typography variant="h6">
                          <b>{carts.departure.ticket.train.name}</b>
                        </Typography>
                        <Typography variant="subtitle1">
                          {carts.departure.ticket.class.name}
                        </Typography>
                        {/* <Typography variant="caption">Pending</Typography> */}
                      </div>
                    </div>
                    <div style={{ backgroundColor: "white" }}>
                      <div>
                        <Stepper orientation="vertical" style={{ padding: 0 }}>
                          <Step key="1">
                            <StepLabel
                              StepIconComponent={startStepIcons}
                            ></StepLabel>
                          </Step>
                          <Step key="2">
                            <StepLabel
                              StepIconComponent={endStepIcons}
                            ></StepLabel>
                          </Step>
                        </Stepper>
                      </div>
                      <div className={classes.stepper}>
                        <div>
                          <Typography variant="subtitle1">
                            <b>
                              {moment(carts.departure.ticket.startTime)
                                .local()
                                .format("HH:mm:ss")}
                            </b>
                          </Typography>
                          <Typography variant="caption">
                            {moment(carts.departure.ticket.startTime)
                              .local()
                              .format("YYYY-MM-DD")}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle1">
                            <b>
                              {moment(carts.departure.ticket.arrivalTime)
                                .local()
                                .format("HH:mm:ss")}
                            </b>
                          </Typography>
                          <Typography variant="caption">
                            {moment(carts.departure.ticket.arrivalTime)
                              .local()
                              .format("YYYY-MM-DD")}
                          </Typography>
                        </div>
                      </div>
                      <div>
                        <div>
                          <Typography variant="subtitle1">
                            <b>{`${carts.departure.ticket.startStation.city} (${carts.departure.ticket.startStation.code})`}</b>
                          </Typography>
                          <Typography variant="caption">
                            Stasiun {carts.departure.ticket.startStation.name}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle1">
                            <b>{`${carts.departure.ticket.destinationStation.city} (${carts.departure.ticket.destinationStation.code})`}</b>
                          </Typography>
                          <Typography variant="caption">
                            Stasiun{" "}
                            {carts.departure.ticket.destinationStation.name}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {carts.return.ticket && (
                  <>
                    <div style={{ backgroundColor: "white" }}>
                      <div>
                        <Typography variant="subtitle2" color="primary">
                          Tiket Pulang
                        </Typography>
                        <Typography variant="h6">
                          <b>{carts.return.ticket.train.name}</b>
                        </Typography>
                        <Typography variant="subtitle1">
                          {carts.return.ticket.class.name}
                        </Typography>
                        {/* <Typography variant="caption">Pending</Typography> */}
                      </div>
                    </div>
                    <div style={{ backgroundColor: "white" }}>
                      <div>
                        <Stepper orientation="vertical" style={{ padding: 0 }}>
                          <Step key="1">
                            <StepLabel
                              StepIconComponent={startStepIcons}
                            ></StepLabel>
                          </Step>
                          <Step key="2">
                            <StepLabel
                              StepIconComponent={endStepIcons}
                            ></StepLabel>
                          </Step>
                        </Stepper>
                      </div>
                      <div className={classes.stepper}>
                        <div>
                          <Typography variant="subtitle1">
                            <b>
                              {moment(carts.return.ticket.startTime)
                                .local()
                                .format("HH:mm:ss")}
                            </b>
                          </Typography>
                          <Typography variant="caption">
                            {moment(carts.return.ticket.startTime)
                              .local()
                              .format("YYYY-MM-DD")}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle1">
                            <b>
                              {moment(carts.return.ticket.arrivalTime)
                                .local()
                                .format("HH:mm:ss")}
                            </b>
                          </Typography>
                          <Typography variant="caption">
                            {moment(carts.return.ticket.arrivalTime)
                              .local()
                              .format("YYYY-MM-DD")}
                          </Typography>
                        </div>
                      </div>
                      <div>
                        <div>
                          <Typography variant="subtitle1">
                            <b>{`${carts.return.ticket.startStation.city} (${carts.departure.ticket.startStation.code})`}</b>
                          </Typography>
                          <Typography variant="caption">
                            Stasiun {carts.return.ticket.startStation.name}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle1">
                            <b>{`${carts.return.ticket.destinationStation.city} (${carts.departure.ticket.destinationStation.code})`}</b>
                          </Typography>
                          <Typography variant="caption">
                            Stasiun{" "}
                            {carts.return.ticket.destinationStation.name}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {}

                {carts.departure.ticket && (
                  <>
                    <div>
                      <div style={{ flexGrow: 1 }}>
                        Harga Tiket Pergi x {carts.adult}
                      </div>
                      <div>{toRupiah(carts.departure.sub_total)}</div>
                    </div>
                  </>
                )}

                {carts.return.ticket && (
                  <>
                    <div>
                      <div style={{ flexGrow: 1 }}>
                        Harga Tiket Pulang x {carts.adult}
                      </div>
                      <div>{toRupiah(carts.return.sub_total)}</div>
                    </div>
                  </>
                )}

                <div>
                  <div style={{ flexGrow: 1 }}>
                    <b>Total</b>
                  </div>
                  <div>
                    <b>
                      {carts.return.sub_total
                        ? toRupiah(
                            carts.departure.sub_total + carts.return.sub_total
                          )
                        : toRupiah(carts.departure.sub_total)}
                      {/* {toRupiah(
                        carts.detail_order.map((item, i) => {
                          total = total + item.sub_total;
                          return total;
                        })
                      )} */}
                      {}
                    </b>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.carts
});

const mapDispatchToProps = dispatch => ({
  addOrder: data => dispatch(addOrder(data))
});

const styles = theme => ({
  root: {
    marginTop: 100
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    // textAlign: "center",
    // color: theme.palette.text.secondary,
    minHeight: 200
  },
  subtitle: {
    color: theme.palette.primary.main,
    fontWeight: "bold"
  },
  side: {
    backgroundColor: "#dadada",
    // padding: 10,
    "& > div": {
      padding: "7px 15px",
      display: "flex",
      "& > div": {
        // padding: "10px",
        display: "flex",
        flexDirection: "column"
      }
    }
  },
  stepper: {
    "& > div": {
      padding: "0 20px"
    }
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Booking)));
