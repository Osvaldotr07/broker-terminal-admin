import React from "react";

//Componentes
import { Column, Grid, Row, Button } from "carbon-components-react";
import { Field } from "formik";

import { TextInputForm } from "../FormsComponets";
import { connect } from "react-redux";
import { TitleArticle } from "../../assets/styles/General-styles";



import WrapperForm from "../WrapperForm";

const UserInfoForm = (
  {
    setFormData,
    formData,
    validationSchema,
    onBack,
    handleSubmit,
    step,
    nextStep,
    isConfirm,
    email,
    createOneForm,
    updateOneForm,
    sendUserEmail,
    tk
  }
) => {
  return (
    <>
      
      <WrapperForm
        validationSchema={validationSchema}
        formData={formData}
        step={step}
        onBack={onBack}
        nextStep={nextStep}
        handleSubmit={handleSubmit}
        setFormData={setFormData}
        isConfirm={isConfirm}
        title="Información del usuario"
      >
        <Grid>
          <Row>
            <Column>
              <div className="form-fieldset">
                <div className="form-field">
                  <Field
                    style={{ width: "300px" }}
                    handleSubmit={handleSubmit}
                    autoFocus
                    labelText="Nombre"
                    name="name"
                    component={TextInputForm}
                  />
                </div>
              </div>
            </Column>
            <Column>
              <div className="form-fieldset">
                <div className="form-field">
                  <Field
                    style={{ width: "300px" }}
                    labelText="Apellido"
                    name="lastName"
                    component={TextInputForm}
                  />
                </div>
              </div>
            </Column>
          </Row>
          <Row>
            <Column>
              <div className="form-fieldset">
                <div className="form-field">
                  <Field
                    style={{ width: "300px" }}
                    labelText="Numero de teléfono"
                    name="phoneNumberUser"
                    component={TextInputForm}
                  />
                </div>
              </div>
            </Column>
            <Column>
              <div className="form-fieldset">
                <div className="form-field">
                  <Field
                    style={{ width: "300px" }}
                    labelText="Rol de trabajo"
                    name="jobTitle"
                    component={TextInputForm}
                  />
                </div>
              </div>
            </Column>
          </Row>
          <Row>
            <Column>
              <div className="form-fieldset">
                <div className="form-field">
                  <Field
                    style={{ width: "300px" }}
                    labelText="Correo electrónico"
                    name="userEmail"
                    value={email}
                    component={TextInputForm}
                  />
                </div>
              </div>
            </Column>
            <Column>
              <div className="form-fieldset">
                <div className="form-field">
                  <Field
                    style={{ width: "300px" }}
                    labelText="Fecha de aplicación"
                    name="applicationDate"
                    value={new Date()}
                    tabIndex="-1"
                    component={TextInputForm}
                  />
                </div>
              </div>
            </Column>
          </Row>
          <TitleArticle>Información del presidente de la compañía</TitleArticle>
          <Row>
            <Column>
              <div className="form-fieldset">
                <div className="form-field">
                  <Field
                    style={{ width: "300px" }}
                    labelText="Nombre"
                    name="ownerName"
                    component={TextInputForm}
                  />
                </div>
              </div>
            </Column>
            <Column>
              <div className="form-fieldset">
                <div className="form-field">
                  <Field
                    style={{ width: "300px" }}
                    labelText="Apellido"
                    name="ownerLastName"
                    component={TextInputForm}
                  />
                </div>
              </div>
            </Column>
          </Row>
          <Row>
            <Column>
              <div className="form-fieldset">
                <div className="form-field">
                  <Field
                    style={{ width: "300px" }}
                    labelText="Numero de teléfono"
                    name="phoneOwner"
                    component={TextInputForm}
                  />
                </div>
              </div>
            </Column>
            <Column>
              <div className="form-fieldset">
                <div className="form-field">
                  <Field
                    style={{ width: "300px" }}
                    labelText="Correo electrónico"
                    name="ownerEmail"
                    component={TextInputForm}
                  />
                </div>
              </div>
            </Column>
          </Row>
        </Grid>
      </WrapperForm>
    </>
  );
};



const mapStateToProps = ({ data }) => {
  return {
    email: data.user.email,
    tk: data.token,
  };
};

export default connect(mapStateToProps, null)(UserInfoForm);
