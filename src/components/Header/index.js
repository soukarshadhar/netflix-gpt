import React from "react";
import Logo from "../Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../../store/user";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="/"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleOnSignOutClick = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      dispatch(deleteUser());
      navigate("/");
    } catch (err) {
      console.log(err.code);
    }
  };

  return (
    <div className="py-4 px-4-5 d-flex position-absolute justify-content-between w-100 z-1">
      <Link to="/">
        <Logo />
      </Link>
      {pathname === "/" && (
        <Link
          to="/login"
          className="btn-signin text-decoration-none text-light px-3 rounded-1 align-self-center"
        >
          Sign In
        </Link>
      )}
      {pathname === "/browse" && !!user && (
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            Welcome {user && user.displayName}
            <FontAwesomeIcon
              className="fs-1 user-profile-icon"
              icon={faUserCircle}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOnSignOutClick}>
              Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default Header;
