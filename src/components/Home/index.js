import { useRef } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { fetchSignInMethodsForEmail } from "firebase/auth";
// import { auth } from "../../utils/firebase";

const Home = () => {
  const inputRef = useRef(null);

  const handleOnClick = async (e) => {
    // const email = inputRef?.current?.value;
    // if (!email) return;
    // try {
    //   const methods = await fetchSignInMethodsForEmail(auth, email);
    //   console.log(methods);
    // } catch (err) {
    //   console.log(err.code);
    // }
  };

  return (
    <div className="bg-dark-gradient w-100 h-100">
      <div className="position-absolute top-50 start-50 translate-middle card-hero text-light p-5 w-100 text-center">
        <h1 className="title">Unlimited movies, TV shows and more</h1>
        <h4 className="mt-3">Watch anywhere. Cancel anytime.</h4>
        <h5 className="mt-5">
          Ready to watch? Enter your email to Sign in or Sign up.
        </h5>
        <div className="d-flex flex-wrap mt-3 justify-content-center">
          <FloatingLabel label="Email address">
            <Form.Control
              ref={inputRef}
              className="bg-black bg-opacity-75 text-light"
              size="lg"
              type="text"
              placeholder="Email address"
            />
          </FloatingLabel>
          <Button
            className="ms-2 btn-submit"
            variant="primary"
            size="lg"
            onClick={handleOnClick}
          >
            Get Started{" "}
            <FontAwesomeIcon className="ms-2" icon={faChevronRight} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
