import { filter } from "lodash";
// import { Icon } from "@iconify/react";
// import { sentenceCase } from "change-case";
import { useState } from "react";
// import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Card,
  Table,
  // Stack,
  // Avatar,
  Button,
  // Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  // Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import Page from "../../components/Page";
// import Label from "../../components/Label";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import {
  TableTitle,
  TableHeader,
  // UserListToolbar,
  // UserMoreMenu,
} from "../../components/_dashboard/user";
//
import USERLIST from "../../_mocks_/AcceptRequest";
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

export default function UserList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  // const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10000000);
  const { t } = useTranslation();

  const TABLE_HEAD = [
    { id: "sno", label: "#", alignRight: false },
    { id: "username", label: t("User_Name"), alignRight: false },
    { id: "email", label: t("Email"), alignRight: false },
    { id: "amount", label: t("Amount"), alignRight: false },
    { id: "transactionid", label: t("Transaction_ID"), alignRight: false },
    { id: "action", label: t("Action"), alignRight: false },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
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

  return (
    <Page title="Money Request | Accept Request">
      <Container>
        {/* <Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						User
					</Typography>
					<Button
						variant="contained"
						component={RouterLink}
						to="#"
						startIcon={<Icon icon={plusFill} />}
					>
						New User
					</Button>
				</Stack> */}

        <Card sx={{ borderRadius: "5px" }}>
          <TableTitle title={t("Accept_Request")} />
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
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        // avatarUrl,
                        sno,
                        username,
                        email,
                        amount,
                        transactionid,
                      } = row;
                      const isItemSelected = selected.indexOf(username) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
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
                            {sno}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            {username}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            {email}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            {amount}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            {transactionid}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            <Button
                              variant="contained"
                              component={RouterLink}
                              to="#"
                              sx={{
                                borderRadius: "6px",
                                boxShadow: "none",
                                backgroundColor: "#1cc88a",
                              }}
                            >
                              {t("Paid")}
                            </Button>
                          </TableCellStyles>
                          {/* <TableCellStyles align="left">
														<Label
															variant="ghost"
															color={
																(status === "banned" && "error") || "success"
															}
														>
															{sentenceCase(gender)}
														</Label>
													</TableCellStyles>
													<TableCellStyles align="left">
														<Label
															variant="ghost"
															color={
																(status === "banned" && "error") || "success"
															}
														>
															{sentenceCase(status)}
														</Label>
													</TableCellStyles>
													<TableCellStyles align="left">
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
													</TableCellStyles>
													<TableCell align="right">
														<UserMoreMenu />
													</TableCell> */}
                        </TableRow>
                      );
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
						count={USERLIST.length}
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
