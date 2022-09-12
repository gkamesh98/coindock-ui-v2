import { IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { useCoinCard } from "api/coincardapi";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { openPopup } from "reducers/wallet";
import data from "layouts/dashboard/components/Projects/data";
import { useDispatch } from "react-redux";

function Projects() {
  const { data: coincard } = useCoinCard();
  const { columns, rows } = data(coincard);
  const dispatchaction = useDispatch();
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Wallets
          </MDTypography>
        </MDBox>
        <MDBox color="text" px={2}>
          <IconButton
            size="small"
            disableRipple
            color="inherit"
            onClick={() => dispatchaction(openPopup())}
          >
            <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
              add
            </Icon>
          </IconButton>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}
export default Projects;
