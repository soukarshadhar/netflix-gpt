import { useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/validate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../store/form";
import {
  FORM_EMAIL_ID,
  FORM_PASSWORD_ID,
  FORM_NAME_ID,
} from "../../utils/constants";

const UserForm = ({ type = "signin" }) => {
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, email, password } = useSelector((state) => state.form);

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
    if (e.target.id === FORM_EMAIL_ID) {
      const emailValidation = validateEmail(email);
      handleOnSetErrors(e.target.id, emailValidation);
    }

    if (e.target.id === FORM_PASSWORD_ID) {
      const passwordValidation = validatePassword(password);
      handleOnSetErrors(e.target.id, passwordValidation);
    }

    if (e.target.id === FORM_NAME_ID) {
      const isValid = name.length > 0;

      handleOnSetErrors(
        e.target.id,
        isValid ? { valid: true } : { valid: false, message: "Required" }
      );
    }
  };

  const createUser = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "users", user.email), {
        uid: user.uid,
        displayName: user.displayName,
      });
      navigate("/browse");
    } catch (err) {
      setAuthError(err.code);
    }
  };

  const loginInUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/browse");
    } catch (err) {
      setAuthError(err.code);
    }
  };

  const handleOnSubmit = () => {
    if (
      type === "signin" &&
      !errors[FORM_EMAIL_ID] &&
      !errors[FORM_PASSWORD_ID]
    )
      loginInUser();

    if (
      type === "signup" &&
      !errors[FORM_EMAIL_ID] &&
      !errors[FORM_PASSWORD_ID] &&
      !errors[FORM_NAME_ID]
    )
      createUser();
  };

  const handleOnChange = (e) => {
    if (
      e.target.id === FORM_EMAIL_ID ||
      e.target.id === FORM_NAME_ID ||
      e.target.id === FORM_PASSWORD_ID
    ) {
      dispatch(updateForm({ [e.target.id]: e.target.value }));
    }
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
    <div className="h-100 w-100 form-container">
      <div className="form-card mx-auto bg-black bg-opacity-75 rounded-3">
        <h1 className="text-light mb-4">
          {type === "signin" ? "Sign In" : "Sign Up"}
        </h1>
        {type === "signup" && (
          <FloatingLabel className="mb-3 text-white" label="Name">
            <Form.Control
              id={FORM_NAME_ID}
              className="bg-black bg-opacity-75 text-light"
              type="text"
              placeholder="Name"
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              value={name}
            />
            {renderError(FORM_NAME_ID)}
          </FloatingLabel>
        )}
        <FloatingLabel className="mb-3 text-white" label="Email">
          <Form.Control
            id={FORM_EMAIL_ID}
            className="bg-black bg-opacity-75 text-light"
            type="email"
            placeholder="Email"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            value={email}
          />
          {renderError(FORM_EMAIL_ID)}
        </FloatingLabel>
        <FloatingLabel className="mb-3 text-white" label="Password">
          <Form.Control
            id={FORM_PASSWORD_ID}
            className="bg-black bg-opacity-75 text-light"
            type="password"
            placeholder="Password"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            value={password}
          />
          {renderError(FORM_PASSWORD_ID)}
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
  );
};

export default UserForm;
