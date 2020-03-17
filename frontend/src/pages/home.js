import React, { Component } from "react";
import {
  withStyles,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Avatar,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl
} from "@material-ui/core";

import { withRouter } from "react-router-dom";

import Alert from "@material-ui/lab/Alert";

// import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

import TrainIcon from "@material-ui/icons/Train";
import SwapHorizRoundedIcon from "@material-ui/icons/SwapHorizRounded";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import Autocomplete from "@material-ui/lab/Autocomplete";

import NavBar from "../components/navbar";
import Highlight from "../components/highlight";

import { connect } from "react-redux";
import { getTickets } from "../_actions/tickets";
import { getStations } from "../_actions/station";
import { getSearch } from "../_actions/search";
import { addCarts, addReturnCart } from "../_actions/carts";

import moment from "moment";
import queryString from "query-string";
import { toRupiah } from "indo-formatter";

const getDuration = (timeA, timeB) => {
  var startTime = moment(timeA, "YYYY-MM-DD HH:mm:ss");
  var endTime = moment(timeB, "YYYY-MM-DD HH:mm:ss");
  // var startTime = moment(timeA, "HH:mm:ss");
  // var endTime = moment(timeB, "HH:mm:ss");
  var duration = moment.duration(endTime.diff(startTime));
  var hours = parseInt(duration.asHours());
  var minutes = parseInt(duration.asMinutes()) - hours * 60;
  if (hours > 0) {
    if (minutes == 0) {
      return `${hours} j`;
    } else {
      return `${hours} j ${minutes} m`;
    }
  } else {
    return `${minutes} m`;
  }
};

