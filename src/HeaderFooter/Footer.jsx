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
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 col-12">
                            <div className="footerTopWidget">
                                <img src={DiscordY} alt="Discord" /> <p>Join <br /> The Discussion </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-12">
                            <div className="footerTopWidget">
                                <img src={Note} alt="Note" /> <p>READ <br /> DOCUMENTATION </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-12">
                            <div className="footerTopWidget">
                                <img src={LogoYellow} alt="LogoYellow" /> <p>EXPLORE <br /> EMMET FINANCE </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="footerWdiget">
                                <h3>Contact</h3>
                                <ul className="footer_social">
                                    <li><a href="https://t.me/Emmet_Finance"><img src={telegram} alt="telegram" /></a></li>
                                    <li><a href="https://twitter.com/Emmet_Finance"><img src={twiter} alt="twiter" /></a></li>
                                    <li><a href="https://discord.gg/MTcrqnDP"><img src={discord} alt="discord" /></a></li>
                                    <li><a href="https://github.com/Emmet-Finance"><img src={github} alt="github" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                            <div className="footerWdiget">
                                <h3>Developers</h3>
                                <ul className="quickLinks">
                                    <li><a href="#">Road Map</a></li>
                                    <li><a href="#">White Paper</a></li>
                                    <li><a href="#">GitHub</a></li>
                                    <li><a href="#">Documentation</a></li>
                                    <li><a href="#">Audit Report</a></li>
                                    <li><a href="#">Bug Bounty</a></li>
                                    <li><a href="#">Widget</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                            <div className="footerWdiget">
                                <h3>Community</h3>
                                <ul className="quickLinks">
                                    <li><a href="#">Governance</a></li>
                                    <li><a href="#">Twitter</a></li>
                                    <li><a href="#">Discord</a></li>
                                    <li><a href="#">Telegram</a></li>
                                    <li><a href="#">Brand Kit</a></li>
                                    <li><a href="#">Careers</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                            <div className="footerWdiget">
                                <h3>Ecosystem</h3>
                                <ul className="quickLinks">
                                    <li><a href="#">Explorer</a></li>
                                    <li><a href="#">Bridge Contracts</a></li>
                                    <li><a href="#">Token Contracts</a></li>
                                    <li><a href="#">Token Listing</a></li>
                                    <li><a href="#">Referrals</a></li>
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
                        <p>© 2022 Emmet Finance. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
     );
}

export default Footer;