import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import CloseIcon from "@material-ui/icons/Close";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";

import { connect } from "react-redux";
import { updateOrder } from "../../_actions/order";

const styles = theme => ({
  // root: {
  //   textAlign: "center"
  // },
  closeButton: {
    position: "absolute",
    top: 2,
    right: 2,
    color: theme.palette.primary.main
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
});

class EditTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isopen: false, status: this.props.order.status };
  }

  handleUpdate = async () => {
    const data = { status: this.state.status };
    const res = await this.props.updateOrder(data, this.props.order.id);
    if (res.action.type === "UPDATE_ORDER_FULFILLED") {
      this.setState({ isopen: false });
      this.props.onRefresh();
    }
  };

  handleClose = () => {
    this.setState({ isopen: false });
  };

  render() {
    const { classes, order } = this.props;

    console.log("order edit", order);

    return (
      <>
        <IconButton
          onClick={() => this.setState({ isopen: true })}
          style={{ color: "green" }}
          aria-label="edit"
          component="span"
        >
          <BorderColorRoundedIcon />
        </IconButton>
        <Dialog
          open={this.state.isopen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
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
            <b>Edit Transaksi</b>
          </DialogTitle>
          <DialogContent>
            <form noValidate autoComplete="off">
              <TextField
                id="name"
                type="text"
                margin="dense"
                label="No."
                variant="filled"
                name="name"
                fullWidth
                disabled
                value="1"
              />

              <TextField
                id="name"
                type="text"
                margin="dense"
                label="Nama"
                variant="filled"
                name="name"
                fullWidth
                disabled
                value="Andik Setyawan"
              />

              <TextField
                id="name"
                type="text"
                margin="dense"
                label="Jurusan"
                variant="filled"
                name="name"
                fullWidth
                disabled
                value="Surabaya - Jakarta"
              />

              <TextField
                id="name"
                type="text"
                margin="dense"
                label="Bukti Transfer"
                variant="filled"
                name="name"
                fullWidth
                disabled
                value="bca.jpg"
              />

              <div style={{ margin: "8px 0" }}>
                <FormControl
                  variant="filled"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label-gender">
                    Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label-gender"
                    id="demo-simple-select-filled-gender"
                    value={this.state.status}
                    onChange={e => this.setState({ status: e.target.value })}
                  >
                    <MenuItem value={"approved"}>Approved</MenuItem>
                    <MenuItem value={"pending"}>Pending</MenuItem>
                    <MenuItem value={"cancel"}>Cancel</MenuItem>
                    <MenuItem value={"checking"}>Checking</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Button
                style={{ borderRadius: 20, margin: "20px 0" }}
                // type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                onClick={this.handleUpdate}
              >
                SAVE
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateOrder: (data, id) => dispatch(updateOrder(data, id))
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(EditTransaction));
