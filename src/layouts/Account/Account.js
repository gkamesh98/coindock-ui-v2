import React from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { blue, grey, purple, pink } from "@mui/material/colors";
import { useAccount } from "App/Api/accapi";
import { useNavigate } from "react-router-dom";
import "Shared/common-styles/button.css";
import { useLogout } from "App/Api/auth";
import "Shared/common-styles/common.css";
import { Settings } from "@mui/icons-material";
import { PersonOutlineTwoTone } from "@mui/icons-material";
import { AccountBoxSharp } from "@mui/icons-material";
// import { Card } from "react-bootstrap";
import { Card } from "@mui/material";
import { Avatar } from "@mui/material";
import { CardHeader } from "@mui/material";

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
      width: "10px",
      height: "50px",
    },
    card: {
      //  width: '450px',
      marginBottom: "15px",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
      },
    },
    cardheader: {
      marginLeft: "7px",
    },
  });
  const classes = useStyles();
  const accordianBasedAccountDetails = [
    {
      label: "Profile settings",
      key: "profile",
    },
    {
      label: "Account settings",
      key: "accounts",
    },
    {
      label: "System settings",
      key: "system",
    },
  ];

  const handleLogoutClick = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (e) {}
  };
  return (
    <div>
      {/* <h1 style={{marginTop:'5px',marginLeft:'42%'}}>Account</h1> */}
      <Typography
        style={{ textAlign: "center", fontWeight: "lighter", fontFamily: "monospace" }}
        variant="h3"
        component="div"
      >
        Account
        <ManageAccountsIcon style={{ width: "100px", height: "60px" }} />
      </Typography>

      <div className="container-11">
        <div className=" col py-5 ">
          {accordianBasedAccountDetails &&
            accordianBasedAccountDetails.map((item, id) => (
              <div key={id}>
                {item.key == "profile" ? (
                  <Card
                    elevation={0}
                    style={{ backgroundColor: grey[100], borderRadius: "20px" }}
                    className={classes.card}
                    type="submit"
                    //  className="bg-light mb-3"
                    onClick={() => {
                      handleCardProfile();
                    }}
                  >
                    <CardHeader
                      className={classes.cardheader}
                      titleTypographyProps={{
                        fontSize: 19,
                      }}
                      avatar={
                        <Avatar sx={{ bgcolor: pink[400] }}>
                          <PersonOutlineTwoTone />
                        </Avatar>
                      }
                      title={item.label}
                    />
                  </Card>
                ) : item.key == "accounts" ? (
                  <Card
                    elevation={0}
                    style={{ backgroundColor: grey[100], borderRadius: "20px" }}
                    className={classes.card}
                    type="submit"
                    onClick={() => handleCardAccount()}
                    //  className="bg-light mb-3"
                  >
                    <CardHeader
                      className={classes.cardheader}
                      titleTypographyProps={{
                        fontSize: 19,
                      }}
                      avatar={
                        <Avatar sx={{ bgcolor: grey[700] }} alt="Remy Sharp">
                          <AccountBoxSharp />
                        </Avatar>
                      }
                      title={item.label}
                    />
                  </Card>
                ) : item.key == "system" ? (
                  <Card
                    elevation={0}
                    style={{ backgroundColor: grey[100], borderRadius: "20px" }}
                    className={classes.card}
                    onClick={() => handleCardSystem()}
                    //  className="bg-light mb-3"
                    type="submit"
                  >
                    <CardHeader
                      className={classes.cardheader}
                      titleTypographyProps={{
                        fontSize: 19,
                      }}
                      avatar={
                        <Avatar alt="Remy Sharp" sx={{ bgcolor: purple[400] }}>
                          <Settings />
                        </Avatar>
                      }
                      title={item.label}
                    />
                  </Card>
                ) : null}
              </div>
            ))}
          <Button
            startIcon={<Logout />}
            style={{ marginTop: "10px" }}
            variant="contained"
            size="large"
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Account;
