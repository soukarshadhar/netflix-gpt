import { useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/validate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { updateFormValue, updateFormError } from "../../store/form";
import {
  FORM_FIELD_TYPE,
  buildFormConfig,
  SIGN_IN_LABEL,
  SIGN_UP_LABEL,
  FORM_TYPE,
} from "../../utils/constants";

const UserForm = ({ type }) => {
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const form = useSelector((state) => state.form);

  const handleOnBlur = (e) => {
    if (e.target.id === FORM_FIELD_TYPE.email) {
      const { valid, message } = validateEmail(
        form[FORM_FIELD_TYPE.email].value
      );
      dispatch(
        updateFormError({ id: e.target.id, value: valid ? null : message })
      );
    }

    if (e.target.id === FORM_FIELD_TYPE.password) {
      const { valid, message } = validatePassword(
        form[FORM_FIELD_TYPE.password].value
      );
      dispatch(
        updateFormError({ id: e.target.id, value: valid ? null : message })
      );
    }

    if (e.target.id === FORM_FIELD_TYPE.name) {
      const isValid = form[FORM_FIELD_TYPE.name].value.length > 0;
      dispatch(
        updateFormError({ id: e.target.id, value: isValid ? null : "Required" })
      );
    }
  };

  const createUser = async () => {
    try {
      if (!state?.skipExistingEmailCheck) {
        const docRef = doc(db, "users", form[FORM_FIELD_TYPE.email].value);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(
            updateFormError({
              id: FORM_FIELD_TYPE.email,
              value: "Email ID already exist",
            })
          );
          return;
        }
      }

      const { user } = await createUserWithEmailAndPassword(
        auth,
        form[FORM_FIELD_TYPE.email].value,
        form[FORM_FIELD_TYPE.password].value
      );

      await updateProfile(user, {
        displayName: form[FORM_FIELD_TYPE.name].value,
      });
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
      await signInWithEmailAndPassword(
        auth,
        form[FORM_FIELD_TYPE.email].value,
        form[FORM_FIELD_TYPE.password].value
      );
      navigate("/browse");
    } catch (err) {
      setAuthError(err.code);
    }
  };

  const handleOnSubmit = () => {
    if (
      type === FORM_TYPE.signIn &&
      !form[FORM_FIELD_TYPE.email].error &&
      !form[FORM_FIELD_TYPE.password].error
    )
      loginInUser();

    if (
      type === FORM_TYPE.signUp &&
      !form[FORM_FIELD_TYPE.email].error &&
      !form[FORM_FIELD_TYPE.password].error &&
      !form[FORM_FIELD_TYPE.name].error
    )
      createUser();
  };

  const handleOnChange = (e) => {
    if (
      e.target.id === FORM_FIELD_TYPE.email ||
      e.target.id === FORM_FIELD_TYPE.name ||
      e.target.id === FORM_FIELD_TYPE.password
    ) {
      dispatch(updateFormValue({ id: e.target.id, value: e.target.value }));
    }
  };

  const formInputs = buildFormConfig(type);

  return (
    <div className="h-100 w-100 form-container">
      <div className="form-card mx-auto bg-black bg-opacity-75 rounded-3">
        <h1 className="text-light mb-4">
          {type === FORM_TYPE.signIn ? SIGN_IN_LABEL : SIGN_UP_LABEL}
        </h1>
        {formInputs.map((input, index) => {
          return (
            <FloatingLabel
              key={input.id}
              className={`${index !== 0 ? "mt-3 " : ""}text-white`}
              label={input.label}
            >
              <Form.Control
                id={input.id}
                className="bg-black bg-opacity-75 text-light"
                type="text"
                placeholder={input.label}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                value={form[input.id].value}
              />
              {form[input.id].error && (
                <Form.Text className="error-message mt-1 d-block">
                  <FontAwesomeIcon icon={faCircleXmark} />{" "}
                  {form[input.id].error}
                </Form.Text>
              )}
            </FloatingLabel>
          );
        })}
        <Button className="w-100 btn-submit mt-3" onClick={handleOnSubmit}>
          {type === FORM_TYPE.signIn ? SIGN_IN_LABEL : SIGN_UP_LABEL}
        </Button>
        {authError && <div className="error-message mt-1">{authError}</div>}
        {type === FORM_TYPE.signIn && (
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
