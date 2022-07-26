// prop-types is a library for typechecking of props
import PropTypes from "prop-types"; // @mui material components
import Container from "@mui/material/Container";
import MDBox from "components/MDBox";

function Footer({ light }) {
  return (
    <MDBox position="absolute" width="100%" bottom={0} py={4}>
      <Container />
    </MDBox>
  );
} // Setting default props for the Footer
Footer.defaultProps = {
  light: false,
}; // Typechecking props for the Footer
Footer.propTypes = {
  light: PropTypes.bool,
};
export default Footer;
