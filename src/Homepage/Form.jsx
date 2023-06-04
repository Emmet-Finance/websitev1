import React, from 'react';

import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';

function Form() {
    

    return ( 

        <>
            <Header/>
                <div className="form_waprer">
                    <div className="container">
                        <form action="#">
                            <div className="row">
                                
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="FullName">Full Name</label>
                                        <input type="text" name='FullName' id='FullName' />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="Email">Email</label>
                                        <input type="email" name='Email' id='Email' />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="Telegram">Telegram</label>
                                        <input type="link" name='Telegram' id='Telegram' />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="Twitter">Twitter</label>
                                        <input type="link" name='Twitter' id='Twitter' />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="LinkedIn">LinkedIn</label>
                                        <input type="link" name='LinkedIn' id='LinkedIn' />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="CountryResidence">Country of Residence</label>
                                        <select name="CountryResidence" id="CountryResidence">
                                            <option value="USA" selected >USA</option>
                                            <option value="UK" selected >UK</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="BackgroundExperience">Background and Experience</label>
                                        <textarea name="BackgroundExperience" id="BackgroundExperience" ></textarea>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="CurrentOccupation">Current Occupation</label>
                                        <input type="text" name='CurrentOccupation' id='CurrentOccupation' />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="TypeInvestor">Type of Investor</label>
                                        <select name="TypeInvestor" id="TypeInvestor">
                                            <option value="TypeInvestor">Type of Investor</option>
                                            <option value="Individual investor">Individual investor</option>
                                            <option value="Institutional investor">Institutional investor</option>
                                            <option value="Venture capitalist">Venture capitalist</option>
                                            <option value="Angel investor">Angel investor</option>
                                            <option value="Private equity firm">Private equity firm</option>
                                            <option value="Other (please specify)">Other (please specify)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="InvestmentRound">Investment Round</label>
                                        <select name="InvestmentRound" id="InvestmentRound">
                                            <option value="">Type of InvestmentRound</option>
                                            <option value="Pre-Seed round">Pre-Seed round</option>
                                            <option value="Seed round">Seed round</option>
                                            <option value="Series A">Series A</option>
                                            <option value="Series B">Series B</option>
                                            <option value="Series C">Series C</option>
                                            <option value="Public sale">Public sale</option>
                                            <option value="Other (please specify)">Other (please specify)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="investmenttimeframe">What is your investment timeframe ?</label>
                                    <input type="text" name='investmenttimeframe' id='investmenttimeframe' />
                                    <select name="investmenttimeframe" id="investmenttimeframe">
                                            <option value="">Type of Investmenttimeframe</option>
                                            <option value="Short-term (less than 1 year)">Short-term (less than 1 year)</option>
                                            <option value="Medium-term (1-3 years)">Medium-term (1-3 years)</option>
                                            <option value="Long-term (more than 3 years)">Long-term (more than 3 years)</option>
                                            
                                    </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="investmentbudget">What is your investment budget or range?</label>
                                    <select name='investmentbudget' id="investmentbudget">
                                        <option value="">Choose Budget</option>
                                        <option value="Less than $50,000">Less than $50,000</option>
                                        <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                                        <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                                        <option value="$250,000 - $500,000">$250,000 - $500,000</option>
                                        <option value="">More than $500,000</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="">Are you an accredited investor?</label>
                                        <select name='accredited_investor' id="accredited investor">
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="">How did you hear about our project? Please select all that apply</label>
                                        <select name="our_project" id="our_project">
                                            <option value="">Choose Project</option>
                                            <option value="Social media">Social media</option>
                                            <option value="Online forums">Online forums</option>
                                            <option value="Referral from a friend">Referral from a friend</option>
                                            <option value="News articles">News articles</option>
                                            <option value="Other (please specify)">Other (please specify)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="">What interests you most about our project? Please select all that apply</label>
                                        <select name='our_projects' id='our_project'>
                                            <option value='Innovative technology'>Innovative technology</option>
                                            <option value='Potential for high returns'>Potential for high returns</option>
                                            <option value='Strong team and advisors'>Strong team and advisors</option>
                                            <option value='Real-world use case'>Real-world use case</option>
                                            <option value='Positive community feedback'>Positive community feedback</option>
                                            <option value='Other (please specify)'>Other (please specify)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="">Have you previously made investments in cryptocurrency or blockchain projects?</label>
                                    <input type="text" name='' id='' />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="supportourproject">How do you plan to support our project?</label>
                                    <select name='support_projects' id='support_projects'>
                                        <option value="Providing financial investment">Providing financial investment</option>
                                        <option value="Offering strategic guidance and advice">Offering strategic guidance and advice</option>
                                        <option value="Introducing us to your network of contacts">Introducing us to your network of contacts</option>
                                        <option value="Assisting with business development opportunities">Assisting with business development opportunities</option>
                                        <option value="Promoting our project through your platform or connections">Promoting our project through your platform or connections</option>
                                        <option value="Other (please specify)">Other (please specify)</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="specificquestions">Do you have any specific questions or concerns regarding our project or investment opportunity?</label>
                                    <input type="text" name='specificquestions' id='specificquestions' />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="additionaladvantages">Highlight any additional advantages to choice as an investor</label>
                                    <textarea name='additionaladvantages' id='additionaladvantages'></textarea>
                                    </div>
                                </div>
								<div className="col-12">
									<div className="col-4"></div>
									<div className="col-4">
  <a href="" className="enterApp">Submit</a>
</div>
									<div className="col-4"></div>
								</div>
                            </div>
                        </form>
                    </div>
                </div>
            <Footer/>
        </>
     );
}

export default Form;