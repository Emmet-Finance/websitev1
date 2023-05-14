import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

function TypeScriptAccordion() {
    return ( 
        <div className="typeScript_accordion">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Intuitive library interface</Accordion.Header>
                    <Accordion.Body>
                        Well-documented API library is easy to navigate and understand even for non-experts in the field. Function and parameter names are self-explanatory and inline docstrings sufficiently explain the expected inputs and outputs. 
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Regular updates & bug fixes</Accordion.Header>
                    <Accordion.Body>
                        Frequent updates and fixes help to enhance the performance and stability of the library, while also addressing any issues that may arise during its usage. The library is kept up-to-date with the latest technologies, standards, and best practices. Its dependencies are updated and improvements in performance and security are made with every opportunity.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Easy learning curve</Accordion.Header>
                    <Accordion.Body>
                        Well-structured clear and concise documentation covers 100% of the code. Code snippets and examples help reduce the developer time from first seeing to productively using the full power of the library.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Video step-by-step tutorials</Accordion.Header>
                    <Accordion.Body>
                        The library is accompanied by video tutorials demonstrating how to use the library, providing unambiguous examples and hands-on practice. The library user is taken by the hand and meticulously walked through the code eliminating the white spots.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Extensive documentation</Accordion.Header>
                    <Accordion.Body>
                        Concise easy to navigate documentation includes such sections as: Overview, Getting Started, API Reference, Tutorials and Troubleshooting which target users with different preparation and provide information relevant to each stage of library comprehension.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
     );
}

export default TypeScriptAccordion;