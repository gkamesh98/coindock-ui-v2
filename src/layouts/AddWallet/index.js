// react-router-dom components
import { Link } from "react-router-dom"; // @mui material components
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton"; // Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout"; // Images
import { useLogin } from "api/auth";
import YupPassword from "yup-password";

import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";

import { Icon, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import { useAddWalletMutation, useCoins } from "api/walletapi";

import Popup from "Shared/Popup/Popup";
import { closePopup } from "layouts/AddWallet/AddWalletSlice";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object({
  walletAddress: Yup.string().required("Wallet Address is required"),
  coinValue: Yup.string().required("Coin is required"),
});

function Addwallet() {
  const { data: coins } = useCoins();
  const open = useSelector((state) => state.addwallet.open);
  const dispatch = useDispatch();
  const [wallet] = useAddWalletMutation();
  const handleSetTrigger = () => {
    dispatch(closePopup());
  };
  const initialValues = { coinValue: "", walletName: "", walletAddress: "" };

  const onSubmit = async (values, actions) => {
    try {
      await wallet({ ...values }).unwrap();

      formik.resetForm(initialValues);
    } catch (errorResponse) {}
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <Popup
      trigger={open}
      buttonOnclick={formik.handleSubmit}
      setTrigger={handleSetTrigger}
      buttonLable="Done"
      disabled={!formik.isValid}
    >
      <MDBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        mx={2}
        mt={-3}
        p={2}
        mb={1}
        textAlign="end"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={2} textAlign="start">
          Add Wallet
        </MDTypography>
        <IconButton
          size="small"
          disableRipple
          color="inherit"
          onClick={() => handleSetTrigger(false)}
        >
          <Icon onClick={() => formik.resetForm()}>close</Icon>
        </IconButton>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
          <MDBox mb={2}>
            <InputLabel sx={{ marginLeft: 1 }}>Coin</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              name="coinValue"
              id="coinValue"
              label="Coin"
              fullWidth
              sx={{ height: 40 }}
              {...formik.getFieldProps("coinValue")}
            >
              {(coins?.coins ?? []).map((value) => {
                return (
                  <MenuItem value={value.coinId} key={value.coinId}>
                    {value.coinId}
                  </MenuItem>
                );
              })}
            </Select>

            {formik.touched.coinValue && formik?.errors?.coinValue ? (
              <MDTypography color="error" fontSize="12px">
                {formik?.errors?.coinValue}
              </MDTypography>
            ) : null}
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              name="walletAddress"
              type="text"
              label="Wallet Address"
              fullWidth
              {...formik.getFieldProps("walletAddress")}
            />
            {formik.touched.walletAddress && formik?.errors?.walletAddress ? (
              <MDTypography color="error" fontSize="12px">
                {formik?.errors?.walletAddress}
              </MDTypography>
            ) : null}
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              name="walletname"
              type="text"
              label="Wallet Name"
              fullWidth
              {...formik.getFieldProps("walletName")}
            />
          </MDBox>
        </MDBox>
      </MDBox>
    </Popup>
  );
}
export default Addwallet;
