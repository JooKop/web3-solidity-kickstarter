import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { props: { campaigns } };
}

const CampaignIndex = (props) => {
  const renderCampaigns = () => {
    const items = props.campaigns.map((address) => {
      return {
        header: address,
        description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <Button
            floated="right"
            content="Create Campaign"
            icon="add circle"
            primary
          />
        </Link>{" "}
        {renderCampaigns()}
      </div>
    </Layout>
  );
};

export default CampaignIndex;
