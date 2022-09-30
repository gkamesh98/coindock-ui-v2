import React from "react";
import { useGetRecoveryCodesDownloadMutation } from "api/recoveryCodes";
import MDButton from "components/MDButton";

function DownloadRecoverykeys() {
  const [downloadble] = useGetRecoveryCodesDownloadMutation();

  const handleOnClick = () => {
    downloadble();
  };
  return (
    <MDButton variant="gradient" color="info" id="confirm" onClick={handleOnClick}>
      Download words
    </MDButton>
  );
}
export default DownloadRecoverykeys;
