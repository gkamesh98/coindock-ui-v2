import { useState, memo } from "react"; // porp-types is a library for typechecking of props
import PropTypes from "prop-types"; // react-chartjs-2 components
import { Doughnut } from "react-chartjs-2"; // @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography"; // DefaultDoughnutChart configurations
import configs from "examples/Charts/DoughnutCharts/DefaultDoughnutChart/configs";
import { MenuItem, Select, Card, Icon } from "@mui/material";
import { usePieChart, usePieFilter } from "api/piechartapi";

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
    <MDBox padding="1rem" py={2} pr={2} pl={icon.component ? 1 : 2}>
      <MDBox height={height}>
        <Doughnut data={data} options={options} />
      </MDBox>
      {title || description ? (
        <MDBox>
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

          <MDTypography pt={3} pb={1} px={1} variant="h6" textTransform="capitalize">
            {title}
          </MDTypography>

          {description && (
            <MDTypography pt={3} pb={1} px={1} component="div" variant="button" color="text">
              {description}
            </MDTypography>
          )}

          <MDBox pb={1} px={1}>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={filter}
              label="Coins"
              onChange={handleChange}
              variant="standard"
              sx={{ minWidth: 80, minHeight: 30 }}
            >
              {piefilter?.map((value) => {
                return (
                  <MenuItem value={value} key={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </MDBox>
        </MDBox>
      ) : null}
    </MDBox>
  );

  return title || description ? (
    Boolean(pie) && Boolean(piefilter) ? (
      <Card sx={{ height: "100%" }}>{renderChart}</Card>
    ) : null
  ) : (
    renderChart
  );
} // Setting default values for the props of DefaultDoughnutChart

DefaultDoughnutChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "18.125rem",
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

export default memo(DefaultDoughnutChart);
