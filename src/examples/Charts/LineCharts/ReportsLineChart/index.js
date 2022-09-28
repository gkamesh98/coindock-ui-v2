import { memo, useState } from "react"; // porp-types is a library for typechecking of props
import PropTypes from "prop-types"; // react-chartjs-2 components
import { Line } from "react-chartjs-2"; // @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography"; // ReportsLineChart configurations
import configs from "examples/Charts/LineCharts/ReportsLineChart/configs";
import { useCoinFilter, useCoinShortName, useLineChart, useLineFilter } from "api/linechartapi";
import { MenuItem, Select, Card } from "@mui/material";
import { uniq } from "lodash";
import moment from "moment";

function ReportsLineChart({ color, title, description, date, chart }) {
  const [coinid, setCoinid] = useState("coins");
  const [range, setRange] = useState("0");

  const { data: line } = useLineChart({ coinId: coinid, range });

  const linedata = Object.entries(line ?? {});

  const { data: filter } = useLineFilter();
  const { data: coinfilter } = useCoinFilter();
  const { data: coinshortname } = useCoinShortName();

  const rangefilter = Object.values(filter ?? {}).map((value) => {
    return value;
  });

  const labels = uniq(
    linedata?.reduce((prev, current, array) => {
      const label = Object.keys(current?.[1] ?? {}).map((value) => {
        if (
          rangefilter?.find((value) => value.value.toString() === range.toString())?.key === "Day"
        ) {
          return moment(value, "YYYYMMDDTHHmm").format("DD-MM-YY, hh");
        }
        return moment(value, "YYYYMMDDTHHmm").format("DD-MM-YY");
      });

      return [...prev, ...label];
    }, [])
  );

  const { data, options } = configs(labels || [], chart.datasets || {}, linedata);

  const handleChange = (e) => {
    setCoinid(e.target.value);
  };

  const handleRangeChange = (e) => {
    setRange(e.target.value);
  };

  return Boolean(coinfilter) && Boolean(filter) ? (
    <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
        <MDBox
          variant="gradient"
          bgColor={color}
          borderRadius="lg"
          coloredShadow={color}
          py={2}
          pr={0.5}
          mt={-5}
          height="18.7rem"
        >
          <Line data={data} options={options} />;
        </MDBox>

        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {title}
          </MDTypography>

          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={coinid}
            label="coin"
            onChange={handleChange}
            variant="standard"
            sx={{ minWidth: 80, minHeight: 30 }}
          >
            {Object.entries(coinfilter ?? {})?.map(([key, value]) => {
              return (
                <MenuItem value={key} key={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>

          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={range}
            label="Range"
            onChange={handleRangeChange}
            variant="standard"
            sx={{ m: 3, minWidth: 80, minHeight: 30 }}
          >
            {rangefilter.map((value) => {
              return (
                <MenuItem value={value.value} key={value.key}>
                  {value.description}
                </MenuItem>
              );
            })}
          </Select>
        </MDBox>
      </MDBox>
    </Card>
  ) : (
    ""
  );
} // Setting default values for the props of ReportsLineChart

ReportsLineChart.defaultProps = {
  color: "dark",
  description: "",
}; // Typechecking props for the ReportsLineChart

ReportsLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default memo(ReportsLineChart);
