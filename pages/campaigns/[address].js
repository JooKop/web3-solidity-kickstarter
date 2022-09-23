import React from "react";
import { useRouter } from "next/router";

const CampaignShow = () => {
  const router = useRouter();
  const { address } = router.query;
  return <h3>Address: {address}</h3>;
};

export default CampaignShow;
