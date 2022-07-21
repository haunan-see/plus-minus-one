import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utilities/firebase/firebase.utilities";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { NavigationContainer, NavLinksContainer, NavLink } from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <Link className="logo-container" to="/">
          <Logo />
        </Link>

        <NavLinksContainer>
          <NavLink to="/shop">
            <div>Shop</div>
          </NavLink>
          {currentUser ? (
            <NavLink to="/" onClick={signOutUser}>
              <div>Sign Out</div>
            </NavLink>
          ) : (
            <NavLink to="/auth">
              <div>Sign In</div>
            </NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
