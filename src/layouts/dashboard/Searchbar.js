import { Icon } from "@iconify/react";
import { useContext } from "react";
import searchFill from "@iconify/icons-eva/search-fill";
import { styled } from "@mui/material/styles";
import { Input, Grid, IconButton } from "@mui/material";
import { SearchContext } from "src/Context/searchContext";
import { useTranslation } from "react-i18next";
const SearchBox = styled((props) => <Grid {...props} />)(({ theme }) => ({
  background: "#f8f9fc",
  borderRadius: "5px",
  overflow: "hidden",
  width: "450px",
  [theme.breakpoints.down("md")]: {
    width: "250px",
  },
}));
const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  // backgroundColor:theme.palette.primary.searchIconColor,
  background: theme.palette.primary.searchIconColor,
  color: theme.palette.common.white,
  height: "40px",
  width: "40px",
  borderRadius: "0px",
  "&:hover": {
    background: theme.palette.primary.searchIconColorhover,
  },
}));
// ----------------------------------------------------------------------

export default function Searchbar() {
  const { t } = useTranslation();
  const [search, setSearch] = useContext(SearchContext);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    // <ClickAwayListener >
    <div>
      <SearchBox container>
        <Input
          autoFocus
          disableUnderline
          onChange={handleChange}
          value={search}
          placeholder={t("Search...")}
          sx={{
            paddingLeft: "10px",
            fontSize: "14px",
            flexGrow: "1",
            width: "auto",
          }}
        />
        <IconButtonStyled>
          <Icon icon={searchFill} width={20} height={20} />
        </IconButtonStyled>
      </SearchBox>
      {/* <Button variant="contained" onClick={handleClose}>
              Search
            </Button> */}
      {/* <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
           
          </SearchbarStyle>
        </Slide> */}
    </div>
    // </ClickAwayListener>
  );
}
