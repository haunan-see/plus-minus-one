import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/logo.svg";

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../../utilities/firebase/firebase.utilities"

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  }

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            <div>Shop</div>
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              <div>Sign Out</div>
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              <div>Sign In</div>
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
