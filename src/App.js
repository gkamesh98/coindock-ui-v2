import { useState, useEffect } from "react"; // react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon"; // Material Dashboard 2 React components
import MDBox from "components/MDBox"; // Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator"; // Material Dashboard 2 React themes
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import { publicRoutes, loggedroutes } from "routes"; // Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context"; // Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { useIsAuthenticated, useFetchAuthRefresh } from "hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";

const getRoutes = (allRoutes) =>
  allRoutes.map((route) => {
    if (route.collapse) {
      return getRoutes(route.collapse);
    }
    if (route.route) {
      return <Route exact path={route.route} element={route.component} key={route.key} />;
    }
    return null;
  });

export default function App() {
  const authenticated = useIsAuthenticated();
  const ready = useFetchAuthRefresh();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation(); // Cache for the rtl

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  }; // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  }; // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator); // Setting the dir attribute for the body element
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );
  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {!ready ? (
        <CircularProgress />
      ) : (
        layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="CoinDock 2"
              routes={loggedroutes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )
      )}
      {layout === "vr" && <Configurator />}
      {authenticated ? (
        <Routes>
          {getRoutes(loggedroutes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        <Routes>
          {getRoutes(publicRoutes)}
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}
