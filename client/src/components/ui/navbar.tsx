import React, { useState } from "react";

import "./navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/products" className="title">
        Productos
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
      <li>
          <NavLink to="/products">Listado Productos</NavLink>
        </li>
        <li>
          <NavLink to="/add-product">Agreagar Producto</NavLink>
        </li>
        <li>
          <NavLink to="/info">Informacion</NavLink>
        </li>
      </ul>
    </nav>
  );
};