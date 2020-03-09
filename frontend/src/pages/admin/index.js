import React from "react";

import { withStyles, Container, Typography } from "@material-ui/core";

import NavBar from "../../components/navbar";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { IconButton } from "@material-ui/core";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";

import DetailOrder from "../../components/admin/detailOrder";
import EditOrder from "../../components/admin/editOrder";
import DeleteOrder from "../../components/admin/deleteOrder";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

const styles = theme => ({
  root: {
    marginTop: 100
  }
});

class Admin extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <NavBar />
        <section className={classes.root}>
          <Container>
            <Typography style={{ margin: "10px 0" }} variant="h5">
              <b>Daftar Transaksi</b>
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="transaction table">
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Tiket</TableCell>
                    <TableCell>Bukti Transfer</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={row.name}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{row.calories}</TableCell>
                      <TableCell>{row.fat}</TableCell>
                      <TableCell>{row.carbs}</TableCell>
                      <TableCell>{row.carbs}</TableCell>
                      <TableCell align="center">
                        {/* <IconButton
                          onClick={e => alert("sd")}
                          color="primary"
                          aria-label="detail"
                          component="span"
                        >
                          <SearchRoundedIcon />
                        </IconButton> */}

                        {/* <IconButton
                          onClick={e => alert("sd")}
                          style={{ color: "green" }}
                          aria-label="edit"
                          component="span"
                        >
                          <BorderColorRoundedIcon />
                        </IconButton> */}

                        {/* <IconButton
                          onClick={e => alert("sd")}
                          style={{ color: "red" }}
                          aria-label="delete"
                          component="span"
                        >
                          <DeleteOutlineRoundedIcon />
                        </IconButton> */}
                        <DetailOrder />
                        <EditOrder />
                        <DeleteOrder />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </section>
      </>
    );
  }
}

export default withStyles(styles)(Admin);
