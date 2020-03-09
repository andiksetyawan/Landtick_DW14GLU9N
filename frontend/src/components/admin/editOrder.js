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
    this.state = { isopen: false };
  }
  handleUpdate = async () => {};

  handleClose = () => {
    this.setState({ isopen: false });
  };

  render() {
    const { classes } = this.props;

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
                <FormControl variant="filled" size="small" style={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-filled-label-gender">
                    Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label-gender"
                    id="demo-simple-select-filled-gender"
                    value={"approved"}
                    // onChange={e => this.setState({ gender: e.target.value })}
                  >
                    <MenuItem value={"approved"}>Approved</MenuItem>
                    <MenuItem value={"pending"}>Pending</MenuItem>
                    <MenuItem value={"cancel"}>Cancel</MenuItem>
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

export default withStyles(styles)(EditTransaction);
