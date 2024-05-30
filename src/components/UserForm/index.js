import { useState, useRef } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/validate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../utils/firebase";

const EMAIL_ID = "email";
const PASSWORD_ID = "password";
const FULL_NAME_ID = "fullName";

const UserForm = ({ type = "signin" }) => {
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");

  const handleOnSetErrors = (fieldId, field) => {
    if (field.valid) {
      setErrors((prevState) => {
        return {
          ...prevState,
          [fieldId]: null,
        };
      });
    } else {
      setErrors((prevState) => {
        return {
          ...prevState,
          [fieldId]: field.message,
        };
      });
    }
  };

  const handleOnBlur = (e) => {
    if (e.target.id === EMAIL_ID) {
      const emailValidation = validateEmail(emailRef?.current?.value);
      handleOnSetErrors(e.target.id, emailValidation);
    }

    if (e.target.id === PASSWORD_ID) {
      const passwordValidation = validatePassword(passwordRef?.current?.value);
      handleOnSetErrors(e.target.id, passwordValidation);
    }

    if (e.target.id === FULL_NAME_ID) {
      const isValid =
        fullNameRef?.current?.value && fullNameRef?.current?.value.length > 0;

      handleOnSetErrors(
        e.target.id,
        isValid ? { valid: true } : { valid: false, message: "Required" }
      );
    }
  };

  const createUser = async () => {
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
    } catch (err) {
      setAuthError(err.code);
    }
  };

  const loginInUser = async () => {
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
    } catch (err) {
      setAuthError(err.code);
    }
  };

  const handleOnSubmit = () => {
    if (type === "signin" && !errors[EMAIL_ID] && !errors[PASSWORD_ID])
      loginInUser();

    if (
      type === "signup" &&
      !errors[EMAIL_ID] &&
      !errors[PASSWORD_ID] &&
      !errors[FULL_NAME_ID]
    )
      createUser();
  };

  const renderError = (id) => {
    return (
      errors[id] && (
        <Form.Text className="error-message mt-1 d-block">
          <FontAwesomeIcon icon={faCircleXmark} /> {errors[id]}
        </Form.Text>
      )
    );
  };

  return (
    <div className="container-fluid position-absolute h-100 bg-black bg-opacity-50">
      <div className="row">
        <div className="col-9 col-sm-8 col-md-7 col-lg-6 col-xl-5 form-card mx-auto bg-black bg-opacity-75 rounded-2">
          <h1 className="text-light mb-4">
            {type === "signin" ? "Sign In" : "Sign Up"}
          </h1>
          {type === "signup" && (
            <FloatingLabel className="mb-3 text-white" label="Full Name">
              <Form.Control
                id={FULL_NAME_ID}
                ref={fullNameRef}
                className="bg-black bg-opacity-75 text-light"
                type="text"
                placeholder="Full Name"
                onBlur={handleOnBlur}
              />
              {renderError(FULL_NAME_ID)}
            </FloatingLabel>
          )}
          <FloatingLabel className="mb-3 text-white" label="Email">
            <Form.Control
              id={EMAIL_ID}
              ref={emailRef}
              className="bg-black bg-opacity-75 text-light"
              type="email"
              placeholder="Email"
              onBlur={handleOnBlur}
            />
            {renderError(EMAIL_ID)}
          </FloatingLabel>
          <FloatingLabel className="mb-3 text-white" label="Password">
            <Form.Control
              id={PASSWORD_ID}
              ref={passwordRef}
              className="bg-black bg-opacity-75 text-light"
              type="password"
              placeholder="Password"
              onBlur={handleOnBlur}
            />
            {renderError(PASSWORD_ID)}
          </FloatingLabel>
          <Button className="w-100 btn-submit" onClick={handleOnSubmit}>
            {type === "signin" ? "Sign In" : "Sign Up"}
          </Button>
          {authError && <div className="error-message mt-1">{authError}</div>}
          {type === "signin" && (
            <div className="text-light mt-4">
              New to Netflix?{" "}
              <Link className="text-light" to="/signup">
                Sign up now.
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserForm;
