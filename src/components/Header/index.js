import React from "react";
import Logo from "../Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import { setBrowseTab } from "../../store/activeBrowseTab";
import { BROWSE_TAB } from "../../utils/constants";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    ref={ref}
    onClick={(e) => {
      onClick(e);
    }}
    role="button"
  >
    {children}
  </span>
));

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const activeTab = useSelector((state) => state.activeBrowseTab);

  const handleOnSignOutClick = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.log(err.code);
    }
  };

  const handleOnSetActiveTab = (e) => {
    const tabId = e.target.id;
    if (
      BROWSE_TAB.GPTSearch === tabId ||
      BROWSE_TAB.movies === tabId ||
      BROWSE_TAB.tvShows === tabId
    ) {
      dispatch(setBrowseTab(tabId));
    }
  };

  return (
    <Navbar
      className={`header-container w-100 position-absolute z-1${
        pathname === "/browse" ? " browse-header" : ""
      }`}
      data-bs-theme="dark"
    >
      <Navbar.Brand className="py-0" as="span">
        <Link to="/">
          <Logo className={pathname === "/browse" ? "logo-sm" : ""} />
        </Link>
      </Navbar.Brand>
      <Nav className="w-100" onClick={handleOnSetActiveTab}>
        {pathname === "/browse" && (
          <>
            <Nav.Link
              id={BROWSE_TAB.movies}
              active={activeTab === BROWSE_TAB.movies}
              className="py-0 my-auto"
              as="span"
              role="button"
            >
              Movies
            </Nav.Link>
            <Nav.Link
              id={BROWSE_TAB.tvShows}
              active={activeTab === BROWSE_TAB.tvShows}
              className="py-0 my-auto"
              as="span"
              role="button"
            >
              TV Shows
            </Nav.Link>
            <Nav.Link
              id={BROWSE_TAB.GPTSearch}
              active={activeTab === BROWSE_TAB.GPTSearch}
              className="py-0 my-auto"
              as="span"
              role="button"
            >
              GPT Search
            </Nav.Link>
          </>
        )}
        {pathname === "/" && (
          <Nav.Link className="ms-auto px-0" as="span">
            <Link
              to="/login"
              className="btn-signin text-decoration-none text-light px-3 py-2 rounded-1"
            >
              Sign In
            </Link>
          </Nav.Link>
        )}
        {pathname === "/browse" && !!user && (
          <Nav.Link className="ms-auto p-0" as="span">
            <Dropdown align="end">
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                <FontAwesomeIcon
                  className="fs-2 user-profile-icon"
                  icon={faUserCircle}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {user?.displayName && (
                  <Dropdown.Item as="span" className="fw-bold">
                    Welcome {user.displayName}
                  </Dropdown.Item>
                )}
                <Dropdown.Item
                  as="span"
                  role="button"
                  onClick={handleOnSignOutClick}
                >
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
