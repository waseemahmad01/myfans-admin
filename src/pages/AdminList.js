import { filter } from "lodash";
// import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import eyeIcon from "@iconify/icons-akar-icons/eye";
import bxsEdit from "@iconify/icons-bx/bxs-edit";
// import plusFill from "@iconify/icons-eva/plus-fill";
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
  Dialog,
  Grid,
  useTheme,
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
import { useSelector, useDispatch } from "react-redux";
import { cloudStorage, db, getData } from "src/database/db";
import { ref, deleteObject } from "firebase/storage";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { setAdmins } from "src/store";
import { SearchContext } from "src/Context/searchContext";
import { getAuth, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import { AuthContext } from "src/Context/authContext";
import { RotateLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

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
  // console.log(array);
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

export default function AdminList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const { t } = useTranslation();

  const TABLE_HEAD = [
    { id: "sno", label: "S.no", alignRight: false },
    { id: "name", label: t("Name"), alignRight: false },
    { id: "emailaddress", label: t("Email_address"), alignRight: false },
    { id: "phoneno", label: t("Phone_no"), alignRight: false },
    { id: "gender", label: t("Gender"), alignRight: false },
    { id: "status", label: t("Status"), alignRight: false },
    { id: "action", label: t("Action"), alignRight: false },
    { id: "action1", label: "", alignRight: false },
  ];

  const TABLE_HEAD2 = [
    { id: "sno", label: "S.no", alignRight: false },
    { id: "name", label: t("Name"), alignRight: false },
    { id: "emailaddress", label: t("Email_address"), alignRight: false },
    { id: "phoneno", label: t("Phone_no"), alignRight: false },
    { id: "gender", label: t("Gender"), alignRight: false },
    { id: "status", label: t("Status"), alignRight: false },
  ];

  // const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10000000);
  const [search, setSearch] = useContext(SearchContext);
  let admins = useSelector((state) => state.admin.data);
  const currentAdmin = useSelector((state) => state.adminData.data);
  admins = admins.filter((e) => e.email !== currentAdmin.email);
  const [loginUser, setLoginUser] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  // console.log(admins);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = admins.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - admins.length) : 0;

  const filteredUsers = applySortFilter(
    admins,
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

  const handleDeleteAdmin = async (id, fileName, email, password) => {
    setLoading(true);
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    const currentUser = auth.currentUser;
    await deleteUser(currentUser);
    let user = await getDoc(doc(db, "admin", loginUser.userId));
    user = user.data();
    await signInWithEmailAndPassword(auth, user.email, user.password);
    const photoRef = ref(cloudStorage, fileName);
    await deleteObject(photoRef);
    await deleteDoc(doc(db, "admin", id));
    const data = await getData("admin");
    dispatch(setAdmins(data));
    setLoading(false);
  };

  return (
    <Page title="User | Admin Details">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h3" sx={{ color: "primary.TableTitleBarTitle" }}>
            {t("Admin")}
          </Typography>
          {/* <Button
						variant="contained"
						component={RouterLink}
						to="/dashboard/addadmin"
						startIcon={<Icon icon={plusFill} />}
					>
						New Admin
					</Button> */}
        </Stack>

        <Card sx={{ borderRadius: "5px" }}>
          <TableTitle title={t("List_of_Admin")} />
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
                  headLabel={
                    currentAdmin.type === "Super Admin"
                      ? TABLE_HEAD
                      : TABLE_HEAD2
                  }
                  rowCount={admins.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const {
                        uid,
                        name,
                        email,
                        phone,
                        status,
                        type,
                        gender,
                        photoUrl,
                        password,
                      } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;
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
                              {name}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {email}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {phone}
                            </TableCellStyles>
                            {/* <TableCellStyles align="left">
                              {followers}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {following}
                            </TableCellStyles>  */}
                            <TableCellStyles align="left">
                              {/* <Label
															variant="ghost"
															color={
																(status === "banned" && "error") || "success"
															}
														>
															{sentenceCase(gender)}
														</Label> */}
                              {gender}
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
                            </TableCellStyles>
                            {currentAdmin.type === "Super Admin" && (
                              <>
                                <TableCellStyles align="left">
                                  <IconButton
                                    component={RouterLink}
                                    to="/updateadmin"
                                    state={{
                                      uid,
                                      name,
                                      email,
                                      phone,
                                      status,
                                      type,
                                      gender,
                                      password,
                                      image: photoUrl,
                                    }}
                                    aria-label="view"
                                    size="small"
                                    sx={{ color: "info.main" }}
                                  >
                                    <Icon icon={bxsEdit} />
                                  </IconButton>
                                </TableCellStyles>
                                <TableCellStyles align="left">
                                  <IconButton
                                    // component={RouterLink}
                                    onClick={() =>
                                      handleDeleteAdmin(
                                        uid,
                                        photoUrl.filename,
                                        email,
                                        password
                                      )
                                    }
                                    aria-label="view"
                                    size="small"
                                    sx={{ color: "info.main" }}
                                  >
                                    <Icon icon="ic:round-delete" />
                                  </IconButton>
                                </TableCellStyles>
                              </>
                            )}

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
                            {/* <TableCell align="right">
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
            count={admins.length}
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
