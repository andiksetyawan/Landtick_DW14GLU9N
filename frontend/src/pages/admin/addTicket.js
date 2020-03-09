import React from "react";

import {
  withStyles,
  Container,
  Typography,
  Paper,
  TextField,
  Button
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
  DateTimePicker
} from "@material-ui/pickers";

import { connect } from "react-redux";
import { addTicket } from "../../_actions/ticket";
import { getStations } from "../../_actions/station";
import { getTrains } from "../../_actions/train";
import { getClasses } from "../../_actions/class";

import NavBar from "../../components/navbar";

import { Redirect } from "react-router-dom";

const styles = theme => ({
  root: {
    marginTop: 100
  },
  paper: {
    padding: 20,
    textAlign: "center"
  }
});

class AddTicket extends React.Component {
  constructor(props) {
    super(props);

    //const newdate = new Date()
    this.state = {
      train_id: null,
      class_id: null,
      dateStart: null,
      stationStart: null,
      startTime: null,
      destinationStation: null,
      arrivalTime: null,
      price: null,
      qty: null
    };
  }

  componentDidMount() {
    this.props.getTrains();
    this.props.getStations();
    this.props.getClasses();
  }
  handleAddTicket = async e => {
    const data = {
      train_id: this.state.train_id,
      class_id: this.state.class_id,
      dateStart: this.state.dateStart,
      start_station_id: this.state.stationStart,
      startTime: this.state.startTime,
      destination_station_id: this.state.destinationStation,
      arrivalTime: this.state.arrivalTime,
      price: this.state.price,
      qty: this.state.qty
    };
    console.log("data", data);
    const res = await this.props.addTicket(data);
    if (res.action.type === "ADD_TICKET_FULFILLED") {
      //CALL ALERT
      this.setState({
        train_id: null,
        class_id: null,
        dateStart: null,
        stationStart: null,
        startTime: null,
        destinationStation: null,
        arrivalTime: null,
        price: null,
        qty: null
      });
    }
  };

  render() {
    const { classes, user, stations, trains, class_train } = this.props;

    if (user.data && user.data.level == "user")
      return <Redirect to="/"></Redirect>;

    return (
      <>
        <NavBar />
        <section className={classes.root}>
          <Container maxWidth="sm">
            <Paper className={classes.paper}>
              <Typography
                style={{ margin: "10px 0", textAlign: "left" }}
                variant="h5"
              >
                <b>Tambah Tiket {this.state.train_id}</b>
              </Typography>

              <Autocomplete
                options={trains.data}
                onChange={(e, value) => {
                  console.log("vvv", value);
                  if (value) {
                    this.setState({ train_id: value.id });
                  } else {
                    this.setState({ train_id: value });
                  }
                }}
                getOptionLabel={option => `${option.name}`}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Kereta"
                    variant="outlined"
                    size="small"
                    margin="dense"
                  />
                )}
              />

              <Autocomplete
                options={class_train.data}
                onChange={(e, value) => {
                  console.log("vvv", value);
                  if (value) {
                    this.setState({ class_id: value.id });
                  } else {
                    this.setState({ class_id: value });
                  }
                }}
                getOptionLabel={option => `${option.name}`}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Jenis Kereta"
                    variant="outlined"
                    size="small"
                    margin="dense"
                  />
                )}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  autoOk
                  label="Tanggal Keberangkatan"
                  variant="inline"
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  margin="dense"
                  value={this.state.dateStart}
                  //   InputAdornmentProps={{ position: "start" }}
                  onChange={d =>
                    this.setState({
                      dateStart: d,
                      startTime: d,
                      arrivalTime: d
                    })
                  }
                  size="small"
                />
                <Autocomplete
                  options={stations.data}
                  onChange={(e, value) => {
                    console.log("vvv", value);
                    if (value) {
                      this.setState({ stationStart: value.id });
                    } else {
                      this.setState({ stationStart: value });
                    }
                  }}
                  getOptionLabel={option =>
                    `${option.name} - ${option.city} (${option.code})`
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Stasiun Keberangkatan"
                      variant="outlined"
                      size="small"
                      margin="dense"
                    />
                  )}
                />
                <KeyboardDateTimePicker
                  autoOk
                  fullWidth
                  ampm={false}
                  label="Waktu Keberangkatan"
                  variant="inline"
                  inputVariant="outlined"
                  format="dd/MM/yyyy HH:mm"
                  margin="dense"
                  value={this.state.startTime}
                  // InputAdornmentProps={{ position: "start" }}
                  onChange={dt => this.setState({ startTime: dt })}
                  size="small"
                />
                <Autocomplete
                  options={stations.data}
                  onChange={(e, value) => {
                    console.log("vvv", value);
                    if (value) {
                      this.setState({ destinationStation: value.id });
                    } else {
                      this.setState({ destinationStation: value });
                    }
                  }}
                  getOptionLabel={option =>
                    `${option.name} - ${option.city} (${option.code})`
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Stasiun Tujuan"
                      variant="outlined"
                      size="small"
                      margin="dense"
                    />
                  )}
                />

                <KeyboardDateTimePicker
                  autoOk
                  fullWidth
                  ampm={false}
                  label="Waktu Tiba"
                  variant="inline"
                  inputVariant="outlined"
                  margin="dense"
                  format="dd/MM/yyyy HH:mm"
                  value={this.state.arrivalTime}
                  // InputAdornmentProps={{ position: "start" }}
                  onChange={dt => this.setState({ arrivalTime: dt })}
                  size="small"
                />
              </MuiPickersUtilsProvider>

              <TextField
                value={this.state.price}
                type="number"
                margin="dense"
                label="Harga Tiket"
                variant="outlined"
                name="price"
                onChange={e => this.setState({ price: e.target.value })}
                fullWidth
              />
              <TextField
                value={this.state.qty}
                type="number"
                margin="dense"
                label="Stok"
                variant="outlined"
                name="qty"
                onChange={e => this.setState({ qty: e.target.value })}
                fullWidth
              />

              <Button
                style={{ borderRadius: 20, margin: "20px 0" }}
                // type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                onClick={this.handleAddTicket}
              >
                Tambah Tiket
              </Button>
            </Paper>
          </Container>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trains: state.train,
  stations: state.station,
  class_train: state.class_ticket
});

const mapDispatchToProps = dispatch => ({
  addTicket: data => dispatch(addTicket(data)),
  getStations: () => dispatch(getStations()),
  getTrains: () => dispatch(getTrains()),
  getClasses: () => dispatch(getClasses())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddTicket));
