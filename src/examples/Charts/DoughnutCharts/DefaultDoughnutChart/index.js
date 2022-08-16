import { useMemo, useState } from "react"; // porp-types is a library for typechecking of props
import PropTypes from "prop-types"; // react-chartjs-2 components
import { Doughnut } from "react-chartjs-2"; // @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon"; // Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography"; // DefaultDoughnutChart configurations
import configs from "examples/Charts/DoughnutCharts/DefaultDoughnutChart/configs";
import { MenuItem, Select } from "@mui/material";
import { usePieFilter } from "api/piechartapi";
import { usePieChart } from "api/piechartapi";

function DefaultDoughnutChart({ icon, title, description, height, chart }) {
  const [filter, setFilter] = useState("coins");
  const { data: piefilter } = usePieFilter();
  const { data: pie } = usePieChart(filter);
  const label = Object.keys(pie ?? {});
  const piedata = Object.values(pie ?? {});
  const { options, data } = configs(label || [], chart.datasets || {}, chart.cutout, piedata);
  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const renderChart = (
    <MDBox py={2} pr={2} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <MDBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
          {icon.component && (
            <MDBox
              width="4rem"
              height="4rem"
              bgColor={icon.color || "info"}
              variant="gradient"
              coloredShadow={icon.color || "info"}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={2}
            >
              <Icon fontSize="medium">{icon.component}</Icon>
            </MDBox>
          )}
          <MDBox mt={icon.component ? -2 : 0}>
            {title && <MDTypography variant="h6">{title}</MDTypography>}
            <MDBox mb={2}>
              <MDTypography component="div" variant="button" color="text">
                {description}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      ) : null}
      {useMemo(() => {
        console.log({ data, options });
        console.log(piefilter);
        return (
          <MDBox height={height}>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              // value={age}
              // label="Age"
              onChange={handleChange}
            >
              {piefilter?.map((value) => {
                return (
                  <MenuItem value={value} key={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
            <Doughnut data={data} options={options} />
          </MDBox>
        );
      }, [chart, height])}
    </MDBox>
  );
  return title || description ? <Card>{renderChart}</Card> : renderChart;
} // Setting default values for the props of DefaultDoughnutChart
DefaultDoughnutChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "19.125rem",
  data: [],
}; // Typechecking props for the DefaultDoughnutChart
DefaultDoughnutChart.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
  data: PropTypes.array,
};
export default DefaultDoughnutChart;
