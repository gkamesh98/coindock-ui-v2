// @mui material components
import Grid from "@mui/material/Grid"; // Material Dashboard 2 React components
import MDBox from "components/MDBox"; // Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard"; // Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData"; // Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import {
  usePrimaryCurrency,
  useTotalCurrency,
  useTopperformer,
  useLowperformer,
} from "api/coinperformance";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";

function Dashboard() {
  const { sales } = reportsLineChartData;

  const { data: totalCoins } = useTotalCurrency();
  const { data: primary } = usePrimaryCurrency();
  const { data: top } = useTopperformer();
  const { data: low } = useLowperformer();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={totalCoins?.imgUrl}
                title="Total BTC"
                count={totalCoins?.balance ? totalCoins?.balance.toFixed(4) : "NA"}
                percentage={{
                  color: "success",
                }}
              ></ComplexStatisticsCard>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={primary?.imgUrl}
                title="Primary Currency"
                count={primary?.balance ? primary?.balance.toFixed(4) : "NA"}
                percentage={{
                  color: "success",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="trending_up"
                title="Top Performer"
                count={top?.coinId ? top?.coinId : "NA"}
                percentage={{
                  color: "success",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="trending_down"
                title="Low Performer"
                count={low?.coinId ? low?.coinId : "NA"}
                percentage={{
                  color: "success",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart color="success" title="Line chart" chart={sales} />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <DefaultDoughnutChart color="success" title="Doughnut chart" chart={sales} />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
