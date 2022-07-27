import React from "react";

import { useGetRecoveryCodesDownloadMutation } from "api/recoveryCodes";

function DownloadRecoverykeys() {
  const [downloadble] = useGetRecoveryCodesDownloadMutation();

  const handleOnClick = () => {
    downloadble();
  };
  return (
    <button className="cd-button cd-card-button1" onClick={handleOnClick}>
      Download words
    </button>
  );
}
export default DownloadRecoverykeys;
