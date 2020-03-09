import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  IconButton
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import CloseIcon from "@material-ui/icons/Close";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";

const styles = theme => ({
  closeButton: {
    position: "absolute",
    top: 1,
    right: 1,
    color: theme.palette.primary.main
  }
});

class DeleteOrder extends React.Component {
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
          style={{ color: "red" }}
          aria-label="delete"
          component="span"
        >
          <DeleteOutlineRoundedIcon />
        </IconButton>
        <Dialog
          open={this.state.isopen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
        >
          <DialogTitle>
            {/* <IconButton
              size="small"
              aria-label="close"
              className={classes.closeButton}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton> */}
            Yakin ingin menghapus data order ?
          </DialogTitle>
          {/* <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Data yang terhapus tidak bisa dikembalikan.
            </DialogContentText>
          </DialogContent> */}
          <DialogActions style={{padding:"8px 20px"}}>
            <Button color="primary">Batal</Button>
            <Button style={{ color: "red" }} autoFocus>
              Hapus
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(DeleteOrder);
