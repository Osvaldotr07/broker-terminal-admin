import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button, Select, SelectItem, SelectItemGroup } from "carbon-components-react";
import SubmitButton from "./SubmitButton";
import { TitleArticle } from "../assets/styles/General-styles";

import { createOneForm, updateOneForm, sendUserEmail } from "../actions/index";

import { connect } from "react-redux";

const WrapperForm = ({
  formData,
  handleSubmit,
  validationSchema,
  step,
  children,
  onBack,
  setFormData,
  isConfirm,
  title,
  tk,
  createOneForm,
  updateOneForm,
  email,
}) => {
  const [direction, setDirection] = useState(null);
  console.log(step == undefined);
  return (
    <div className="form-container" style={{ marginTop: 70, maxWidth: 1000 }}>
      <Formik
        initialValues={formData}
        onSubmit={(values, actions, errors) => {
          handleSubmit(values, direction);
          errors = direction === "back" ? undefined : errors;
        }}
        validationSchema={validationSchema}
      >
        {({ validateForm, errors, setFieldValue, touched, values }) => (
          <>
            <Form noValidate="noValidate">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
              <TitleArticle>{title}</TitleArticle>

                {step !== 0 ? (
                  window.location.pathname === "/form" ? (
                    step !== undefined ? (
                      <Button
                        kind="secondary"
                        size="field"
                        onClick={() => {
                          values.status = "Preguardado";
                          values.userEmail = email;
                          createOneForm(values, "/myforms", tk);
                        }}
                      >
                        Pre-guardar
                      </Button>
                    ) : null
                  ) : step !== undefined ? (
                    <Button
                      kind="secondary"
                      size="field"
                      onClick={() => {
                        updateOneForm(values, "/myforms", tk);
                      }}
                    >
                      Actualizar
                    </Button>
                  ) : null
                ) : null}
              </div>
              {children}
              {/* <SubmitButton
                step={step}
                setDirection={setDirection}
                formData={formData}
                setFormData={setFormData}
                isConfirm={isConfirm}
              /> */}
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
  createOneForm,
  updateOneForm,
  sendUserEmail,
};

const mapStateToProps = (state) => {
  return {
    tk: state.data.token,
    email: state.data.user.email,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WrapperForm);
