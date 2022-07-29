import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { blue, grey, purple, pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useLogout } from "api/auth";
import { Settings } from "@mui/icons-material";
import { PersonOutlineTwoTone } from "@mui/icons-material";
import { AccountBoxSharp } from "@mui/icons-material";
import MDTypography from "components/MDTypography";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Avatar } from "@mui/material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Account() {
  // const { data: account } = useAccount();
  // const accountDetails = account?.data?.results?.user || {};
  const [logout] = useLogout();
  const navigate = useNavigate();
  const handleCardProfile = () => {
    navigate("/profile-settings");
  };
  const handleCardAccount = () => {
    navigate("/account-settings");
  };
  const handleCardSystem = () => {
    navigate("/system-settings");
  };
  const useStyles = makeStyles({
    avatar: {
      // marginTop: "20px",
      marginRight: "18rem",

      width: "50px",
      height: "50px",
    },
    button: {
      alignItems: "center",
      color: "white",
      marginTop: "4%",
      marginLeft: "28%",
    },
    headings: {
      marginLeft: "30%",
      alignItems: "center",
      // marginTop: "25px",
    },
    card: {
      alignItems: "center",
      margin: "auto",
      marginTop: "30px",
      width: "auto",
      height: "70px",
      marginBottom: "20px",
    },
    cardheader: {
      marginLeft: "7px",
    },
  });
  const classes = useStyles();

  const handleLogoutClick = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (e) {}
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card
        onClick={() => {
          handleCardProfile();
        }}
        type="submit"
        className={classes.card}
        sx={{ maxWidth: 450 }}
      >
        <CardContent>
          <Avatar
            sx={{ bgcolor: pink[400], marginRight: "15rem", marginTop: "4px" }}
            lg={{ marginRight: "25rem", marginTop: "4px" }}
          >
            <PersonOutlineTwoTone />
          </Avatar>
          <MDTypography className={classes.headings} variant="h5" color="text.secondary">
            Profile settings
          </MDTypography>
        </CardContent>
      </Card>
      <Card
        onClick={() => handleCardAccount()}
        type="submit"
        className={classes.card}
        sx={{ maxWidth: 450 }}
      >
        <CardContent>
          <Avatar className={classes.avatar} sx={{ bgcolor: grey[700] }} alt="Remy Sharp">
            <AccountBoxSharp />
          </Avatar>
          <MDTypography className={classes.headings} variant="h5" color="text.secondary">
            Account settings
          </MDTypography>
        </CardContent>
      </Card>
      <Card
        onClick={() => handleCardSystem()}
        type="submit"
        className={classes.card}
        sx={{ maxWidth: 450 }}
      >
        <CardContent>
          <Avatar className={classes.avatar} alt="Remy Sharp" sx={{ bgcolor: purple[400] }}>
            <Settings />
          </Avatar>
          <MDTypography className={classes.headings} variant="h5" color="text.primary">
            System settings
          </MDTypography>
        </CardContent>
      </Card>
      <Button
        className={classes.button}
        startIcon={<Logout />}
        variant="contained"
        size="large"
        onClick={handleLogoutClick}
      >
        Logout
      </Button>
    </DashboardLayout>
  );
}
export default Account;
