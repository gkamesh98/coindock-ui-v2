import React from "react";
import { makeStyles } from "@mui/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAccount } from "api/accapi";
import { FaEdit } from "react-icons/fa";
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
    },
    {
      label: "Secondary currency",
      fieldKey: "secondarycurrency",
    },
  ];
  const handlePrimary = () => {
    navigate("/primary");
  };
  const handleSecondary = () => {
    navigate("/secondary");
  };

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
            {field.fieldKey === "primarycurrency" ? (
              <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                  <MDTypography style={{ fontSize: "18px" }}>
                    {field.label} :{" "}
                    {`${accountDetails.primaryCurrency} ${accountDetails.primaryCurrencySymbol}`}
                    <span
                      style={{ float: "right" }}
                      type="submit"
                      onClick={() => {
                        handlePrimary();
                      }}
                    >
                      <FaEdit />
                    </span>
                  </MDTypography>
                </CardContent>
              </Card>
            ) : field.fieldKey === "secondarycurrency" ? (
              <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                  <MDTypography style={{ fontSize: "18px" }}>
                    {" "}
                    {field.label} :
                    <span
                      style={{ float: "right" }}
                      type="submit"
                      onClick={() => {
                        handleSecondary();
                      }}
                    >
                      <FaEdit />
                    </span>{" "}
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
