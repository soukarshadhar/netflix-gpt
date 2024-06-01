import React from "react";
import Logo from "../Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../store/user";
import { removeMovie as removeNowPlayingMovies } from "../../store/nowPlayingMovies";
import { removeMovie as removeTopRatedMovies } from "../../store/topRatedMovies";
import { removeMovie as removeTrendingMovies } from "../../store/trendingMovie";
import { setBrowseTab } from "../../store/activeBrowseTab";
import { BROWSE_TAB } from "../../utils/constants";

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
  const activeTab = useSelector((state) => state.activeBrowseTab);

  const handleOnSignOutClick = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      dispatch(removeUser());
      dispatch(removeNowPlayingMovies());
      dispatch(removeTopRatedMovies());
      dispatch(removeTrendingMovies());
      navigate("/");
    } catch (err) {
      console.log(err.code);
    }
  };

  const handleOnSetActiveTab = (e) => {
    dispatch(setBrowseTab(e.target.id));
  };

  return (
    <Navbar
      className={`header-container pt-3 w-100 position-absolute z-1${
        pathname === "/browse" ? " browse-header" : ""
      }`}
      data-bs-theme="dark"
    >
      <Navbar.Brand as="span">
        <Link to="/">
          <Logo className={pathname === "/browse" ? "logo-sm" : "logo-md"} />
        </Link>
      </Navbar.Brand>
      <Nav className="w-100" onClick={handleOnSetActiveTab}>
        {pathname === "/browse" && (
          <>
            <Nav.Link
              id={BROWSE_TAB.MOVIES}
              active={activeTab === BROWSE_TAB.MOVIES}
              className="py-0 my-auto"
              as="span"
              role="button"
            >
              Movies
            </Nav.Link>
            <Nav.Link
              id={BROWSE_TAB.TV_SHOWS}
              active={activeTab === BROWSE_TAB.TV_SHOWS}
              className="py-0 my-auto"
              as="span"
              role="button"
            >
              TV Shows
            </Nav.Link>
            <Nav.Link
              id={BROWSE_TAB.GPT_SEARCH}
              active={activeTab === BROWSE_TAB.GPT_SEARCH}
              className="py-0 my-auto"
              as="span"
              role="button"
            >
              GPT Search
            </Nav.Link>
          </>
        )}
        {pathname === "/" && (
          <Nav.Link
            className="ms-auto"
            as="span"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              to="/login"
              className="btn-signin text-decoration-none text-light px-3 py-2 rounded-1"
            >
              Sign In
            </Link>
          </Nav.Link>
        )}
        {pathname === "/browse" && !!user && (
          <Nav.Link
            className="ms-auto"
            as="span"
            onClick={(e) => e.stopPropagation()}
          >
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
                  <Dropdown.Item as="div" className="fw-bold">
                    Welcome {user.displayName}
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={handleOnSignOutClick}>
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
