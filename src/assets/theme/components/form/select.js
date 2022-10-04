// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors"; // Material Dashboard 2 React helper functions
import typography from "assets/theme/base/typography";
import pxToRem from "assets/theme/functions/pxToRem";

const { transparent } = colors;
const { size } = typography;
const { dark } = colors;

const select = {
  styleOverrides: {
    root: {
      fontSize: size.sm,
      color: dark.main,
    },
    select: {
      fontSize: size.sm,
      color: dark.main,
      display: "grid",
      alignItems: "center",
      padding: `0 ${pxToRem(12)} !important`,
      "& .Mui-selected": {
        backgroundColor: transparent.main,
      },
    },
    selectMenu: {
      background: "none",
      height: "none",
      minHeight: "none",
      overflow: "unset",
    },
    icon: {
      display: "	ArrowDropDownIcon",
    },
  },
};
export default select;
