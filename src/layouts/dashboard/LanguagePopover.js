import { useRef, useState } from "react";
// material
import { alpha } from "@mui/material/styles";
import {
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
} from "@mui/material";
// components
import MenuPopover from "../../components/MenuPopover";
import { Icon } from "@iconify/react";
import sharpLanguage from "@iconify/icons-ic/sharp-language";
import i18next from "i18next";

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: "en",
    label: "English",
    icon: "/static/icons/ic_flag_en.svg",
  },
  {
    value: "es",
    label: "Spanish",
    icon: "/static/icons/spain.svg",
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Icon
          icon={sharpLanguage}
          style={{ color: theme.palette.primary.main }}
        />
        {/* <img src={LANGS[0].icon} alt={LANGS[0].label} /> */}
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
      >
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => {
                i18next.changeLanguage(option.value);
                handleClose();
              }}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box
                  component="img"
                  sx={{ width: "30px" }}
                  alt={option.label}
                  src={option.icon}
                />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "body2" }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
