import React from "react";
import { useGetRecoveryCodesDownloadMutation } from "api/recoveryCodes";
import { Button } from "@mui/material";

function DownloadRecoverykeys() {
  const [downloadble] = useGetRecoveryCodesDownloadMutation();

  const handleOnClick = () => {
    downloadble();
  };
  return (
    <Button
      variant="contained"
      style={{
        color: "white",
        fontFamily: "Times New Roman,serif",
        fontSize: "11px",
      }}
      onClick={handleOnClick}
    >
      Download words
    </Button>
  );
}
export default DownloadRecoverykeys;
