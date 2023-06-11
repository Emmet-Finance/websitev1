import React from 'react';

import DiscordY from '../assets/img/discord.svg';
import Note from '../assets/img/notes.svg';
import LogoYellow from '../assets/img/logo-2-yellow.svg';

import discord from '../assets/img/social/yellow-discord.svg';
import github from '../assets/img/social/yellow-github.svg';
import telegram from '../assets/img/social/yellow-telegram.svg';
import twiter from '../assets/img/social/yellow-twiter.svg';
import FooterLogo from '../assets/img/logo-footer.svg';

function Footer() {
    return ( 
        <footer className="footer-area">
            <div className="footer_top">
                <div className="footer_top_inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <div className="footerTopWidget">
                                    <img src={DiscordY} alt="Discord" /> <p>Join <br /> The Discussion </p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="footerTopWidget">
                                    <img src={Note} alt="Note" /> <p>READ <br /> DOCUMENTATION </p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="footerTopWidget">
                                    <img src={LogoYellow} alt="LogoYellow" /> <p>EXPLORE <br /> EMMET FINANCE </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-sm-6 col-6">
                            <div className="footerWdiget">
                                <h3>Contact</h3>
                                <ul className="footer_social">
                                    <li><a href="https://t.me/Emmet_Finance" target="_blank" rel="noopener noreferrer"><img src={telegram} alt="telegram" /></a></li>
                                    <li><a href="https://twitter.com/Emmet_Finance" target="_blank" rel="noopener noreferrer"><img src={twiter} alt="twiter" /></a></li>
                                    <li><a href="https://discord.gg/yuXxDctC4W" target="_blank" rel="noopener noreferrer"><img src={discord} alt="discord" /></a></li>
                                    <li><a href="https://github.com/Emmet-Finance" target="_blank" rel="noopener noreferrer"><img src={github} alt="github" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                            <div className="footerWdiget">
                                <h3>Developers</h3>
                                <ul className="quickLinks">
                                    <li><a href="https://docs.emmet.finance/intro/roadmap" target="_blank" rel="noopener noreferrer">Road Map</a></li>
                                    <li><a href="https://emmet.finance" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank" rel="noopener noreferrer">White Paper </a></li>                                    <li><a href="https://github.com/Emmet-Finance" target="_blank">GitHub</a></li>
                                    <li><a href="https://docs.emmet.finance/" target="_blank" rel="noopener noreferrer">Documentation</a></li>
                                    <li><a href="https://emmet.finance" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank" rel="noopener noreferrer">Audit Report</a></li>
                                    <li><a href="https://docs.emmet.finance/security/bug-bounty" target="_blank" rel="noopener noreferrer">Bug Bounty</a></li>
                                    <li><a href="https://emmet.finance" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank" rel="noopener noreferrer">Widget</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                            <div className="footerWdiget">
                                <h3>Community</h3>
                                <ul className="quickLinks">
                                    <li><a href="https://emmet.finance" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank" rel="noopener noreferrer">Governance</a></li>
                                    <li><a href="https://docs.emmet.finance/ecosystem-and-partnerships/brand-and-logos" target="_blank" rel="noopener noreferrer">Brand Kit</a></li>
                                    <li><a href="https://docs.emmet.finance/team/join-us" target="_blank" rel="noopener noreferrer">Careers</a></li>
                                    <li><a href="https://docsend.com/view/rniuzwaj87m5idun" target="_blank" rel="noopener noreferrer">Pitch Deck</a></li>
                                    <li><a href="https://form.jotform.com/231456892158061" target="_blank" rel="noopener noreferrer">Investor Form</a></li>
                                    <li><a href="https://forms.gle/7vDUd725TowzSMu1A" target="_blank" rel="noopener noreferrer">Partner Application</a></li>
                                    <li><a href="https://zealy.io/c/emmet-finance/invite/FNMunfvDcjAVnSQK6OLa6" target="_blank" rel="noopener noreferrer">Zealy</a></li>                           
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                            <div className="footerWdiget">
                                <h3>Ecosystem</h3>
                                <ul className="quickLinks">
                                    <li><a href="https://emmet.finance" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank" rel="noopener noreferrer">Explorer</a></li>
                                    <li><a href="https://emmet.finance" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank" rel="noopener noreferrer">Bridge Contracts</a></li>
                                    <li><a href="https://emmet.finance" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank" rel="noopener noreferrer">Token Contracts</a></li>
                                    <li><a href="https://emmet.finance" title="Coming Soon" onClick={event => event.preventDefault()} target="_blank" rel="noopener noreferrer">Token Listing</a></li>
                                    <li><a href="https://github.com/Emmet-Finance/token-faucet" target="_blank" rel="noopener noreferrer">Faucet</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copuright">
                    <div className="container">
                        <div className="copuright_logo">
                            <img src={FooterLogo} alt="Logo" />
                        </div>
                        <p>© 2023 Emmet Finance. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
			<div id="popup1" className="overlay">
                <div className="popup">
                    <a className="close" href="https://emmet.finance">&times;</a>
                    <div className="content">
                    Congratulations! We will contact with you very soon!
                    </div>
                </div>
            </div>
        </footer>
		
     );
}

export default Footer;