import React from 'react';

import Accordion from 'react-bootstrap/Accordion';

function FAQAccordion() {
  return (
    <div className="faqContainer">
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>What is Emmet Bridge?</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Is it possible to Add New ERC-20 Tokens?</Accordion.Header>
                <Accordion.Body>
                Adding a new token will be as easy as adding a new pull request with a JSON file with all the token’s properties populated according to a template.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>What Are The Requirements For A Token To Be Bridged?</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Another Very Long And Interesting Question?</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
                <Accordion.Header>Seriously, Everything So Easy. What’s More Do You Need?</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
  );
}

export default FAQAccordion;