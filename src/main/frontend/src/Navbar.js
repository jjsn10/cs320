import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark navbar-dark bg-dark">
            <Link to="/">Home</Link>
            <span> </span>
            <Link to="/page2">Page 2</Link>
        </nav>
    );
};
export default Navbar;