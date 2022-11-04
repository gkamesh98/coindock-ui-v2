import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { purple, pink, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useLogout } from "api/auth";
import {
  Settings,
  PersonOutlineTwoTone,
  AccountBoxSharp,
  Logout,
  FileDownload,
} from "@mui/icons-material";
import { Card, CardHeader, Avatar, CardContent } from "@mui/material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";

function Account() {
  const [logout] = useLogout();
  const navigate = useNavigate();

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
      margin: "35%",
    },

    card: {
      "&:hover": {
        backgroundColor: "#e1f5fe",
      },
      cursor: "pointer",
      minWidth: "250px",
      maxWidth: "500px",
      margin: "auto",
      marginTop: "30px",
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

  const fields = [
    {
      label: "Profile Settings",
      key: "profileSettings",
      avatar: <PersonOutlineTwoTone />,
      bgcolor: pink[500],
      navigate: "/profile-settings",
    },
    {
      label: "Account Settings",
      key: "accountSettings",
      avatar: <AccountBoxSharp />,
      bgcolor: red[500],
      navigate: "/account-settings",
    },
    {
      label: "System Settings",
      key: "systemSettings",
      avatar: <Settings />,
      bgcolor: purple[400],
      navigate: "/system-settings",
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {fields.map((field, id) => (
        <div key={id}>
          <Card className={classes.card} onClick={() => navigate(field.navigate)}>
            <CardHeader
              avatar={
                <Avatar className={classes.avatar} sx={{ bgcolor: field?.bgcolor }}>
                  {field.avatar}
                </Avatar>
              }
              titleTypographyProps={{ fontSize: "18px", fontWeight: 500 }}
              title={field.label}
            />
          </Card>
        </div>
      ))}
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
