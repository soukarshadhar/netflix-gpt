import { useRef } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFormValue } from "../../store/form";
import { FORM_FIELD_TYPE } from "../../utils/constants";

const Home = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = async () => {
    const email = inputRef?.current?.value;
    if (!email) return;

    try {
      const docRef = doc(db, "users", email);
      const docSnap = await getDoc(docRef);
      dispatch(updateFormValue({ id: FORM_FIELD_TYPE.email, value: email }));
      if (docSnap.exists()) {
        navigate("/login");
      } else {
        navigate("/signup", { state: { skipExistingEmailCheck: true } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="position-absolute text-light w-100 h-100 text-center home">
      <h1 className="home-title">Unlimited movies, TV shows and more</h1>
      <h4 className="mt-3 fs-5">Watch anywhere.</h4>
      <h5 className="home-instruction">
        Ready to watch? Enter your email to Sign in or Sign up.
      </h5>
      <div className="d-flex flex-wrap mt-3 justify-content-center">
        <FloatingLabel className="mb-2" label="Email address">
          <Form.Control
            ref={inputRef}
            className="bg-black bg-opacity-75 text-light"
            size="lg"
            type="text"
            placeholder="Email address"
          />
        </FloatingLabel>
        <Button
          className="ms-2 mb-2 btn-submit"
          variant="primary"
          size="lg"
          onClick={handleOnClick}
        >
          Get Started <FontAwesomeIcon className="ms-2" icon={faChevronRight} />
        </Button>
      </div>
    </div>
  );
};

export default Home;
