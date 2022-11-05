import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton"; // Authentication layout components
import { Box, Card, CardContent, CardHeader, Checkbox, CircularProgress } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import RecoveryBox from "shared/RecoveryBox";
import { usePostRecoveryCodesQuery } from "api/recoveryCodes";
import { useNavigate } from "react-router-dom";
import DownloadRecoverykeys from "shared/Form/DownloadRecoverykeys";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { makeStyles } from "@mui/styles";

function RecoveryCodes() {
  const [checked, setChecked] = useState(false);
  const handleChecked = () => setChecked(!checked);

  const navigate = useNavigate();

  const { data = [], isLoading } = usePostRecoveryCodesQuery();

  const useStyles = makeStyles({
    button: {
      height: "15px",
      marginLeft: "20px",
      marginBottom: "20px",
    },

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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoading ? (
        <Box display="flex" width={0.5} justifyContent="center">
          <CircularProgress style={{ color: "blue" }} />
        </Box>
      ) : (
        <Card className={classes.card}>
          <CardHeader title="Please note down the below recovery words in the same order and keep it securely" />
          <CardContent>
            <MDBox display="grid">
              <Box sx={1} mt={5} ml={4}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {data.map((value, number) => (
                    <Grid item xs={2} sm={4} md={4} key={number}>
                      <RecoveryBox key={number} index={number + 1} code={value} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </MDBox>

            <MDBox mt={4} mb={2} textAlign="center">
              <DownloadRecoverykeys />
            </MDBox>

            <MDBox mt={1} mx={4.3} p={3} mb={1}>
              <Checkbox checked={checked} onChange={handleChecked} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                onClick={handleChecked}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Yes, I noted down the recovery words securely
              </MDTypography>
            </MDBox>
            <MDBox mt={1} mx={7} mb={4} textAlign="right">
              <MDButton
                variant="gradient"
                color="info"
                id="confirm"
                onClick={() => {
                  navigate("/account/recovery-code");
                }}
                disabled={!checked}
              >
                Next
              </MDButton>
            </MDBox>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
export default RecoveryCodes;
