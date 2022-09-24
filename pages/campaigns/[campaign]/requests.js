import React from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import { Button } from "semantic-ui-react";

export async function getServerSideProps(context) {
  const address = context.query.campaign;
  return {
    props: {
      address: address,
    },
  };
}

const RequestIndex = ({ address }) => {
  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary>Add Request</Button>
      </Link>
    </Layout>
  );
};

export default RequestIndex;
