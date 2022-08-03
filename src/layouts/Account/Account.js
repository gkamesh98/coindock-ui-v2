import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { purple, pink, red } from "@mui/material/colors";
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
      marginTop: "-6px",
      float: "end",
      width: "50px",
      height: "50px",
      marginLeft: "10px",
    },
    button: {
      alignItems: "center",
      color: "white",
      marginTop: "6%",
      width: "150px",
    },

    card: {
      "&:hover": {
        backgroundColor: "#e1f5fe",
      },
      backgroundColor: "white",
      cursor: "pointer",
      display: "flex",
      marginTop: "3%",
      margin: "auto",
      width: "auto",
      height: "70px",
      marginBottom: "20px",
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
        elevation={7}
        sx={{ maxWidth: 450 }}
      >
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} sx={{ bgcolor: pink[500] }}>
              <PersonOutlineTwoTone />
            </Avatar>
          }
          titleTypographyProps={{ fontSize: "18px" }}
          title="Profile Settings"
        />
      </Card>
      <Card
        onClick={() => handleCardAccount()}
        className={classes.card}
        elevation={7}
        sx={{ maxWidth: 450 }}
      >
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} sx={{ bgcolor: red[500] }}>
              <AccountBoxSharp />
            </Avatar>
          }
          titleTypographyProps={{ fontSize: "18px" }}
          title="Account Settings"
        />
      </Card>
      <Card
        onClick={() => handleCardSystem()}
        elevation={7}
        className={classes.card}
        sx={{ maxWidth: 450 }}
      >
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} sx={{ bgcolor: purple[400] }}>
              <Settings />
            </Avatar>
          }
          titleTypographyProps={{ fontSize: "18px" }}
          title="System Settings"
        />
        <Button
          className={classes.button}
          startIcon={<Logout />}
          variant="contained"
          size="large"
          onClick={handleLogoutClick}
        >
          Logout
        </Button>
      </Card>
    </DashboardLayout>
  );
}
export default Account;
