import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useState, useEffect, useContext } from "react";
import eyeIcon from "@iconify/icons-akar-icons/eye";
import bxsEdit from "@iconify/icons-bx/bxs-edit";
//import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  // Avatar,
  // Button,
  IconButton,
  // Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  TableTitle,
  TableHeader,
  // UserListToolbar,
  // UserMoreMenu,
} from "../components/_dashboard/user";
import { useSelector } from "react-redux";
import { SearchContext } from "../Context/searchContext";
import { useTranslation } from "react-i18next";

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
  const [search, setSearch] = useContext(SearchContext);
  // const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10000000);
  const { t } = useTranslation();

  const TABLE_HEAD = [
    { id: "sno", label: "S.no", alignRight: false },
    { id: "displayName", label: t("Name"), alignRight: false },
    { id: "email", label: t("Sign_Up_With"), alignRight: false },
    { id: "age", label: t("Age"), alignRight: false },
    { id: "gender", label: t("Gender"), alignRight: false },
    { id: "country", label: t("Country"), alignRight: false },
    { id: "language", label: t("Langauge"), alignRight: false },
    { id: "urFansCounter", label: t("Followers"), alignRight: false },
    { id: "following", label: t("Following"), alignRight: false },
    { id: "stars", label: t("Stars"), alignRight: false },
    { id: "personalStatus", label: "Personal Status", alignRight: false },
    { id: "status", label: t("Status"), alignRight: false },
    { id: "action", label: t("Action"), alignRight: false },
  ];

  // item.item.toLowerCase().indexOf(search.toLowerCase()) === -1
  // const useremail = getAuth();
  // console.log(useremail);
  const userList = useSelector((state) => state.user.data);
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
      const newSelecteds = userList.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(
    userList,
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
  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <Page title="User | User Details">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h3" sx={{ color: "info.main" }}>
            {t("Users")}
          </Typography>
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
          <TableTitle title={t("List_of_Users")} />
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
                  rowCount={userList.length}
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
                        email,
                        age,
                        gender,
                        country,
                        language,
                        urFansCounter,
                        personalStatus,
                        status,
                        myFansCounter,
                        photoURL,
                        stars,
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
                              {getLoginType(user)}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {age}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {gender}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {country}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {language}
                            </TableCellStyles>
                            <TableCellStyles>{urFansCounter}</TableCellStyles>
                            <TableCellStyles>
                              {myFansCounter || 0}
                            </TableCellStyles>
                            <TableCellStyles>{stars}</TableCellStyles>
                            <TableCellStyles align="left">
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
                              {/* <IconButton
                              component={RouterLink}
                              to="/dashboard/adduser"
                              aria-label="view"
                              size="small"
                              sx={{ color: "info.main" }}
                            >
                              <Icon icon={bxsEdit} />
                            </IconButton> */}
                              <IconButton
                                component={RouterLink}
                                to="/viewuser"
                                state={user}
                                aria-label="view"
                                size="small"
                                sx={{ color: "info.main" }}
                              >
                                <Icon icon={eyeIcon} />
                              </IconButton>
                            </TableCellStyles>
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
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
      </Container>
    </Page>
  );
}