const styles = theme => ({
  paper: {
    //   padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 260
  },
  buyTicket: {
    marginTop: "-80px"
  },
  menu: {
    display: "flex",
    alignItems: "center",
    borderLeft: `10px solid #F08200`,
    padding: 10,
    backgroundColor: "#e0e0e0",
    color: "#F08200"
  },
  avatarButton: {
    backgroundColor: theme.palette.primary.main,
    cursor: "pointer"
  },
  todayTicket: {
    marginTop: 20
  },
  footer: {
    backgroundColor: theme.palette.primary.main,
    marginTop: 20,
    padding: 30,
    color: "#fff"
  },
  btnPesan: {
    backgroundColor: "#4caf50",
    color: "white",
    paddingLeft: 15,
    paddingRight: 10,
    "&:hover": {
      backgroundColor: "#388e3c"
    }
  },
  btnPesanDisabled: {
    backgroundColor: "gray",
    color: "white",
    paddingLeft: 15,
    paddingRight: 10,
    "&:hover": {
      backgroundColor: "gray"
    }
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0, //stepper pilih tiket pergi ke pulang
      pp: false,
      pergi: moment().add(1, "days"),
      pulang: moment().add(1, "days"),
      adult: 1,
      infant: 0,
      start_station: null,
      destination_station: null
    };
  }

  componentDidMount() {
    this.props.getTickets();
    this.props.getStations();
  }

  handleCariTiket = e => {
//    alert("cari tiket");
    this.setState({ step: 0 });
    const data = {
      start_station_id: this.state.start_station.id,
      destination_station_id: this.state.destination_station.id,
      startTime: moment(this.state.pergi).format("YYYY-MM-DD hh:mm:ss"),
      qty: this.state.adult
      // passenger
    };

    console.log("dataa", data);

    const query = queryString.stringify(data);
    console.log("query", query);
    this.props.getSearch(query);
  };

  handleBookingDeparture = async (e, data) => {
    console.log("row id departure", data.id);
    const data_add_cart = {
      passengers: [],
      departure: {
        ticket: data,
        price: data.price,
        qty: this.state.adult,
        sub_total: data.price * this.state.adult
      },
      return: {},
      adult: this.state.adult,
      infant: this.state.infant,
      total: 0
    };
    this.props.addCarts(data_add_cart);
    //this.props.history.push("/booking");
    //if pp triger search search dari tanggal pulang
    if (this.state.pp) {
      console.log("PP PPP PP PP");
      const data = {
        start_station_id: this.state.destination_station.id,
        destination_station_id: this.state.start_station.id,
        startTime: moment(this.state.pulang).format("YYYY-MM-DD hh:mm:ss"),
        qty: this.state.adult
        // passenger
      };

      const query = queryString.stringify(data);
      //  console.log("query pulang", query);
      const res = await this.props.getSearch(query);
      //console.log(res);
      if (res.action.type === "GET_SEARCH_FULFILLED") {
        //console.log("FULLFILED");
        this.setState({ step: 1 });
      }
    } else {
      this.props.history.push("/booking");
      //console.log("TIDAK PP PPP PP PP", this.state.pp);
    }
  };

  handleBookingReturn = async (e, data) => {
    console.log("row id", data.id);
    const data_add_cart = {
      // passengers: [],
      return: {
        ticket: data,
        price: data.price,
        qty: this.state.adult,
        sub_total: data.price * this.state.adult
      }
      // return: {},
      //adult: this.state.adult,
      //infant: this.state.infant,
      //total: 0
    };
    this.props.addReturnCart(data_add_cart);
    this.props.history.push("/booking");
    //if pp triger search search dari tanggal pulang
  };

  render() {
    const { classes, tickets, stations, search } = this.props;
    let infant_menu_item = [];

    if (this.state.adult) {
      for (var i = 1; i <= this.state.adult; i++) {
        infant_menu_item.push(
          <MenuItem key={i} value={i}>
            {i}
          </MenuItem>
        );
      }
    }

    return (
      <>
        <NavBar />
        <Highlight />
        <section className={classes.buyTicket}>
          <Container>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item sm={3} xs={12}>
                  <div className={classes.menu}>
                    <TrainIcon color="inherit" />
                    <Typography color="textPrimary">
                      Tiket Kereta Api
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm={9} xs={12}>
                  <div style={{ padding: 10 }}>
                    <Typography color="primary" variant="h5">
                      <b>Tiket Kereta Api</b>
                    </Typography>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ flex: 10 }}>
                        <Typography variant="subtitle1">
                          <b>Asal</b>
                        </Typography>
                        <Autocomplete
                          value={this.state.start_station}
                          options={stations.data}
                          onChange={(e, value) => {
                            console.log("vvv", value);
                            // if (value) {
                            this.setState({
                              start_station: value
                            });
                            // } else {
                            //   this.setState({
                            //     start_station_id: value //NULL
                            //   });
                            // }
                          }}
                          getOptionLabel={option =>
                            `${option.name} - ${option.city} (${option.code})`
                          }
                          renderInput={params => (
                            <TextField
                              {...params}
                              placeholder="Stasiun Gambir"
                              variant="outlined"
                              size="small"
                            />
                          )}
                        />
                      </div>

                      <div style={{ flex: 1, margin: 10, minWidth: 40 }}>
                        <br />
                        <Avatar
                          // style={{ flex: 1, margin: 10, minWidth: 40 }}
                          className={classes.avatarButton}
                          onClick={() => {
                            this.setState({
                              destination_station: this.state.start_station,
                              start_station: this.state.destination_station
                            });

                            console.log(
                              this.state.destination_station,
                              this.state.start_station
                            );
                          }}
                        >
                          <SwapHorizRoundedIcon />
                        </Avatar>
                      </div>
                      <div style={{ flex: 10 }}>
                        <Typography variant="subtitle1">
                          <b>Tujuan</b>
                        </Typography>

                        <Autocomplete
                          //defaultValue={}
                          value={this.state.destination_station}
                          options={stations.data}
                          getOptionLabel={option =>
                            `${option.name} - ${option.city} (${option.code})`
                          }
                          // style={{ width: 300 }}
                          onChange={(e, value) => {
                            console.log("vvv", value);
                            // if (value) {
                            this.setState({
                              destination_station: value
                            });
                            // } else {
                            //   this.setState({
                            //     destination_station_id: value //NULL
                            //   });
                            // }
                          }}
                          renderInput={params => (
                            <TextField
                              {...params}
                              placeholder="Stasiun Gubeng"
                              variant="outlined"
                              size="small"
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ flex: 10 }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            display="inline"
                            style={{ flexGrow: 1 }}
                            variant="subtitle1"
                          >
                            <b>Tanggal</b>
                          </Typography>
                          <Typography display="inline" variant="subtitle1">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={this.state.pp}
                                  onChange={e =>
                                    this.setState({ pp: e.target.checked })
                                  }
                                  value="checkedB"
                                  color="primary"
                                />
                              }
                              label="Pulang pergi"
                            />
                          </Typography>
                        </div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <div style={{ display: "flex" }}>
                            <KeyboardDatePicker
                              fullWidth
                              autoOk
                              variant="inline"
                              inputVariant="outlined"
                              format="dd/MM/yyyy"
                              value={this.state.pergi}
                              //   InputAdornmentProps={{ position: "start" }}
                              onChange={d => this.setState({ pergi: d })}
                              size="small"
                            />
                            {this.state.pp && (
                              <KeyboardDatePicker
                                autoOk
                                fullWidth
                                variant="inline"
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                value={this.state.pulang}
                                // InputAdornmentProps={{ position: "start" }}
                                onChange={d => this.setState({ pulang: d })}
                                size="small"
                              />
                            )}
                          </div>
                        </MuiPickersUtilsProvider>
                      </div>

                      <div style={{ flex: 1, margin: 10, minWidth: 40 }}></div>
                      <div style={{ flex: 10, display: "flex" }}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Typography
                              variant="subtitle1"
                              style={{ marginTop: 15 }}
                            >
                              <b>Dewasa</b>
                            </Typography>
                            <FormControl
                              variant="outlined"
                              style={{ width: "100%" }}
                              size="small"
                            >
                              <Select
                                labelId="demo-simple-select-filled-label-gender"
                                id="demo-simple-select-filled-gender"
                                value={this.state.adult}
                                onChange={e =>
                                  this.setState({ adult: e.target.value })
                                }
                              >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={4}>
                            <Typography
                              variant="subtitle1"
                              style={{ marginTop: 15 }}
                            >
                              <b>Bayi</b>
                              <span style={{ fontSize: 10 }}>
                                {" "}
                                Dibawah 3 tahun
                              </span>
                            </Typography>
                            <FormControl
                              variant="outlined"
                              style={{ width: "100%" }}
                              size="small"
                            >
                              <Select
                                labelId="demo-simple-select-filled-label-gender"
                                id="demo-simple-select-filled-gender"
                                value={this.state.infant}
                                onChange={e =>
                                  this.setState({ infant: e.target.value })
                                }
                              >
                                <MenuItem value={0}>0</MenuItem>
                                {infant_menu_item}
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={4}>
                            <Typography
                              variant="subtitle1"
                              style={{ marginTop: 8 }}
                            ></Typography>
                            <br />
                            <br />
                            <Button
                              onClick={this.handleCariTiket}
                              variant="contained"
                              color="primary"
                            >
                              CARI TIKET
                            </Button>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </section>
        {search.data.length > 0 ? (
          <>
            <section className={classes.todayTicket}>
              <Container>
                <Typography>Hasil Pencarian</Typography>

                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nama Kereta</TableCell>
                        <TableCell align="right">Berangkat</TableCell>
                        <TableCell align="right">Tiba</TableCell>
                        <TableCell align="right">Durasi</TableCell>
                        <TableCell align="right">Harga Per Orang</TableCell>
                        <TableCell align="center">Pesan</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {search.data.map(row => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle2">
                              {row.train.name}
                            </Typography>
                            {row.qty <= 5 && (
                              <Typography
                                display="block"
                                style={{ color: "red" }}
                                variant="subtitle2"
                              >
                                {`Sisa ${row.qty} tiket`}
                              </Typography>
                            )}
                            <Typography variant="caption">
                              {row.class.name}
                            </Typography>
                          </TableCell>
                          {/* <TableCell align="right">{row.startStation}</TableCell> */}
                          <TableCell align="right">
                            <Typography variant="subtitle2">
                              {moment(row.startTime)
                                .local()
                                .format("YYYY-MM-DD HH:mm:ss")}
                            </Typography>
                            <Typography variant="caption">
                              {`${row.startStation.name} - ${row.startStation.city} (${row.startStation.code})`}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="subtitle2">
                              {moment(row.arrivalTime)
                                .local()
                                .format("YYYY-MM-DD HH:mm:ss")}
                            </Typography>
                            <Typography variant="caption">
                              {`${row.destinationStation.name} - ${row.destinationStation.city} (${row.destinationStation.code})`}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            {getDuration(row.startTime, row.arrivalTime)}
                            {/* 5j 05m */}
                            {/* {moment().format("YYYY-MM-DD")} */}
                            {/* {duration(row.arrivalTime, row.startTime)} */}
                          </TableCell>
                          <TableCell align="right">
                            {toRupiah(row.price)}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={e => {
                                if (this.state.pp) {
                                  console.log("111 masuk pp");
                                  if (this.state.step == 0) {
                                    console.log("111 step pp 0");

                                    this.handleBookingDeparture(e, row);
                                  } else {
                                    console.log("111 step pp > 0");

                                    this.handleBookingReturn(e, row);
                                  }
                                } else {
                                  this.handleBookingDeparture(e, row);
                                }
                              }}
                              className={
                                row.qty >= this.state.adult
                                  ? classes.btnPesan
                                  : classes.btnPesanDisabled
                              }
                              startIcon={<ShoppingBasketIcon />}
                            >
                              {row.qty >= this.state.adult
                                ? this.state.pp
                                  ? this.state.step == 0
                                    ? "pesan tiket pergi"
                                    : "pesan tiket pulang"
                                  : "pesan tiket"
                                : "tiket penuh"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            </section>
          </>
        ) : (
          <>
            <section className={classes.todayTicket}>
              <Container>
                {search.error ? (
                  <Alert severity="error">{search.error}</Alert>
                ) : (
                  <>
                    <TableContainer component={Paper}>
                      <Typography
                        color="primary"
                        style={{ padding: "10px 15px 0 15px " }}
                      >
                        <b>Tiket hari ini</b>
                      </Typography>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Nama Kereta</TableCell>
                            <TableCell align="right">Berangkat</TableCell>
                            <TableCell align="right">Tiba</TableCell>
                            <TableCell align="right">Durasi</TableCell>
                            <TableCell align="right">Harga Per Orang</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tickets.data &&
                            tickets.data.map(row => (
                              <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                  <Typography variant="subtitle2">
                                    {row.train.name}
                                  </Typography>
                                  <Typography variant="caption">
                                    {row.class.name}
                                  </Typography>
                                </TableCell>
                                {/* <TableCell align="right">{row.startStation}</TableCell> */}
                                <TableCell align="right">
                                  <Typography variant="subtitle2">
                                    {moment(row.startTime)
                                      .local()
                                      .format("YYYY-MM-DD HH:mm:ss")}
                                  </Typography>
                                  <Typography variant="caption">
                                    {`${row.startStation.name} - ${row.startStation.city} (${row.startStation.code})`}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography variant="subtitle2">
                                    {moment(row.arrivalTime)
                                      .local()
                                      .format("YYYY-MM-DD HH:mm:ss")}
                                  </Typography>
                                  <Typography variant="caption">
                                    {`${row.destinationStation.name} - ${row.destinationStation.city} (${row.destinationStation.code})`}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  {getDuration(row.startTime, row.arrivalTime)}
                                  {/* 5j 05m */}
                                  {/* {moment().format("YYYY-MM-DD")} */}
                                  {/* {duration(row.arrivalTime, row.startTime)} */}
                                </TableCell>
                                <TableCell align="right">
                                  {toRupiah(row.price)}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </Container>
            </section>
          </>
        )}

        <footer className={classes.footer}>landtick.com</footer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    tickets: state.tickets,
    stations: state.station,
    search: state.search
    // carts: state.carts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTickets: () => dispatch(getTickets()),
    getStations: () => dispatch(getStations()),
    getSearch: query => dispatch(getSearch(query)),
    addCarts: data => dispatch(addCarts(data)),
    addReturnCart: data => dispatch(addReturnCart(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Home)));
