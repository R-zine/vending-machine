import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useStore } from "../store";

export const Header = () => {
  const isMobile = useStore((state) => state.appWidth < 855);
  const toggleMobileMenu = useStore((state) => state.toggleMenuOpen);

  return (
    <Box
      sx={{
        flexGrow: 1,
        minWidth: "100vw",
        position: "fixed",
        top: 0,
        zIndex: 1000,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vending Machine
          </Typography>
          {isMobile && (
            <IconButton
              onClick={() => toggleMobileMenu()}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
