import { useState, useEffect } from "react"; // react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon"; // Material Dashboard 2 React components
import MDBox from "components/MDBox"; // Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import { publicRoutes, loggedroutes } from "routes"; // Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context"; // Images

import { useIsAuthenticated, useFetchAuthRefresh } from "hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import AddWallet from "layouts/add-wallet";

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
    // transparentSidenav,
    // whiteSidenav,
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

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {!ready ? (
        <Box display="flex" widht={1} justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="CoinDock 2"
              routes={loggedroutes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </>
        )
      )}
      {ready &&
        (authenticated ? (
          <Routes>
            {getRoutes(loggedroutes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path="/account" element={<Navigate to="/account" />} />
          </Routes>
        ) : (
          <Routes>
            {getRoutes(publicRoutes)}
            <Route path="*" element={<Navigate to="/sign-in" />} />
            <Route path="/addwallet" element={<Navigate to="/addwallet" />} />
          </Routes>
        ))}
    </ThemeProvider>
  );
}
