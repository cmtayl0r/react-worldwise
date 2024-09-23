import { Link, NavLink } from "react-router-dom";

function PageNav() {
  return (
    <nav>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/product">Product</NavLink>
      </li>
    </nav>
  );
}

export default PageNav;
