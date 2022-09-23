import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";

export async function getServerSideProps(context) {
  const { address } = context.query;
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();
  console.log(JSON.stringify(summary));
  return {
    props: {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
}

const CampaignShow = () => {
  const router = useRouter();
  const { address } = router.query;
  return (
    <Layout>
      <h3>Address: {address}</h3>
    </Layout>
  );
};

export default CampaignShow;
