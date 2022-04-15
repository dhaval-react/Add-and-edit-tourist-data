import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "./Pages/Header";
import CircularProgress from "@material-ui/core/CircularProgress";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  heaadingMain: {
    justifyContent: "space-between",
    padding: "10px",
  },
});

export default function CustomizedTables() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [deletedTouristStatus, setDeletedTourist] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [isOpenTouristDetails, setIsOpenTouristDetails] = useState(false);
  const [toristDetalisData, setToristDetalisData] = useState([]);
  const [showLoader, setShowLoader] = useState(true); 

     

  const handleChangePage = (event, value) => {
    setcurrentPage(value);
    fetch(`http://restapi.adequateshop.com/api/Tourist?page=${value}`)
      .then((data) => data.json())
      .then((data) => setList(data));
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(`http://restapi.adequateshop.com/api/Tourist?page=${currentPage}`)
      .then((data) => data.json())
      //.then(data => setList(data))
      .then((data) => {
        setList(data);
        setShowLoader(false);
      });
  };

  const deleteTourist = (touristId) => {
    fetch(`http://restapi.adequateshop.com/api/Tourist/${touristId}`, {
      method: "DELETE",
    }).then(() => {
      setDeletedTourist({ status: "Delete successful" });
      getData();
    });
  };
  const editTourist = (touristData) => {
    navigate("/registration", { state: touristData });
  };

  const viewUserDetails = (touristData) => {
    setIsOpenTouristDetails(true);
    setToristDetalisData(touristData);
  };
  return (
    <TableContainer
      component={Paper}
      style={{ width: "90%", margin: "0 auto" }}
       >
     {showLoader && (                      
      <div className="loader-overlay">
        <div className="showSpiner">
          <CircularProgress />
        </div>
     </div>
     )}

      {isOpenTouristDetails && (
        <Header
          isOpen={isOpenTouristDetails}
          handleModel={setIsOpenTouristDetails}
          touristData={toristDetalisData}
        />
      )}

      <Grid container className={classes.heaadingMain}>
        <Grid>
          <h2>Tourister Data</h2>
        </Grid>
        <Grid>
          <Button
            onClick={() => navigate("/registration")}
            variant="contained"
            color="primary"
          >
            Add New Tourist
          </Button>
        </Grid>
      </Grid>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Location</StyledTableCell>
            <StyledTableCell align="center">Profile</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.data &&
            list.data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {" "}
                  {row.id}{" "}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.tourist_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.tourist_email}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.tourist_location}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <img
                    src={row.tourist_profilepicture}
                    style={{
                      height: "80px",
                      width: "80px",
                      borderRadius: "100px",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="Edit">
                    <EditIcon
                      className="actionIcon"
                      onClick={() => editTourist(row)}
                    />
                  </Tooltip>

                  <Tooltip title="Delete">
                    <DeleteIcon
                      className="actionIcon"
                      style={{ marginLeft: "10px" }}
                      onClick={() => deleteTourist(row.id)}
                    />
                  </Tooltip>

                  <Tooltip title="View Details">
                    <VisibilityIcon
                      className="actionIcon"
                      style={{ marginLeft: "10px" }}
                      onClick={() => viewUserDetails(row)}
                    />
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.root}>
        <Pagination
          count={list.total_pages}
          onChange={handleChangePage}
          className="pagination"
        />
      </div>
    </TableContainer>
  );
}
