import React from "react";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAccount } from "api/accapi";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
function ProfileSettings() {
  const { data: account, isLoading } = useAccount();
  const accountDetails = account?.user || {};

  const navigate = useNavigate();
  const useStyles = makeStyles({
    card: {
      cursor: "pointer",
      minWidth: "300px",
      maxWidth: "550px",
      margin: "auto",
      marginTop: "30px",
      height: "70px",
      marginBottom: "20px",
    },
    cardcontent: {
      marginTop: "10px",
    },
  });
  const classes = useStyles();
  const fields = [
    {
      label: "Name",
      fieldKey: "name",
      navigate: "/profile-name",
    },
    {
      label: "Date-of-Birth",
      fieldKey: "dateofbirth",
      navigate: "/profile-date-of-birth",
    },
    {
      label: "Country",
      fieldKey: "country",
      navigate: "/profile-country",
    },
  ];

  const date = moment(accountDetails.dateOfBirth).format("DD-MM-YYYY");

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {isLoading ? (
        <Box display="flex" widht={1} justifyContent="center">
          <CircularProgress style={{ color: "blue" }} />
        </Box>
      ) : (
        fields.map((field, id) => (
          <div key={id}>
            {field.navigate ? (
              <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                  <MDTypography style={{ fontSize: "18px" }}>
                    {field.label} :{" "}
                    {field.fieldKey == "name"
                      ? accountDetails.firstName + " " + accountDetails.lastName
                      : field.fieldKey == "dateofbirth"
                      ? date
                      : field.fieldKey == "country"
                      ? accountDetails.country
                      : null}
                    <span
                      style={{ float: "right" }}
                      type="submit"
                      onClick={() => {
                        navigate(field.navigate);
                      }}
                    >
                      <ModeEditIcon />
                    </span>
                  </MDTypography>
                </CardContent>
              </Card>
            ) : null}
          </div>
        ))
      )}
    </DashboardLayout>
  );
}
export default ProfileSettings;
