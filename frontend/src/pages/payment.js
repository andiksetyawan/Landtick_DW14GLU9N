import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import LensIcon from "@material-ui/icons/Lens";

import QRCode from "qrcode.react";
import { toRupiah } from "indo-formatter";
import moment from "moment";
import "moment/locale/id";

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
import Alert from "@material-ui/lab/Alert";

import NavBar from "../components/navbar";

import { getOrder, updateProofOrder } from "../_actions/order";

const styles = theme => ({
  container: {
    marginTop: 100
  },
  paper: {
    color: theme.palette.text.primary,
    minHeight: 50,
    position: "relative"
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
    padding: "80px 20px 20px 20px",
    // position:"block"
    "& div": {
      padding: 10
    }
  },
  passenger: {
    padding: "50px 20px 20px 20px"
    // position:"block"
    // "& div": {
    //   padding: 10
    // }
  },
  side: {
    backgroundColor: "#dadada",
    "& > div": {
      padding: 15,
      display: "flex"
    }
  },
  stepper: {
    "& > div": {
      padding: "0 20px"
    }
  }
});

const startStepIcons = () => <RadioButtonUncheckedIcon color="primary" />;

const endStepIcons = () => <LensIcon color="primary" />;

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      preview: null
    };
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
   // console.log("didid", id);
    //this.props.resetOrder();
    const res = await this.props.getOrder(id);
    if (res.action.type == "GET_ORDER_FULFILLED") {
      let path_img = null;
      if (this.props.order.data.proof_transfer) {
        path_img =
          "http://localhost:5000/assets/img/" +
          this.props.order.data.proof_transfer;
      }
      this.setState({ preview: path_img });
    }
  }

  handleSavePayment = async e => {
    const { id } = this.props.match.params;
    if(this.state.image){
      const res = await this.props.updateProofOrder(this.state.image, id);
      if (res.action.type == "UPDATE_ORDER_FULFILLED") {
        //show alert klik myticket
        // this.props.history.push("/myticket")
      }
    }else{
      alert("Upload bukti transfer lebih dahulu.")
    }
    
  };

  render() {
    const { classes, match, order } = this.props;
    const { params } = match;
    const { data, loading, error } = order;

    console.log("pass", order.data);
    // console.log("params", params);
    if (loading)
      return (
        <>
          <NavBar />
          <div style={{ marginTop: 100, textAlign: "center" }}>Loading...</div>
        </>
      );
    return (
      <>
        <NavBar />
        <Container className={classes.container}>
          <Typography style={{ margin: "10px 0" }} variant="h5">
            <b>Pembayaran Tiket</b>
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Paper>
                {order.data && order.data.status === "pending" && (
                  <Alert
                    severity="warning"
                    variant="outlined"
                    style={{ marginBottom: 10 }}
                  >
                    Silahkan melakukan melakukan pembayaran melalui M-Banking
                    E-Banking dan ATM ke nomor rekening berikut ini:
                    <br />
                    <br />
                    No. Rek : <b>00812881828 BCA A/N Andik Setyawan</b>
                  </Alert>
                )}

                {order.data && order.data.status === "checking" && (
                  <Alert
                    severity="warning"
                    variant="outlined"
                    style={{ marginBottom: 10 }}
                  >
                    <b>
                      Pembayaran anda dalam proses konfirmasi admin dalam 1x24
                      jam. 
                      <Link to="/myticket">Lihat daftar tiket saya.</Link>
                    </b>
                  </Alert>
                )}
              </Paper>
              <Paper className={classes.paper}>
                <div className={classes.logo}>landtick</div>
                <section className={classes.passenger}>
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>No. Tanda Pengenal</b>
                        </TableCell>
                        <TableCell>
                          <b>Nama Pemesan</b>
                        </TableCell>
                        <TableCell>
                          <b>No. Handphone</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.data &&
                        order.data.passengers &&
                        order.data.passengers.map((passenger, i) => {
                          return (
                            <TableRow key={passenger.id}>
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
                  {/* <Button
                    style={{ position: "absolute", bottom: 20 }}
                    variant="contained"
                    color="primary"
                  >
                    Bayar Sekarang
                  </Button> */}
                </section>
              </Paper>
              <Typography style={{ margin: "10px 0" }} variant="h6">
                <b>Rincian Harga</b>
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Paper className={classes.paper} style={{}}>
                    {order.data &&
                      order.data.detail_orders &&
                      order.data.detail_orders.map((detail_order, i) => {
                        return (
                          <div
                            key={detail_order.id}
                            style={{
                              display: "flex",
                              padding: "20px 20px 10px 20px"
                            }}
                          >
                            <div style={{ flexGrow: 1 }}>
                              {detail_order.ticket.train.name} (Dewasa) x{" "}
                              {detail_order.qty}
                            </div>
                            <div>
                              <b>
                                {toRupiah(
                                  detail_order.ticket.price * detail_order.qty
                                )}
                              </b>
                            </div>
                          </div>
                        );
                      })}

                    <div
                      style={{
                        display: "flex",
                        margin: "5px 0",
                        backgroundColor: "#dadada",
                        padding: "10px 20px",
                        borderRadius: "0 0 4px 4px"
                      }}
                    >
                      <div style={{ flexGrow: 1 }}>Total</div>
                      <div>
                        <b>{order.data && toRupiah(order.data.total)}</b>
                      </div>
                    </div>
                  </Paper>
                  {order.data && order.data.status === "pending" && (
                    <Button
                      fullWidth
                      style={{ marginTop: 20 }}
                      variant="contained"
                      color="primary"
                      onClick={this.handleSavePayment}
                    >
                      Bayar Sekarang
                    </Button>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper} style={{ padding: 10 }}>
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "gray",
                        // background:
                        //   "url(https://via.placeholder.com/150?text=Foto)",

                        minHeight: 100
                      }}
                    >
                      {/* <span>Bukti Transfer</span> */}
                      <img
                        src={this.state.preview}
                        alt="Bukti Transfer"
                        style={{ width: "100%" }}
                      />
                    </div>
                    {order.data && order.data.status === "pending" && (
                      <>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="upload-file"
                          type="file"
                          style={{
                            display: "none"
                          }}
                          onChange={e => {
                            this.setState({
                              image: e.target.files[0],
                              preview: URL.createObjectURL(e.target.files[0])
                            });
                          }}
                        />
                        <label htmlFor="upload-file">
                          <Button
                            style={{marginTop:10}}
                            fullWidth
                            variant="outlined"
                            color="primary"
                            component="span"
                          >
                            Upload bukti transfer
                          </Button>
                        </label>
                      </>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.side}>
                <div>
                  <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                      <b>Kereta Api</b>
                    </Typography>
                    <div>
                      {order.data && (
                        <Typography display="inline" variant="subtitle2">
                          {moment(order.data.createdAt)
                            .local()
                            .format("dddd, DD-MM-YYYY")}
                        </Typography>
                      )}
                    </div>
                  </div>
                  {/* <div>
                    <QRCode
                      bgColor="transparent"
                      size={80}
                      value={detail_order.code}
                    />
                    <Typography variant="h6">{detail_order.code}</Typography>
                  </div> */}
                </div>
                {order.data &&
                  order.data.detail_orders &&
                  order.data.detail_orders.map((detail_order, i) => {
                    return (
                      <>
                        <div
                          key={"train_" + detail_order.id}
                          style={{ backgroundColor: "white" }}
                        >
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
                        <div
                          key={"ticket_" + detail_order.id}
                          style={{ backgroundColor: "white" }}
                        >
                          <div>
                            <Stepper
                              orientation="vertical"
                              style={{ padding: 0 }}
                            >
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
                                    .format("HH:mm:ss")}
                                </b>
                              </Typography>
                              <Typography variant="caption">
                                {moment(detail_order.ticket.startTime)
                                  .local()
                                  .format("DD-MM-YYYY")}
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="subtitle1">
                                <b>
                                  {moment(detail_order.ticket.arrivalTime)
                                    .local()
                                    .format("HH:mm:ss")}
                                </b>
                              </Typography>
                              <Typography variant="caption">
                                {moment(detail_order.ticket.arrivalTime)
                                  .local()
                                  .format("DD-MM-YYYY")}
                              </Typography>
                            </div>
                          </div>
                          <div>
                            <div>
                              <Typography variant="subtitle1">
                                <b>{`${detail_order.ticket.startStation.city} (${detail_order.ticket.startStation.code})`}</b>
                              </Typography>
                              <Typography variant="caption">
                                Stasiun {detail_order.ticket.startStation.name}
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="subtitle1">
                                <b>{`${detail_order.ticket.destinationStation.city} (${detail_order.ticket.destinationStation.code})`}</b>
                              </Typography>
                              <Typography variant="caption">
                                Stasiun{" "}
                                {detail_order.ticket.destinationStation.name}
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <Divider />
                      </>
                    );
                  })}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // resetOrder: () => dispatch(resetOrder()),
  getOrder: id => dispatch(getOrder(id)),
  updateProofOrder: (image, id) => dispatch(updateProofOrder(image, id))
});

const mapStateToProps = state => ({
  order: state.order
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Payment));
