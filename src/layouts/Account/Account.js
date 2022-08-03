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
import { Card, CardHeader } from "@mui/material";
import { Avatar } from "@mui/material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Account() {
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
      marginTop: "10px",
      width: "55px",
      height: "55px",
    },
    button: {
      alignItems: "center",
      color: "white",
      marginTop: "4%",
      marginLeft: "28%",
    },

    card: {
      alignItems: "center",
      margin: "auto",
      width: "auto",
      height: "70px",
      marginBottom: "20px",
    },
    cardheader: {
      justifyContent: "space-between",
      color: "black",
      marginRight: "25%",
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
        className={classes.card}
        sx={{ maxWidth: 450 }}
      >
        <CardHeader
          className={classes.cardheader}
          avatar={
            <Avatar sx={{ bgcolor: pink[700] }}>
              <PersonOutlineTwoTone />
            </Avatar>
          }
          title="Profile Settings"
        />
      </Card>
      <Card onClick={() => handleCardAccount()} className={classes.card} sx={{ maxWidth: 450 }}>
        <CardHeader
          className={classes.cardheader}
          avatar={
            <Avatar sx={{ bgcolor: grey[700] }}>
              <AccountBoxSharp />
            </Avatar>
          }
          title="Account Settings"
        />
      </Card>
      <Card onClick={() => handleCardSystem()} className={classes.card} sx={{ maxWidth: 450 }}>
        <CardHeader
          className={classes.cardheader}
          avatar={
            <Avatar sx={{ bgcolor: purple[400] }}>
              <Settings />
            </Avatar>
          }
          title="System Settings"
        />
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
