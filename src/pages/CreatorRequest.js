import { Icon } from "@iconify/react";
import eyeIcon from "@iconify/icons-akar-icons/eye";
import { Link as RouterLink } from "react-router-dom";
import { filter } from "lodash";
import { useState, useContext, useEffect } from "react";
import {
  Card,
  Table,
  Stack,
  IconButton,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  // TablePagination,
  Typography,
  Grid,
  Dialog,
  useTheme,
  // styled,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import Page from "../components/Page";
// import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import DenyDialog from "./DenyDialog";
// import ViewImage from "./ViewImage";
import {
  TableTitle,
  TableHeader,
  // UserListToolbar,
  // UserMoreMenu,
} from "../components/_dashboard/user";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { SearchContext } from "src/Context/searchContext";
import axios from "axios";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "src/database/db";
import { useDispatch } from "react-redux";
import { setCreatorRequest } from "src/store";
import { useTranslation } from "react-i18next";
import { RotateLoader } from "react-spinners";
// import { width } from "@mui/system";

// import { getAuth } from "firebase/auth";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("displayName");
  const [anchor, setAnchor] = useState(null);
  const theme = useTheme();
  // const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10000000);
  const [search, setSearch] = useContext(SearchContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const TABLE_HEAD = [
    { id: "sno", label: "#", alignRight: false },
    { id: "username", label: t("User_Name"), alignRight: false },
    { id: "creatername", label: t("Creator_Name"), alignRight: false },
    { id: "doctype", label: t("Doc_Type"), alignRight: false },
    { id: "faceIdImg", label: t("Face_Id"), alignRight: false },
    { id: "idCardImg", label: t("Id_Card"), alignRight: false },
    { id: "action", label: t("Action"), alignRight: false },
    { id: "action2", label: "", alignRight: false },
    { id: "view", label: t("View"), alignRight: false },
  ];

  // const useremail = getAuth();
  // console.log(useremail);
  const creatorRequests = useSelector((state) => state.creatorRequest.data);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const getLoginType = (user) => {
    if (user.LoginType === "PhoneNumber") {
      return user.phoneNumber;
    } else if (user.LoginType === "Google") {
      return user.email;
    } else if (user.LoginType === "Facebook") {
      return user.email;
    }
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = creatorRequests.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleFilterByName = (event) => {
  // 	setFilterName(event.target.value);
  // };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - creatorRequests.length)
      : 0;

  const filteredUsers = applySortFilter(
    creatorRequests,
    getComparator(order, orderBy)
    // filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const TableCellStyles = styled((props) => <TableCell {...props} />)(
    ({ theme }) => ({
      border: "1px solid #e3e6f0",
      fontSize: "12px",
    })
  );

  const acceptRequest = async (id) => {
    setLoading(true);
    try {
      setDoc(doc(db, "users", id), { isCreator: "approved" }, { merge: true });

      axios.post(
        "https://fcm.googleapis.com/fcm/send",
        {
          notification: {
            body: "You are a creator now.",
            title: "My Fans",
          },
          priority: "high",
          data: {
            // ...data,
            click_action: "FLUTTER_NOTIFICATION_CLICK",
            sound: "default",
          },
          to: `/topics/${id}_creator`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `key=${process.env.REACT_APP_FCM_KEY}`,
          },
        }
      );
      getDocs(
        query(collection(db, "users"), where("isCreator", "==", "pending"))
      ).then((snapshot) => {
        const list = snapshot.docs.map(async (doc) => {
          console.log(doc.id);
          let response = await getDocs(
            collection(db, `users/${doc.id}/creator`)
          );
          if (response.docs.length >= 1) {
            let creatorData = response.docs[0].data();
            console.log(creatorData);
            return { ...doc.data(), ...creatorData };
          }
        });
        Promise.all(list).then((data) => {
          console.log(data);
          if (data) {
            console.log(data);
            dispatch(setCreatorRequest(data));
          }
        });
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Something went wrong!");
      console.log(err);
    }
  };

  const rejectRequest = async (id, text) => {
    setLoading(true);

    try {
      setDoc(doc(db, "users", id), { isCreator: "rejected" }, { merge: true });
      axios.post(
        "https://fcm.googleapis.com/fcm/send",
        {
          notification: {
            body: text,
            title: "My Fans",
          },
          priority: "high",
          data: {
            // ...data,
            click_action: "FLUTTER_NOTIFICATION_CLICK",
            sound: "default",
          },
          to: `/topics/${id}_creator`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `key=${process.env.REACT_APP_FCM_KEY}`,
          },
        }
      );
      getDocs(
        query(collection(db, "users"), where("isCreator", "==", "pending"))
      ).then((snapshot) => {
        const list = snapshot.docs.map(async (doc) => {
          console.log(doc.id);
          let response = await getDocs(
            collection(db, `users/${doc.id}/creator`)
          );
          if (response.docs.length >= 1) {
            let creatorData = response.docs[0].data();
            console.log(creatorData);
            return { ...doc.data(), ...creatorData };
          }
        });
        Promise.all(list).then((data) => {
          console.log(data);
          if (data) {
            console.log(data);
            dispatch(setCreatorRequest(data));
          }
        });
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Something went wrong!");
      console.log(err);
    }
  };

  useEffect(() => {
    getDocs(
      query(collection(db, "users"), where("isCreator", "==", "pending"))
    ).then((snapshot) => {
      const list = snapshot.docs.map(async (doc) => {
        console.log(doc.id);
        let response = await getDocs(collection(db, `users/${doc.id}/creator`));
        if (response.docs.length >= 1) {
          let creatorData = response.docs[0].data();
          console.log(creatorData);
          return { ...doc.data(), ...creatorData };
        }
      });
      Promise.all(list).then((data) => {
        console.log(data);
        if (data) {
          console.log(data);
          dispatch(setCreatorRequest(data));
        }
      });
    });
  }, []);

  return (
    <Page title="User | User Details">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          {/* <Button
						variant="contained"
						component={RouterLink}
						to="#"
						startIcon={<Icon icon={plusFill} />}
					>
						New User
					</Button> */}
        </Stack>

        <Card sx={{ borderRadius: "5px" }}>
          <TableTitle title={t("Creator_Request")} />
          {/* <UserListToolbar
						numSelected={selected.length}
						filterName={filterName}
						onFilterName={handleFilterByName}
					/> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, p: "18px" }}>
              <Table>
                <TableHeader
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={creatorRequests.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => {
                      const {
                        uid,
                        displayName,
                        faceIdImg,
                        idCardImg,
                        name,
                        document,
                        // email,
                        // age,
                        // gender,
                        // country,
                        // language,
                        // urFansCounter,
                        // personalStatus,
                        // status,
                        // myFansCounter,
                        // photoURL,
                        // stars,
                      } = user;
                      const isItemSelected =
                        selected.indexOf(displayName) !== -1;
                      if (
                        user.displayName
                          .toLowerCase()
                          .indexOf(search.toLowerCase()) === -1
                      ) {
                        return null;
                      } else {
                        return (
                          <TableRow
                            hover
                            key={uid}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            {/* <TableCell padding="checkbox">
														<Checkbox
															checked={isItemSelected}
															onChange={(event) => handleClick(event, name)}
														/>
													</TableCell> */}
                            <TableCellStyles
                              // sx={{ border: "1px solid red" }}
                              align="left"
                            >
                              {index + 1}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {displayName}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {name}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {document}
                            </TableCellStyles>
                            {/* <TableCellStyles align="left">
                            <img
                              src={faceIdImg}
                              style={{ height: "80px", marginInline: "auto" }}
                              // alt=""
                            />
                            <ImgDialog faceIdImg={faceIdImg} />
                          </TableCellStyles> */}
                            <TableCellStyles>
                              <Typography
                                component={RouterLink}
                                state={faceIdImg}
                                to="/viewimage"
                                // size="small"
                                sx={{
                                  color: "info.main",
                                  textDecoration: "none",
                                }}
                              >
                                View
                              </Typography>
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              <Typography
                                component={RouterLink}
                                state={idCardImg}
                                to="/viewimage"
                                // size="small"
                                sx={{
                                  color: "info.main",
                                  textDecoration: "none",
                                }}
                              >
                                View
                              </Typography>
                            </TableCellStyles>
                            <TableCellStyles>
                              <Button
                                variant="contained"
                                onClick={() => acceptRequest(uid)}
                                sx={{ bgcolor: "success.main" }}
                              >
                                Accept
                              </Button>
                            </TableCellStyles>
                            <TableCellStyles>
                              <DenyDialog
                                rejectRequest={rejectRequest}
                                uid={uid}
                              />
                            </TableCellStyles>
                            <TableCellStyles>
                              <IconButton
                                component={RouterLink}
                                state={user}
                                to="/viewuser"
                                size="small"
                                sx={{ color: "info.main" }}
                              >
                                <Icon icon={eyeIcon} />
                              </IconButton>
                            </TableCellStyles>

                            {/*<TableCellStyles align="left">
                            {personalStatus}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            <Label
                              variant="ghost"
                              color={
                                (status === "offline" && "error") || "success"
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => rejectRequest(uid)}
                              sx={{
                                borderRadius: "6px",
                                boxShadow: "none",
                                backgroundColor: "#e74a3b",
                              }}
                            >
                              Reject
                            </Button>
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => acceptRequest(uid)}
                            >
                              Accept
                            </Button>
                          </TableCellStyles> */}
                            {/* <TableCellStyles align="left">
														<Button
															variant="contained"
															component={RouterLink}
															to="#"
														>
															Delete
														</Button>
													</TableCellStyles>
													<TableCell align="right">
														<UserMoreMenu />
													</TableCell> */}
                          </TableRow>
                        );
                      }
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCellStyles colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCellStyles
                        align="center"
                        colSpan={6}
                        sx={{ py: 3 }}
                      >
                        {/* searchQuery={filterName} */}
                        <SearchNotFound />
                      </TableCellStyles>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={creatorRequests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
      </Container>
      <Dialog open={loading} maxWidth={false}>
        <Grid
          container
          justifyContent="center"
          alingItems="center"
          sx={{ height: "200px", width: "200px", pt: "45%" }}
        >
          <Grid item>
            <RotateLoader color={theme.palette.primary.main} />
          </Grid>
        </Grid>
      </Dialog>
    </Page>
  );
}
