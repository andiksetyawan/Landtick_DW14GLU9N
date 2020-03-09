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

import { connect } from "react-redux";

const startStepIcons = () => <RadioButtonUncheckedIcon  color="primary" />;

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
      display: "flex"
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
    this.state = { isopen: false, email: "", password: "" };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClose = () => {
    this.setState({ isopen: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <IconButton
          onClick={() => this.setState({ isopen: true })}
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
          <DialogContent style={{ textAlign: "left", marginBottom:20 }}>
            <Typography variant="h4">
              <b>INVOICE</b>
            </Typography>
            <Typography variant="caption">Kode Invoice : INV0101</Typography>
            <Grid container spacing={3}>
              <Grid item xs={8} className={classes.main}>
                <div>
                  <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                      <b>Kereta Api</b>
                    </Typography>
                    <div>
                      <Typography display="inline" variant="subtitle2">
                        <b>Sabtu </b>
                      </Typography>
                      <Typography display="inline" variant="caption">
                        21 Februari 2020
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <QRCode bgColor="transparent" size="40" value="INV0101" />
                    <Typography variant="h6">INV0101</Typography>
                  </div>
                </div>
                <div style={{ backgroundColor: "white" }}>
                  <div>
                    <Typography variant="h6">
                      <b>Argo Wilis </b>
                    </Typography>
                    <Typography variant="subtitle1">Executive (H)</Typography>
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
                        <StepLabel StepIconComponent={endStepIcons}></StepLabel>
                      </Step>
                    </Stepper>
                  </div>
                  <div className={classes.stepper}>
                    <div>
                      <Typography variant="subtitle1">
                        <b>05.00</b>
                      </Typography>
                      <Typography variant="caption">
                        21 Februari 2020
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="subtitle1">
                        <b>21.00 </b>
                      </Typography>
                      <Typography variant="caption">
                        21 Februari 2020
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <div>
                      <Typography variant="subtitle1">
                        <b>Jakarta (GMR)</b>
                      </Typography>
                      <Typography variant="caption">Stasiun Gambir</Typography>
                    </div>
                    <div>
                      <Typography variant="subtitle1">
                        <b>Surabaya (SBY) </b>
                      </Typography>
                      <Typography variant="caption">
                        Stasiun Surabaya
                      </Typography>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.proofTransfer}>
                  <img src="https://skripsilive.com/wp-content/uploads/et_temp/IMG-20180502-WA0009-576x1024-47225_576x675.jpg" />
                  <div>Upload Payment Proof</div>
                </div>
              </Grid>
            </Grid>
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>No. ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Nama</b>
                  </TableCell>
                  <TableCell>
                    <b>No. Hp</b>
                  </TableCell>
                  <TableCell>
                    <b>Email</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>0817318391839191</TableCell>
                  <TableCell>Andik</TableCell>
                  <TableCell>029812127172</TableCell>
                  <TableCell>andik@gmail.com</TableCell>
                </TableRow>
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
                <b>Rp.250.000</b>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default connect()(withStyles(styles)(DetailOrder));
