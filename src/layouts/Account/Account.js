import React from "react";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import MDTypography from "components/MDTypography";
import { makeStyles } from '@mui/styles';
import { blue, grey, purple, pink } from "@mui/material/colors";
import { useAccount } from "api/accapi";
import { useNavigate } from "react-router-dom";
import { useLogout } from "api/auth";
import { Settings } from "@mui/icons-material";
import { PersonOutlineTwoTone } from "@mui/icons-material";
import { AccountBoxSharp } from "@mui/icons-material";
// import { Card } from "react-bootstrap";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Avatar } from "@mui/material";
import { CardHeader } from "@mui/material";
function Account() {
  const { data: account } = useAccount();
  const accountDetails = account?.data?.results?.user || {};
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
      width: "450px",
      marginBottom: "20px",
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
      <MDTypography style={{ textAlign: "center" }} variant="h3" component="div">
        Account
      </MDTypography>
      <div className="container-11">
        <div className=" col py-5 ">
          {accordianBasedAccountDetails &&
            accordianBasedAccountDetails.map((item, id) => (
              <div key={id}>
                {item.key == "profile" ? (
                  <Card
                    elevation={3}
                    style={{ backgroundColor: blue[50], marginBottom: "40px" }}
                    //  className={classes.card}
                    type="submit"
                    className="bg-light mb-3"
                    onClick={() => {
                      handleCardProfile();
                    }}
                  >
                    <CardHeader
                      className={classes.cardheader}
                      titleMDTypographyProps={{
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
                    elevation={3}
                    style={{ backgroundColor: blue[50] }}
                    //  className={classes.card}
                    type="submit"
                    onClick={() => handleCardAccount()}
                    className="bg-light mb-3"
                  >
                    <CardHeader
                      className={classes.cardheader}
                      titleMDTypographyProps={{
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
                    elevation={3}
                    style={{ backgroundColor: blue[50] }}
                    //  className={classes.card}
                    onClick={() => handleCardSystem()}
                    className="bg-light mb-3"
                    type="submit"
                  >
                    <CardHeader
                      className={classes.cardheader}
                      titleMDTypographyProps={{
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
