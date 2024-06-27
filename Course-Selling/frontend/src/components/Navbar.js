import React from 'react';

// create a navbar component
const Navbar = () => {
    return (
        <nav>
            <div className="logo">Logo</div>
            <ul className="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Portfolio</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;