import React from "react";
import { makeStyles } from "@mui/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAccount } from "api/accapi";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CircularProgress, Box } from "@mui/material";

function SystemSettings() {
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
      marginBottom: "20px",
      padding: "10px",
    },
  });

  const classes = useStyles();
  const fields = [
    {
      label: "Primary Currency",
      navigate: "/primary",
      value: accountDetails.primaryCurrency + " " + accountDetails.primaryCurrencySymbol,
    },
    {
      label: "Secondary Currency",
      navigate: "/secondary",
      value: accountDetails.secondaryCurrency + " " + accountDetails.secondaryCurrencySymbol,
    },
  ];

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
                <CardContent>
                  <MDTypography>
                    <span style={{ fontSize: "18px", fontWeight: 500 }}>{field.label}</span>
                    <br></br>
                    <span style={{ fontWeight: 300 }}> {field.value} </span>
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
export default SystemSettings;
