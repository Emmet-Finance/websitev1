import React from 'react';

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
                                        <label for="Timestamp">Timestamp</label>
                                        <input type="date" name='Timestamp' id='Timestamp' />
                                    </div>
                                </div>
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
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="InvestmentRound">Investment Round</label>
                                    <input type="text" name='InvestmentRound' id='InvestmentRound' />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="investmenttimeframe">What is your investment timeframe ?</label>
                                    <input type="text" name='investmenttimeframe' id='investmenttimeframe' />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="investmentbudget">What is your investment budget or range?</label>
                                    <input type="text" name='investmentbudget' id='investmentbudget' />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="">Are you an accredited investor?</label>
                                    <div className="radioBox">
                                        <div className="radioCheck">
                                            <input type="radio" name='accreditedinvestor' id='accreditedinvestor1' />
                                            <label htmlFor="accreditedinvestor1"><span></span> Yes</label>
                                        </div>
                                        <div className="radioCheck">
                                            <input type="radio" name='accreditedinvestor' id='accreditedinvestor2' />
                                            <label htmlFor="accreditedinvestor2"><span></span> No</label>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="">How did you hear about our project? Please select all that apply</label>
                                    <input type="text" name='' id='' />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="colInput">
                                        <label for="">What interests you most about our project? Please select all that apply</label>
                                    <input type="text" name='' id='' />
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
                                    <textarea name="supportourproject" id="supportourproject"></textarea>
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
									<div class="col-4"></div>
									<div className="col-4">
  <input type="submit" name="submit" id="submit" value="Submit" />
</div>
									<div class="col-4"></div>
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