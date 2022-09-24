import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      router.reload();
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
    setValue("");
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button type="submit" primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
};
export default ContributeForm;
