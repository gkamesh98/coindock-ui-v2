import React from "react";
import { makeStyles } from "@mui/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAccount } from "api/accapi";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function SystemSettings() {
  const { data: account, isLoading } = useAccount();
  const accountDetails = account?.user || {};

  const navigate = useNavigate();
  const useStyles = makeStyles({
    card: {
      cursor: "pointer",
      minWidth: "250px",
      maxWidth: "500px",
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
      label: "Primary currency",
      fieldKey: "primarycurrency",
      navigate: "/primary",
    },
    {
      label: "Secondary currency",
      fieldKey: "secondarycurrency",
      navigate: "/secondary",
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
                <CardContent className={classes.cardcontent}>
                  <MDTypography style={{ fontSize: "18px" }}>
                    {field.label} :{" "}
                    {field.fieldKey === "primarycurrency"
                      ? accountDetails.primaryCurrency + " " + accountDetails.primaryCurrencySymbol
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
export default SystemSettings;
