import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

import Campaign from "../../../../ethereum/campaign";
import web from "../../../../ethereum/web3";

export async function getServerSideProps(context) {
  const address = context.query.campaign;
  return {
    props: {
      address: address,
    },
  };
}
const RequestNew = () => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");

  return (
    <Layout>
      <h3>Create a Request</h3>
      <Form>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Button primary>Create!</Button>
      </Form>
    </Layout>
  );
};

export default RequestNew;
