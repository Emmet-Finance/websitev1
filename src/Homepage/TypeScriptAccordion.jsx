import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

function TypeScriptAccordion() {
    return ( 
        <div className="typeScript_accordion">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Intuitive Library Interface</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic laboriosam nisi voluptates, alias voluptate distinctio molestiae commodi non impedit, necessitatibus velit optio porro quasi molestias temporibus omnis, aut qui enim.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Easy Learning Curve</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam est, architecto vel id ea impedit sint expedita. Voluptatum quas corrupti delectus animi modi aliquid natus, dolores ex, dolorem necessitatibus amet!
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Step-By-Step Video Tutorials</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam est, architecto vel id ea impedit sint expedita. Voluptatum quas corrupti delectus animi modi aliquid natus, dolores ex, dolorem necessitatibus amet!
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Extensive Documentation</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam est, architecto vel id ea impedit sint expedita. Voluptatum quas corrupti delectus animi modi aliquid natus, dolores ex, dolorem necessitatibus amet!
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Regular Updates & Bug Fixes</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam est, architecto vel id ea impedit sint expedita. Voluptatum quas corrupti delectus animi modi aliquid natus, dolores ex, dolorem necessitatibus amet!
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
     );
}

export default TypeScriptAccordion;