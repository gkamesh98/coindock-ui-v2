import { useState, useEffect } from "react"; // react-router components
import { useLocation, Link } from "react-router-dom"; // prop-types is a library for typechecking of props.
import PropTypes from "prop-types"; // @material-ui core components
import { AppBar, Toolbar, IconButton, Menu, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput"; // Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles"; // Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import { openPopup } from "reducers/wallet";
import { useDispatch } from "react-redux";
import Addwallet from "shared/AddWallet";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();

  const dispatchAction = useDispatch();

  const [controller, dispatch] = useMaterialUIController();

  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode, openConfigurator } = controller;

  const [openMenu, setOpenMenu] = useState(false);

  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    } // A function that sets the transparent state of the navbar.

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar); // Call the handleTransparentNavbar function to set the state with the initial value.

    handleTransparentNavbar(); // Remove event listener on cleanup

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  const handleCloseMenu = () => setOpenMenu(false); // Render the notifications menu

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    ></Menu>
  ); // Styles for the navbar icons

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;
      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }
      return colorValue;
    },
  });

  return (
    <AppBar
      position={navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>

        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox>

            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                {console.log([miniSidenav, iconsStyle])}
                <Icon sx={iconsStyle} fontSize="medium">
                  menu
                </Icon>
              </IconButton>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={() => dispatchAction(openPopup())}
              >
                <Icon sx={iconsStyle}>add</Icon>
              </IconButton>

              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
      <Addwallet />
    </AppBar>
  );
} // Setting default values for the props of DashboardNavbar

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
}; // Typechecking props for the DashboardNavbar

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
