import React from "react";
import styles from "../css/navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className={styles.navcontainer}>
            <div className={styles.headerconatiner}>
                <Link to="/">Home</Link>
                <ul>
                    <li>
                        <Link to="/update">Update</Link>
                    </li>
                    <li>
                        <Link to="/delete">Delete</Link>
                    </li>
                    <li>
                        <Link to="/search">Search</Link>
                    </li>
                    <li>
                        <Link to="/matches">Matches</Link>
                    </li>
                    <li>
                        <Link to="/hs">High Score</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
