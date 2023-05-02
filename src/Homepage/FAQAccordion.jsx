import React from 'react';

import Accordion from 'react-bootstrap/Accordion';

function FAQAccordion() {
  return (
    <div className="faqContainer">
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>What is Emmet Bridge?</Accordion.Header>
                <Accordion.Body>
                    Emmet Bridge is a new generation decentralized ERC-20 token bridge for secure and cost-efficient transfers between 15+ chains. Emmet community members can become the bridge validators further hardening security of the bridge and earning a share from the bridge transactions.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Is it possible to add new ERC-20 tokens?</Accordion.Header>
                <Accordion.Body>
                    Adding a new token will be as easy as adding a new pull request with a JSON file with all the token’s properties populated according to a template.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>What are the requirements for a token to be bridged?</Accordion.Header>
                <Accordion.Body>
                    The token’s contract must comply with ERC-20 for EVM & the main Fungible token standard for Non-EVM chains. Its contract must be verified on the chain explorer. The contract must be void of malicious code.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
  );
}

export default FAQAccordion;