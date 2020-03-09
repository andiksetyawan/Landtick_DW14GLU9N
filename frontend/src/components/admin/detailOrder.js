import React from "react";

import {
  withStyles,
  Dialog,
  IconButton,
  DialogTitle,
  Typography,
  DialogContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import LensIcon from "@material-ui/icons/Lens";

import QRCode from "qrcode.react";
import moment from "moment";

import { toRupiah } from "indo-formatter";

import { connect } from "react-redux";
import { getOrder } from "../../_actions/order";

const startStepIcons = () => <RadioButtonUncheckedIcon color="primary" />;

const endStepIcons = () => <LensIcon color="primary" />;

const styles = theme => ({
  closeButton: {
    position: "absolute",
    top: 2,
    right: 2,
    color: theme.palette.primary.main
  },
  logo: {
    position: "absolute",
    width: 100,
    height: 25,
    left: 0,
    top: 0,
    // background: "linear-gradient(180deg, #EC7A7A 0%, #EC7AB7 100%)",
    background: theme.palette.primary.main,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 100,
    padding: "0 10px",
    color: "#fff",
    fontFamily: "Mandali",
    fontSize: 18,
    fontWeight: "bold"
  },
  proofTransfer: {
    "& img": {
      width: "100%",
      borderRadius: 10,
      maxHeight: 200
    }
  },
  main: {
    "& > div": {
      padding: "10px 0",
      display: "flex",
      "& > div": {
        padding: "0 10px"
        // display: "flex",
      }
    }
  },
  stepper: {
    "& > div": {
      padding: "0 20px"
    }
  }
});

class DetailOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isopen: false };
  }

  handleClose = () => {
    this.setState({ isopen: false });
  };

  componentDidMount() {
    // alert(this.props.id);
   // this.props.onRefresh("ssas");

  }

  handleOpen = id => {
    this.setState({ isopen: true });
    // this.props.getOrder(id);
    // alert(id);
  };

  render() {
    const { classes, order } = this.props;
    // const { loading, data } = order;
    console.log("order", order);
    // if (loading) return <div>loading..</div>;
    return (
      <>
        <IconButton
          onClick={e => this.handleOpen(this.props.id)}
          color="primary"
          aria-label="detail"
          component="span"
        >
          <SearchRoundedIcon />
        </IconButton>
        <Dialog
          open={this.state.isopen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
        >
          <DialogTitle>
            <IconButton
              size="small"
              aria-label="close"
              className={classes.closeButton}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>

            <div className={classes.logo}>landtick</div>
          </DialogTitle>
          <DialogContent style={{ textAlign: "left", marginBottom: 20 }}>
            <div style={{ padding: 10 }}>
              <Typography variant="h4">
                <b>INVOICE</b>
              </Typography>
              <Typography variant="caption">
                Kode Invoice : {order.invoice}
              </Typography>
            </div>

            <Grid container spacing={3}>
              <Grid item xs={8} className={classes.main}>
                <div>
                  <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                      <b>Kereta Api</b>
                    </Typography>
                    <div>
                      <Typography display="inline" variant="subtitle2">
                        {moment(order.createdAt)
                          .local()
                          .format("dddd, DD MMMM YYYY")}
                      </Typography>
                      {/* <Typography display="inline" variant="caption">
                        21 Februari 2020
                      </Typography> */}
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                {order.proof_transfer && (
                  <div className={classes.proofTransfer}>
                    <img
                      src={`http://localhost:5000/assets/img/${order.proof_transfer}`}
                    />
                    <div>Payment Proof</div>
                  </div>
                )}
              </Grid>
            </Grid>

            <section className={classes.main}>
              {order.detail_orders.map((detail_order, i) => {
                return (
                  <>
                    <div style={{ backgroundColor: "white" }}>
                      <div>
                        <Typography variant="h6">
                          <b>{detail_order.ticket.train.name}</b>
                        </Typography>
                        <Typography variant="subtitle1">
                          {detail_order.ticket.class.name}
                        </Typography>
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
                              {moment(detail_order.ticket.startTime)
                                .local()
                                .format("HH:mm")}
                            </b>
                          </Typography>
                          <Typography variant="caption">
                            {moment(detail_order.ticket.startTime)
                              .local()
                              .format("DD MMMM YYYY")}
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
                              .format("DD MMMM YYYY")}
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
                      <div>
                        <QRCode
                          bgColor="transparent"
                          size={80}
                          value={detail_order.code}
                        />
                        <Typography variant="subtitle2">
                          {detail_order.code}
                        </Typography>
                      </div>
                    </div>
                  </>
                );
              })}
            </section>

            <Table size="small" aria-label="simple table">
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
            <div
              style={{
                display: "flex",
                margin: "5px 0",
                backgroundColor: "#dadada",
                padding: "10px 20px",
                borderRadius: "0 0 4px 4px",
                width: "100%"
              }}
            >
              <div style={{ flexGrow: 1 }}>Total</div>
              <div>
                <b>{toRupiah(order.total)}</b>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(DetailOrder);
