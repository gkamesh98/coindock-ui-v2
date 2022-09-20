// react-router-dom components

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Autocomplete, Icon, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import { useAddWalletMutation, useCoins } from "api/walletapi";

import Popup from "shared/Popup";
import { closePopup } from "reducers/wallet";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object({
  walletAddress: Yup.string().required("Wallet Address is required"),
  coinValue: Yup.string().required("Coin is required"),
});

function Addwallet() {
  const { data: coins } = useCoins();
  const open = useSelector((state) => state.wallet.open);
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

  const coinShortCodes = coins?.coins.map((coin) => coin.coinId);

  return Boolean(coins) ? (
    <Popup
      trigger={open}
      buttonOnclick={formik.handleSubmit}
      setTrigger={handleSetTrigger}
      buttonLable="Done"
      disabled={!formik.isValid}
    >
      <MDBox>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Add Wallet
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
            <MDBox mb={2}>
              <Autocomplete
                noOptionsText="coin"
                options={[
                  { value: "", hidden: true, label: "", visible: false },
                  ...coinShortCodes,
                ]}
                disableClearable={true}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={formik.values.coinValue}
                onChange={(event, newValue) => {
                  formik.setFieldValue("coinValue", newValue);
                }}
                renderInput={(params) => (
                  <MDInput
                    type="select"
                    {...params}
                    label="Coin"
                    name="coinValue"
                    variant="standard"
                    fullWidth
                    required
                    {...formik.getFieldProps("coinValue")}
                  />
                )}
              />
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
                variant="standard"
                required
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
                variant="standard"
                {...formik.getFieldProps("walletName")}
              />
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
    </Popup>
  ) : (
    ""
  );
}
export default Addwallet;
