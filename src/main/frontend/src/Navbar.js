import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaList, FaUsers, FaBars, FaBook } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav>
            <input type="checkbox" id="menu-toggle"/>
            <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
            <ul className="menu">
                <li><Link to="/"><FaHome /> Home</Link></li>
                <li><Link to="/category"><FaList /> Categories</Link></li>
                <li><Link to="/report"><FaBook /> Reports</Link></li>
            </ul>
        </nav>
    );
};
export default Navbar;