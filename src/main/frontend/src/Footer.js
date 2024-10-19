import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <h2>Track Expenses</h2>
                <ul className="footer-menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/category">Categories</Link></li>
                    <li><Link to="/report">Reports</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;