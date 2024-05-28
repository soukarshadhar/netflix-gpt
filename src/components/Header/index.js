import Logo from "../Logo";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="py-4 px-4-5 d-flex position-absolute justify-content-between w-100">
      <Logo />
      <Link
        to="/login"
        className="btn-signin text-decoration-none text-light px-3 rounded-1 align-self-center"
      >
        Sign In
      </Link>
    </div>
  );
};

export default Header;
