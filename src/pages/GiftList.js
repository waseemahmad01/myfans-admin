import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useState, useContext } from "react";
import trashIcon from "@iconify/icons-fe/trash";
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
import { db, cloudStorage, getData } from "src/database/db";
import { ref, deleteObject } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setGifts } from "src/store";
import { SearchContext } from "src/Context/searchContext";
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
  const [orderBy, setOrderBy] = useState("type");
  const [search, setSearch] = useContext(SearchContext);
  const [rowsPerPage, setRowsPerPage] = useState(10000000);
  const dispatch = useDispatch();
  const gifts = useSelector((state) => state.gifts.data);
  const { t } = useTranslation();

  const TABLE_HEAD = [
    { id: "sno", label: "S.no", alignRight: false },
    { id: "name", label: t("Name"), alignRight: false },
    { id: "type", label: t("Type"), alignRight: false },
    { id: "points", label: t("Points"), alignRight: false },
    { id: "image", label: t("Image"), alignCenter: true },
    { id: "status", label: t("Status"), alignRight: false },
    { id: "action", label: t("Action"), alignRight: false },
    { id: "delete", label: t("Delete"), alignRight: false },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = gifts.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - gifts.length) : 0;

  const filteredUsers = applySortFilter(
    gifts,
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

  const handleDelete = async (id, filename) => {
    const photoRef = ref(cloudStorage, `gifts/${filename}`);
    await deleteObject(photoRef);
    await deleteDoc(doc(db, "gifts", id));
    // const data = await getData("gifts");
    // dispatch(setGifts(data));
  };

  return (
    <Page title="Gifts | Gifts Details">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h3" sx={{ color: "info.main" }}>
            {t("Gifts")}
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
          <TableTitle title={t("List_of_Gifts")} />
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
                  rowCount={gifts.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((gift, index) => {
                      const {
                        id,
                        name,
                        type,
                        points,
                        imageUrl,
                        imageFilename,
                        active,
                      } = gift;
                      const isItemSelected = selected.indexOf(name) !== -1;
                      if (
                        gift.name
                          .toLowerCase()
                          .indexOf(search.toLowerCase()) === -1
                      ) {
                        return null;
                      } else {
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
                              {name}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {type}
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              {points}
                            </TableCellStyles>
                            <TableCellStyles align="center">
                              <img
                                src={imageUrl}
                                style={{ height: "50px", marginInline: "auto" }}
                                alt=""
                              />
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              <Label
                                variant="ghost"
                                color={
                                  (active === "Blocked" && "error") || "success"
                                }
                              >
                                {active}
                              </Label>
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              <IconButton
                                component={RouterLink}
                                to="/updategift"
                                state={gift}
                                aria-label="view"
                                size="small"
                                sx={{ color: "info.main" }}
                              >
                                <Icon icon={bxsEdit} />
                              </IconButton>
                            </TableCellStyles>
                            <TableCellStyles align="left">
                              <IconButton
                                aria-label="view"
                                size="small"
                                sx={{ color: "info.main" }}
                                onClick={() =>
                                  handleDelete(gift.uid, imageFilename)
                                }
                              >
                                <Icon icon={trashIcon} />
                              </IconButton>
                            </TableCellStyles>
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
            count={gifts.length}
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
