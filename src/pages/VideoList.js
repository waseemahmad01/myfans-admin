import { filter } from "lodash";
import { Icon } from "@iconify/react";
// import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import eyeIcon from "@iconify/icons-akar-icons/eye";
// import bxsEdit from "@iconify/icons-bx/bxs-edit";
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
// import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  TableTitle,
  TableHeader,
  // UserListToolbar,
  // UserMoreMenu,
} from "../components/_dashboard/user";
//
import USERLIST from "../_mocks_/VideoList";
import { useSelector } from "react-redux";
import { db } from "src/database/db";
import { getDocs, collection } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setVideos } from "src/store";
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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const videos = useSelector((state) => state.videos.data);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const TABLE_HEAD = [
    { id: "sno", label: "S.no", alignRight: false },
    { id: "videofile", label: t("Uploaded_By"), alignRight: false },
    { id: "totalcomments", label: t("Type"), alignRight: false },
    { id: "totallike", label: t("Price"), alignRight: false },
    { id: "videoview", label: t("Video_View"), alignRight: false },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = videos.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - videos.length) : 0;

  const filteredUsers = applySortFilter(
    videos,
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
    getDocs(collection(db, "users")).then((snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      dispatch(setVideos(list));
    });
  }, []);

  return (
    <Page title="Videos | Videos Details">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h3" sx={{ color: "info.main" }}>
            {t("Videos")}
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
          <TableTitle title={t("List_of_Videos")} />
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
                  rowCount={videos.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data, index) => {
                      const {
                        id,
                        sno,
                        video,
                        totalcomments,
                        totallike,
                        // videoview,
                        videotype,
                        displayName,
                      } = data;
                      const isItemSelected =
                        selected.indexOf(video.video) !== -1;

                      return (
                        <TableRow
                          hover
                          key={index}
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
                            {video.lock === "true" ? "Lock" : "Public"}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            {video.price === "0" ? "Free" : video.price}
                          </TableCellStyles>
                          <TableCellStyles align="left">
                            <IconButton
                              component={RouterLink}
                              to="/viewvideo"
                              state={data}
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={videos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
