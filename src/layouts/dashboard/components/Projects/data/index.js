// @mui material components
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress"; // Images
import { useCoinCard } from "api/coincardapi";
import EllipseNumber from "Shared/EllipeseText";
import { Avatar, ImageList, ImageListItem } from "@mui/material";
function Company({ image, name }) {
  return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );
}

Company.defaultProps = {
  image: "",
  name: "",
};

Company.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
};

export default function data(coincard) {
  console.log({ coincard });
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",
            "&:not(:first-of-type)": {
              ml: -1.25,
            },
            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { Header: "logo", accessor: "logo", width: "45%", align: "left" },
      { Header: "total btc", accessor: "totalbtc", width: "10%", align: "left" },
      { Header: "no of  Coins", accessor: "coins", align: "center" },
      { Header: "primary currency", accessor: "primary", align: "center" },
      { Header: "secondary currency", accessor: "secondary", align: "center" },
    ],
    rows: Object.values(coincard ?? {}).map((value) => {
      return {
        logo: (
          // <MDAvatar alt={value?.coinName} src={value?.logo} />

          <Avatar size="xl" shadow="sm" src={value?.logo}>
            {value.coinName}
          </Avatar>
        ),
        totalbtc: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <EllipseNumber
              component="h4"
              text={value?.btcCoin?.toString() ?? ""}
              className="text-end"
              maxLetters={4}
            />
          </MDTypography>
        ),
        coins: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {value.numberOfCoins}
          </MDTypography>
        ),
        primary: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {value.primaryCurrency.toFixed(2)}
          </MDTypography>
        ),
        secondary: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {value.secondaryCurrency}
          </MDTypography>
        ),
      };
    }),
  };
}
