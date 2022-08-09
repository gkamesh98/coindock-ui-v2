// react-router-dom components
import { Link } from "react-router-dom"; // @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton"; // Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout"; // Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import { UndoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Cover() {
  const navigate = useNavigate();

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
              Please enter the recovery words on the same order to activate the CoinDock account.
            </MDTypography>
          </MDBox>

          <MDBox mt={6} display="grid">
            <MDInput type="box" />
          </MDBox>
          <Grid container spacing={2} mt={3} mx={-4} mb={1} textAlign="center">
            <Grid item xs>
              <UndoOutlined
                fontSize="large"
                variant="gradient"
                color="info"
                id="confirm"
                onClick={() => {
                  navigate("/sign-up/recovery-codes");
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MDButton
                variant="gradient"
                color="info"
                id="confirm"
                onClick={() => {
                  navigate("/sign-up/recovery-codes");
                  textAlign = "right";
                }}
              >
                confirm
              </MDButton>
            </Grid>
          </Grid>
          <MDBox spacing={5} mt={1} mx={7} mb={4} textAlign="right"></MDBox>
        </Card>
      </Grid>
    </CoverLayout>
  );
}
export default Cover;
