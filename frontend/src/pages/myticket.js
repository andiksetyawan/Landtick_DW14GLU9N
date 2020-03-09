import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { getOrders } from "../_actions/order";

import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import LensIcon from "@material-ui/icons/Lens";
import PrintRoundedIcon from "@material-ui/icons/PrintRounded";

import moment from "moment";
import "moment/locale/id";

import QRCode from "qrcode.react";

import {
  withStyles,
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Button,
  Divider
} from "@material-ui/core";

import NavBar from "../components/navbar";

const styles = theme => ({
  container: {
    marginTop: 100
  },
  paper: {
    color: theme.palette.text.primary,
    minHeight: 260,
    position: "relative",
    marginBottom: 20
  },
  logo: {
    position: "absolute",
    width: 100,
    height: 25,
    left: 0,
    top: 0,
    // background: "linear-gradient(180deg, #EC7A7A 0%, #EC7AB7 100%)",
    background: theme.palette.primary.main,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 100,
    padding: "0 10px",
    color: "#fff",
    fontFamily: "Mandali",
    fontSize: 18,
    fontWeight: "bold"
  },
  header: {
    position: "absolute",
    right: 0,
    top: 0,
    minWidth: 170,
    padding: 10
    // background: "gray"
  },
  body: {
    display: "flex",
    padding: "20px 20px 20px 20px",
    // position:"block"
    "& div": {
      padding: 10
    }
  },
  footer: {
    padding: "0px 20px 20px 20px"
    // position:"block"
    // "& div": {
    //   padding: 10
    // }
  },
  pending: {
    color: theme.palette.warning.main,
    // backgroundColor:theme.palette.warning.light,
    border: `1px solid ${theme.palette.warning.main}`,
    padding: "2px 10px",
    borderRadius: 5
  },
  approved: {
    color: theme.palette.success.main,
    border: `1px solid ${theme.palette.success.main}`,
    padding: "2px 10px",
    borderRadius: 5
  },
  cancel: {
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`,
    padding: "2px 10px",
    borderRadius: 5
  },
  infant: {
    color: theme.palette.success.main,
    border: `1px solid ${theme.palette.success.main}`,
    padding: "1px 10px",
    borderRadius: 5,
    marginLeft: 10
  }
});

const startStepIcons = props => <RadioButtonUncheckedIcon color="primary" />;

const endStepIcons = () => <LensIcon color="primary" />;

class MyTicket extends Component {
  constructor(props) {
    super(props);
    //  moment.locale('id');
    // moment().format('LLLL');
  }
  componentDidMount() {
    this.props.getOrders();
  }

  handlePayment = id => {
    alert(id);
    this.props.history.push("/payment/" + id);
  };

  render() {
    const { classes, orders } = this.props;
    console.log("orderrsss", orders);
    return (
      <>
        <NavBar />
        <Container className={classes.container}>
          <Typography style={{ margin: "10px 0" }} variant="h5">
            <b>Tiket Saya</b>
          </Typography>
          {orders.data &&
            orders.data.map(order => {
              return (
                <Paper className={classes.paper}>
                  <div className={classes.logo}>landtick</div>
                  <div className={classes.header}>
                    <Typography variant="h6">
                      <b>Kereta Api</b>
                    </Typography>
                    <div>
                      <Typography display="inline" variant="subtitle2">
                        {moment(order.createdAt)
                          .local()
                          .format("dddd, DD-MM-YYYY")}
                      </Typography>
                      {/* <Typography display="inline" variant="caption">
                        21 Februari 2020
                      </Typography> */}
                    </div>
                    <Typography variant="caption">
                      <span
                        className={
                          order.status == "pending"
                            ? classes.pending
                            : order.status == "approved"
                            ? classes.approved
                            : classes.cancel
                        }
                      >
                        {order.status}
                      </span>
                    </Typography>
                  </div>
                  {order.detail_orders.map((detail_order, i) => {
                    return (
                      <>
                        <section className={classes.body}>
                          <div>
                            <div>
                              <Typography variant="h6">
                                <b>{detail_order.ticket.train.name}</b>
                              </Typography>
                              <Typography variant="subtitle1">
                                {detail_order.ticket.class.name}
                              </Typography>
                              {/* <Typography variant="caption">Pending</Typography> */}
                            </div>
                          </div>
                          <div>
                            <Stepper orientation="vertical">
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
                          <div>
                            <div>
                              <Typography variant="subtitle1">
                                <b>
                                  {moment(detail_order.ticket.startTime)
                                    .local()
                                    .format("HH:mm")}
                                </b>
                              </Typography>
                              <Typography variant="caption">
                                {moment(detail_order.ticket.startTime)
                                  .local()
                                  .format("YYYY-MM-DD")}
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="subtitle1">
                                <b>
                                  {moment(detail_order.ticket.arrivalTime)
                                    .local()
                                    .format("HH:mm")}
                                </b>
                              </Typography>
                              <Typography variant="caption">
                                {moment(detail_order.ticket.arrivalTime)
                                  .local()
                                  .format("YYYY-MM-DD")}
                              </Typography>
                            </div>
                          </div>
                          <div>
                            <div>
                              <Typography variant="subtitle1">
                                <b>
                                  {`${detail_order.ticket.startStation.city} (${detail_order.ticket.startStation.code})`}
                                </b>
                              </Typography>
                              <Typography variant="caption">
                                Stasiun {detail_order.ticket.startStation.name}
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="subtitle1">
                                <b>
                                  {`${detail_order.ticket.destinationStation.city} (${detail_order.ticket.destinationStation.code})`}
                                </b>
                              </Typography>
                              <Typography variant="caption">
                                Stasiun{" "}
                                {detail_order.ticket.destinationStation.name}
                              </Typography>
                            </div>
                          </div>
                          {order.status == "approved" && (
                            <div style={{ textAlign: "center", marginTop: 10 }}>
                              <QRCode
                                bgColor="transparent"
                                size="45"
                                value={detail_order.code}
                              />
                              {/* <Typography variant="h6">
                              {detail_order.code}
                            </Typography> */}
                              <div>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  startIcon={<PrintRoundedIcon />}
                                >
                                  Cetak
                                </Button>
                              </div>
                            </div>
                          )}
                          {/* <div>sdsd</div> */}
                        </section>
                        <Divider />
                      </>
                    );
                  })}

                  <section className={classes.footer}>
                    <Grid container spacing={3}>
                      <Grid item xs={10}>
                        <Table aria-label="simple table" size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <b>No. Tanda Pengenal</b>
                              </TableCell>
                              <TableCell>
                                <b>Nama Penumpang</b>
                              </TableCell>
                              {/* <TableCell>No. Handphone</TableCell> */}
                              <TableCell>
                                <b>Email</b>
                              </TableCell>
                              {/* <TableCell></TableCell> */}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.passengers.map((passenger, i) => {
                              return (
                                <TableRow>
                                  <TableCell>{passenger.id_number}</TableCell>
                                  <TableCell>
                                    {passenger.name}
                                    {passenger.type == "infant" && (
                                      <Typography
                                        variant="caption"
                                        display="inline"
                                        className={classes.infant}
                                      >
                                        {"bayi"}
                                      </Typography>
                                    )}
                                  </TableCell>

                                  <TableCell>
                                    {passenger.email}
                                    {/* andik.setyawan19@gmail.com */}
                                  </TableCell>
                                  {/* <TableCell>
                                    
                                  </TableCell> */}
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Grid>
                      <Grid item xs={2} style={{ position: "relative" }}>
                        {order.status == "pending" && (
                          <Button
                            style={{ position: "absolute", bottom: 12 }}
                            variant="contained"
                            color="primary"
                            onClick={() => this.handlePayment(order.id)}
                          >
                            Bayar Sekarang
                          </Button>
                        )}
                        {/* {order.status == "approved" && (
                          <Button
                            style={{ position: "absolute", bottom: 12 }}
                            variant="contained"
                            color="primary"
                          >
                            Cetak E-Ticket
                          </Button>
                        )} */}
                      </Grid>
                    </Grid>
                  </section>
                </Paper>
              );
            })}
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order
});

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(getOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(MyTicket)));
