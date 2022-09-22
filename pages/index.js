import React from "react";
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
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Button
          floated="right"
          content="Create Campaign"
          icon="add circle"
          primary
        />
        {renderCampaigns()}
      </div>
    </Layout>
  );
};

export default CampaignIndex;
