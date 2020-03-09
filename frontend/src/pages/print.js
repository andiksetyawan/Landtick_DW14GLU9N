import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { getDetailOrder } from "../_actions/detail_order";

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
  //   header: {
  //     position: "absolute",
  //     right: 0,
  //     top: 0,
  //     minWidth: 170,
  //     padding: 10
  //     // background: "gray"
  //   },
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

class Print extends React.Component {
  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await this.props.getDetailOrder(id);
    if (res.action.type === "GET_DETAIL_ORDER_FULFILLED") {
      window.print();
    }
  }
  render() {
    const { classes, detail_order } = this.props;
    // console.log("ordeeerr", order);
    const { loading, data, error } = detail_order;
    if (loading || !detail_order.data) return <center>Loading......</center>;
    return (
      <>
        <Container className={classes.container}>
          <Paper className={classes.paper}>
            <div className={classes.logo}>landtick</div>
            <section className={classes.body}>
              <div>
                <div>
                  <Typography variant="h6">
                    <b>{detail_order.data.ticket.train.name}</b>
                  </Typography>
                  <Typography variant="subtitle1">
                    {detail_order.data.ticket.class.name}
                  </Typography>
                  {/* <Typography variant="caption">Pending</Typography> */}
                </div>
              </div>
              <div>
                <Stepper orientation="vertical">
                  <Step key="1">
                    <StepLabel StepIconComponent={startStepIcons}></StepLabel>
                  </Step>
                  <Step key="2">
                    <StepLabel StepIconComponent={endStepIcons}></StepLabel>
                  </Step>
                </Stepper>
              </div>
              <div>
                <div>
                  <Typography variant="subtitle1">
                    <b>
                      {moment(detail_order.data.ticket.startTime)
                        .local()
                        .format("HH:mm")}
                    </b>
                  </Typography>
                  <Typography variant="caption">
                    {moment(detail_order.data.ticket.startTime)
                      .local()
                      .format("YYYY-MM-DD")}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle1">
                    <b>
                      {moment(detail_order.data.ticket.arrivalTime)
                        .local()
                        .format("HH:mm")}
                    </b>
                  </Typography>
                  <Typography variant="caption">
                    {moment(detail_order.data.ticket.arrivalTime)
                      .local()
                      .format("YYYY-MM-DD")}
                  </Typography>
                </div>
              </div>
              <div>
                <div>
                  <Typography variant="subtitle1">
                    <b>
                      {`${detail_order.data.ticket.startStation.city} (${detail_order.data.ticket.startStation.code})`}
                    </b>
                  </Typography>
                  <Typography variant="caption">
                    Stasiun {detail_order.data.ticket.startStation.name}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle1">
                    <b>
                      {`${detail_order.data.ticket.destinationStation.city} (${detail_order.data.ticket.destinationStation.code})`}
                    </b>
                  </Typography>
                  <Typography variant="caption">
                    Stasiun {detail_order.data.ticket.destinationStation.name}
                  </Typography>
                </div>
              </div>
              {detail_order.data.order.status == "approved" && (
                <div style={{ textAlign: "center", marginTop: 15 }}>
                  <QRCode
                    bgColor="transparent"
                    size={80}
                    value={detail_order.data.code}
                  />
                  <Typography variant="subtitle2">
                    {detail_order.data.code}
                  </Typography>
                </div>
              )}
              <div>
                <div>
                  <Typography variant="h6">
                    <b>Kereta Api</b>
                  </Typography>
                  <Typography variant="subtitle2">
                    {moment(detail_order.data.order.createdAt)
                      .local()
                      .format("dddd, DD-MM-YYYY")}
                  </Typography>
                </div>
              </div>
            </section>
            <Divider />

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
                      {detail_order.data.order.passengers &&
                        detail_order.data.order.passengers.map(
                          (passenger, i) => {
                            return (
                              <TableRow key={i}>
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
                          }
                        )}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </section>
          </Paper>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getDetailOrder: id => dispatch(getDetailOrder(id))
});

const mapStateToProps = state => ({
  detail_order: state.detail_order
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Print));
