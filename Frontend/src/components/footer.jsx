import React from 'react';
import ReactDOM from 'react-dom/client';
import { FaSquareTwitter } from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
const Footer = () => (
    <footer className="footerr" id="picassoFooter">
        <div className="footer-navigation">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="#About-div">About Us</a></li>
                <li><a href="#">User</a></li>
                <li><a href="#">Admin</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
        <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
                <a href="https://facebook.com" target="_blank" className="social-icon"><FaFacebookMessenger /></a>
                <a href="https://twitter.com" target="_blank" className="social-icon"><FaSquareTwitter /></a>
                <a href="https://instagram.com" target="_blank" className="social-icon"><FaSquareInstagram />
</a>
            </div>
        </div>
        <div className="footer-art">
            <canvas id="picassoCanvas"></canvas>
        </div>
    </footer>
);

export default Footer;
