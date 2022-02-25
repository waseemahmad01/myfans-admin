import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useState, useContext } from "react";
//import plusFill from "@iconify/icons-eva/plus-fill";
import eyeIcon from "@iconify/icons-akar-icons/eye";
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
//
// import CreatorsListData from "../_mocks_/CreatorsList";
import { useSelector } from "react-redux";
import { SearchContext } from "../Context/searchContext";
import { db } from "src/database/db";
import { getDocs, collection, where, query } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setCreators } from "src/store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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

export default function CreatorsList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("displayName");
  const { t } = useTranslation();

  const TABLE_HEAD = [
    { id: "sno", label: "S.no", alignRight: false },
    { id: "name", label: t("Name"), alignRight: false },
    { id: "userdetails", label: t("User_Details"), alignRight: false },
    { id: "terms", label: t("Terms"), alignRight: false },
    { id: "action", label: t("Action"), alignRight: false },
  ];

  // const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10000000);
  const [search, setSearch] = useContext(SearchContext);
  const creators = useSelector((state) => state.creator.data);
  const dispatch = useDispatch();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = creators.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  // const handleClick = (event, name) => {
  // 	const selectedIndex = selected.indexOf(name);
  // 	let newSelected = [];
  // 	if (selectedIndex === -1) {
  // 		newSelected = newSelected.concat(selected, name);
  // 	} else if (selectedIndex === 0) {
  // 		newSelected = newSelected.concat(selected.slice(1));
  // 	} else if (selectedIndex === selected.length - 1) {
  // 		newSelected = newSelected.concat(selected.slice(0, -1));
  // 	} else if (selectedIndex > 0) {
  // 		newSelected = newSelected.concat(
  // 			selected.slice(0, selectedIndex),
  // 			selected.slice(selectedIndex + 1)
  // 		);
  // 	}
  // 	setSelected(newSelected);
  // };

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - creators.length) : 0;

  const filteredUsers = applySortFilter(
    creators,
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
  const a = "Accept";
  useEffect(() => {
    getDocs(
      query(collection(db, "users"), where("isCreator", "==", "true"))
    ).then((snapshot) => {
      const list = snapshot.docs.map(async (doc) => {
        try {
          let response = await getDocs(
            collection(db, `users/${doc.id}/creator`)
          );
          let creatorData = response.docs[0].data();
          return { ...doc.data(), ...creatorData };
        } catch (err) {
          console.log(err);
        }
      });
      Promise.all(list).then((data) => {
        dispatch(setCreators(data));
      });
    });
  }, []);
  return (
    <Page title="Creator | Creator Details">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h3" sx={{ color: "info.main" }}>
            {t("Creators")}
          </Typography>
          {/* <Button
						variant="contained"
						component={RouterLink}
						to="#"
						startIcon={<Icon icon={plusFill} />}
					>
						New Creator
					</Button> */}
        </Stack>

        <Card sx={{ borderRadius: "5px" }}>
          <TableTitle title={t("List_of_Creators")} />
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
                  rowCount={creators.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const { uid, displayName, name, terms_condition } = row;
                      const isItemSelected =
                        selected.indexOf(displayName) !== -1;
                      if (
                        row.name.toLowerCase().indexOf(search.toLowerCase()) ===
                        -1
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
                            <TableCellStyles align="left">
                              {index + 1}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {name}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {displayName}
                              <br />
                              {getLoginType(row)}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              <Label
                                variant="ghost"
                                color={terms_condition ? "success" : "error"}
                              >
                                {terms_condition ? "Accepted" : "No-accepted"}
                              </Label>
                            </TableCellStyles>
                            {/* <TableCellStyles align="left">
                            {gender}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            {country}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            {language}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            {urFansCounter}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            {myFansCounter || 0}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            {stars}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            {personalStatus}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            <Label
                              variant="ghost"
                              color={
                                (status === "Blocked" && "error") || "success"
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCellStyles> */}
                            <TableCellStyles align="left">
                              <IconButton
                                component={RouterLink}
                                to="/viewuser"
                                state={row}
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
                              Edit
                            </Button>
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            <Button
                              variant="contained"
                              component={RouterLink}
                              to="#"
                            >
                              Delete
                            </Button>
                          </TableCellStyles> */}
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
            count={creators.length}
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
