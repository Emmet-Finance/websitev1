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
                                    <li><a href="https://t.me/Emmet_Finance" target="_blank"><img src={telegram} alt="telegram" /></a></li>
                                    <li><a href="https://twitter.com/Emmet_Finance" target="_blank"><img src={twiter} alt="twiter" /></a></li>
                                    <li><a href="https://discord.com/invite/yuXxDctC4W" target="_blank"><img src={discord} alt="discord" /></a></li>
                                    <li><a href="https://github.com/Emmet-Finance" target="_blank"><img src={github} alt="github" /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                            <div className="footerWdiget">
                                <h3>Developers</h3>
                                <ul className="quickLinks">
                                    <li><a href="#" target="_blank">Road Map</a></li>
                                    <li><a href="#" target="_blank">White Paper</a></li>
                                    <li><a href="#" target="_blank">GitHub</a></li>
                                    <li><a href="#" target="_blank">Documentation</a></li>
                                    <li><a href="#" target="_blank">Audit Report</a></li>
                                    <li><a href="#" target="_blank">Bug Bounty</a></li>
                                    <li><a href="#" target="_blank">Widget</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                            <div className="footerWdiget">
                                <h3>Community</h3>
                                <ul className="quickLinks">
                                    <li><a href="#" target="_blank">Governance</a></li>
                                    <li><a href="#" target="_blank">Twitter</a></li>
                                    <li><a href="https://discord.com/invite/yuXxDctC4W" target="_blank">Discord</a></li>
                                    <li><a href="#" target="_blank">Telegram</a></li>
                                    <li><a href="#" target="_blank">Brand Kit</a></li>
                                    <li><a href="#" target="_blank">Careers</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                            <div className="footerWdiget">
                                <h3>Ecosystem</h3>
                                <ul className="quickLinks">
                                    <li><a href="#" target="_blank">Explorer</a></li>
                                    <li><a href="#" target="_blank">Bridge Contracts</a></li>
                                    <li><a href="#" target="_blank">Token Contracts</a></li>
                                    <li><a href="#" target="_blank">Token Listing</a></li>
                                    <li><a href="#" target="_blank">Referrals</a></li>
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
        </footer>
     );
}

export default Footer;