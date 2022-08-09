import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton"; // Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout"; // Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { Box, Card, Checkbox } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import RecoveryBox from "shared/recovery-box";
import { usePostRecoveryCodesQuery, useGetRecoveryCodesDownloadMutation } from "api/recoveryCodes";
import { useNavigate } from "react-router-dom";

function Cover() {
  const [checked, setChecked] = useState(false);
  const handleChecked = () => setChecked(!checked);

  const navigate = useNavigate();

  const [downloadble] = useGetRecoveryCodesDownloadMutation();

  const { data = [] } = usePostRecoveryCodesQuery();

  return (
    <CoverLayout image={bgImage}>
      <Grid item xs={11} sm={9} md={5} lg={4} xl={3.125}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={4.3}
            mt={-3}
            p={3}
            mb={1}
          >
            <MDTypography variant="h4" fontWeight="regular" color="white" textAlign="center">
              Please note down the below recovery words in the same order and keep it securely
            </MDTypography>
          </MDBox>

          <MDBox mt={6} display="grid">
            <Box sx={1} mt={5} ml={4}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {data.map((value, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <RecoveryBox key={index} index={index + 1} code={value} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </MDBox>

          <MDBox mt={4} mb={2} textAlign="center">
            <MDButton
              variant="gradient"
              color="info"
              id="confirm"
              onClick={() => {
                downloadble();
              }}
            >
              Download words
            </MDButton>
          </MDBox>

          <MDBox mt={1} mx={4.3} p={3} mb={1}>
            <Checkbox checked={checked} onChange={handleChecked} />
            <MDTypography
              variant="button"
              fontWeight="light"
              color="text"
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
                navigate("/sign-up/recovery-code-test");
              }}
              disabled={!checked}
            >
              Next
            </MDButton>
          </MDBox>
        </Card>
      </Grid>
    </CoverLayout>
  );
}
export default Cover;
