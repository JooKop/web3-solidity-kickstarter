import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout";
import ContributeForm from "../../components/ContributeForm";
import { Card, Grid, Button } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

export async function getServerSideProps(context) {
  const address = context.query.campaign;
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
      address: address,
    },
  };
}

const CampaignShow = (props) => {
  const {
    balance,
    manager,
    minimumContribution,
    requestsCount,
    approversCount,
    address,
  } = props;

  const items = [
    {
      header: manager,
      meta: "Manager address",
      description: "The manager created this campaign and can create requests.",
      style: { overflowWrap: "break-word" },
    },
    {
      header: minimumContribution,
      meta: "Minimum Contribution (wei)",
      description: "You must contribute at least this much wei to ",
    },
    {
      header: requestsCount,
      meta: "Number of requests",
      description: "A request tries to withdraw money from the contract",
    },
    {
      header: approversCount,
      meta: "Number of approvers",
      description: "Number of people who have already donated to this campaign",
    },
    {
      header: web3.utils.fromWei(balance, "ether"),
      meta: "Campaign balance",
      description:
        "The balance is how much money this campaign has left to spend",
    },
  ];

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
              <Button primary>Show Requests</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default CampaignShow;
