import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import { TitleArticle } from "../../assets/styles/General-styles";
import { TextInputForm } from "../FormsComponets";
import { Button, Loading } from "carbon-components-react";
import { LoginSchema } from "../../Schemas/formSchema";
import ReCAPTCHA from "react-google-recaptcha";
import SweetAlert from "sweetalert2-react";
//redux
import { connect } from "react-redux";

//actions
import { loginUser } from "../../actions";

const LoginForm = ({ loginUser, isLogged, err }) => {
  const initialData = {
    email: "",
    password: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState("");
  const [reCaptRes, setReCaptRes] = useState(false);
  const [show, setShow] = useState(false);
  const reRef = useRef();

  useEffect(() => {
    window.localStorage.clear();
    setIsLoading(false);
  }, [isLoading]);

  let _reCaptchaRef = React.createRef();

  const handleChange = async(value) => {
    console.log(value)
    let catResponse = await fetch("https://evening-chamber-26239.herokuapp.com/api/auth/toke-recaptcha", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        tokenRecapcha: value,
      }),
    });
    let response = await catResponse.json();
    await Promise.resolve(setReCaptRes(response.data.success));
    
    // if value is null recaptcha expired
  };

  const asyncScriptOnLoad = () => {
    console.log("scriptLoad - reCaptcha Ref-", _reCaptchaRef);
  };

  return (
    <div className="form-container">
      <SweetAlert
        show={show}
        title="Alert"
        text="Rellenar Recaptcha"
        onConfirm={() => setShow(false)}
      />
      <Formik
        initialValues={initialData}
        validationSchema={LoginSchema}
        onSubmit={async (values, actions, errors) => {
          try {
            localStorage.clear();
            console.log(reCaptRes)
            if(reCaptRes){
              setIsLoading(true);
              await Promise.resolve(loginUser(values, "/myforms"));
            }
            errors ? setIsError(true) : setIsError(false);
          } catch (err) {
            console.log(err)
            setIsLoading(false);
          }
        }}
      >
        {({ values, validateForm }) => (
          <>
            <TitleArticle>Iniciar sesión</TitleArticle>
            <Form>
              {!isLoading ? (
                <>
                  <div className="form-fieldset">
                    <div className="form-field">
                      <Field
                        style={{ width: "300px" }}
                        autoFocus
                        labelText="Usuario"
                        name="email"
                        component={TextInputForm}
                      />
                    </div>
                  </div>
                  <div className="form-fieldset">
                    <div className="form-field">
                      <Field
                        style={{ width: "300px" }}
                        type="password"
                        autoFocus
                        labelText="Contraseña"
                        name="password"
                        component={TextInputForm}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <Loading />
              )}

              <ReCAPTCHA
                sitekey="6LdEj34aAAAAAAKb6ss7rY1aI6ACspotggVpHZvx"
                onChange={handleChange}
                asyncScriptOnLoad={asyncScriptOnLoad}
                ref={_reCaptchaRef}
                style={{ margin: "15px 0" }}
              />
              <>
                <Button
                  style={{ marginLeft: "10px" }}
                  kind="primary"
                  type="submit"
                  onClick={async () => {
                    !reCaptRes ? setShow(true) : setShow(false);
                  }}
                >
                  Enviar
                </Button>
                {/* <Link to="/register">
                  <Button
                    style={{ marginLeft: "10px" }}
                    kind="primary"
                    type="submit"
                  >
                    Crear cuenta
                  </Button>
                </Link> */}
              </>
            </Form>
            {err ? (
              <p style={{ color: "red", marginTop: 10 }}>
                Usuario o contraseña incorrectos
              </p>
            ) : null}
          </>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
  loginUser,
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.user,
    err: state.err,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
