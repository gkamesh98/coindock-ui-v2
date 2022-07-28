// react-router-dom components
import { Link } from "react-router-dom"; // @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton"; // Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout"; // Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { Card, Checkbox } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";

function Cover() {
  const [checked, setChecked] = useState(false);
  const handleChecked = () => setChecked(!checked);

  return (
    <CoverLayout image={bgImage}>
      <Grid item xs={11} sm={9} md={5} lg={4} xl={3.8}>
        <Card>
          <MDBox>
            <MDTypography
              display="block"
              variant="button"
              fontWeight="medium"
              textAlign="center"
              mt={1}
              mx={4.3}
              p={3}
              mb={1}
            >
              Please note down the below recovery words in the same order and keep it securely
            </MDTypography>
          </MDBox>

          <MDBox mt={6} display="grid">
            <MDInput type="box" />
          </MDBox>

          <MDBox mt={4} mb={2} textAlign="center">
            <MDButton
              variant="gradient"
              color="info"
              id="confirm"
              onClick={() => {
                navigate("/authentication/sign-up/recovery-codes");
              }}
            >
              Download
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
                navigate("/authentication/sign-up/recovery-code-test");
              }}
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
