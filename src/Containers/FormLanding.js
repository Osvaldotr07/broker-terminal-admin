import React, { useState, useCallback, useEffect } from 'react'
import * as yup from 'yup';
import { connect } from 'react-redux'
import { handleDataSubmit } from '../actions/index'

import { Grid, Row, Column } from 'carbon-components-react';
import UserInfoForm from '../Components/StepsOfFormComponents/UserInfoForm'
import TermsForm from '../Components/StepsOfFormComponents/TermsForm'
import CompanyForm from '../Components/StepsOfFormComponents/CompanyForm'
import CompanyAddress from '../Components/StepsOfFormComponents/CompanyAddress'
import ConfirmationData from '../Components/StepsOfFormComponents/ConfirmationData'
import ProgressIndicatorComponent from '../Components/ProgressIndicatorComponent'

//data
import formFiledDefatult from '../utils/dataForm'

//schema
import { UserInfoSchema, CompanyName, CompanyAddressSchema } from '../Schemas/formSchema'

const FormLanding = ({ item }) => {
    const [step, setStep] = useState(4)
    const [formData, setFormData] = useState(window.location.pathname === '/edit' ? item[0] : formFiledDefatult)

    const nextStep = () => setStep((prev) => prev + 1)
    const backStep = () => setStep((prev) => prev - 1)

    const handleSubmit = (values, direction) => {
        setFormData(values)
        direction === 'back' ? backStep() : nextStep()
    }

    // useEffect(() => {
    //     setFormData(window.location.pathname === '/edit' ? item[0] : formFiledDefatult)
    // }, [formData])

    const validationUserInfo = formData.validate ? UserInfoSchema : null
    const validateTerms = formData.validate ? yup.object({
        terms: yup
            .boolean()
            .oneOf([true], 'Necesitas aceptar los terminos y condiciones')

    }) : null
    const validateCompany = formData.validate ? CompanyName : null
    const validateAddresss = formData.validate ? CompanyAddressSchema : null 

    const handleStep = useCallback((value) => {
        switch (value) {
            case 0:
                return (
                    <TermsForm
                        setFormData={setFormData}
                        formData={formData}
                        validationSchema={validateTerms}
                        handleSubmit={handleSubmit}
                        onBack={backStep}
                        step={step}
                        nextStep={nextStep} 
                        isConfirm={false}
                        />
                )
            case 1:
                return (
                    <UserInfoForm
                        setFormData={setFormData}
                        formData={formData}
                        validationSchema={validationUserInfo}
                        handleSubmit={handleSubmit}
                        onBack={backStep}
                        step={step}
                        nextStep={nextStep} 
                        isConfirm={false}
                        />
                )
            case 2:
                return <CompanyForm
                    setFormData={setFormData}
                    formData={formData}
                    validationSchema={validateCompany}
                    handleSubmit={handleSubmit}
                    onBack={backStep}
                    step={step}
                    nextStep={nextStep} 
                    isConfirm={false}
                    />
            case 3:
                return <CompanyAddress
                    setFormData={setFormData}
                    formData={formData}
                    validationSchema={validateAddresss}
                    handleSubmit={handleSubmit}
                    onBack={backStep}
                    step={step}
                    nextStep={nextStep}
                    isConfirm={false}
                />
            case 4:
                return <ConfirmationData
                formData={formData}
                validationSchemaUser={validationUserInfo}
                validationSchemaCompany={validateCompany}
                validationSchemaAddress={validateAddresss}
                handleSubmit={handleSubmit}
                step={step}
                onBack={backStep}
                />

            default: 
                    return null
        }
    })

    return (
        <>
            <Grid style={{ margin: '10px' }}>
                <Row>
                    {/* <Column sm={2} md={2} lg={4}>
                        <ProgressIndicatorComponent vertical step={step} spaceEqually />
                    </Column> */}
                    <Column >
                        {handleStep(step)}
                    </Column>
                </Row>
            </Grid>
        </>
    )
}

  
  const mapStateToProps = (state) => {
    return {
      item:  (state.itemFiltered || {}),
    };
  };



export default connect(mapStateToProps)(FormLanding) 