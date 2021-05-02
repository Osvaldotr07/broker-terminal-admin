import React, {useState, useEffect} from 'react'
import axios from 'axios'
//Componentes
import {
    Select, 
    SelectItem, 
    SelectItemGroup
} from 'carbon-components-react'

import { Formik, Field, Form } from 'formik'
import { connect } from 'react-redux'
import { createOneForm, updateOneForm, sendUserEmail } from '../../actions/index'
import { TitleArticle } from "../../assets/styles/General-styles";
//Components
import UserInfoForm from './UserInfoForm'
import CompanyAddress from './CompanyAddress'
import CompanyForm from './CompanyForm'

const ConfirmationData = (
    {
        formData,
        validationSchemaUser,
        validationSchemaCompany,
        validationSchemaAddress,
        createOneForm,
        updateOneForm,
        tk,
        email,
        sendUserEmail,
        step
    }
) => {
    const [isLoading, setIsLoading] = useState(false)
    return (
        <>
            <div style={{ marginTop: 70, maxWidth: 1000 }} className="form-container">
                        <TitleArticle>Elige la opción para cambiar el estatus</TitleArticle>
                        <Select id="select-1" defaultValue="placeholder-item" labelText='Cambiar estatus' onChange={async (evt) => {
                            console.log(formData)
                            formData.status = evt.target.value
                            let response = await axios('api/forms/updateForm',{
                                method: 'put',
                                headers: {
                                    "Content-type": "application/json",
                                    Authorization: `Bearer ${tk}`
                                },
                                data: formData
                            })
                            console.log(response)
                            if(response.status === 200) {
                                console.log('Se ha cambiado correctamente')
                                window.location.href = '/myForms'
                            }
                        }}>
                            <SelectItem
                            disabled
                            hidden
                            value="placeholder-item"
                            text="Estatus"
                            />
                            <SelectItem value="aceptar" text="Aceptar" />
                            <SelectItem value="rechazar" text="Rechazar" />
                            <SelectItem value="pendiente" text="Validando" />
                            <SelectItem value="pendiente" text="Esperando" />
                        </Select>
                    </div>
            {
                !isLoading ?
                    <>
                        
                        <UserInfoForm formData={formData} validationSchema={validationSchemaUser} isConfirm={true}/>
                        <CompanyForm formData={formData} validationSchema={validationSchemaCompany} isConfirm={true}/>
                        <CompanyAddress formData={formData} validationSchema={validationSchemaAddress} isConfirm={true}/>
                    </>
                : null
            }

           <Formik
            initialValues={formData}
            onSubmit={(values) => {
                setIsLoading(true)
                values.userEmail = email
                values.applicationDate = new Date()
                values.status = 'Enviado'
                sendUserEmail(email, tk)
                window.location.pathname === '/edit' ? updateOneForm(values, '/myforms', tk) : createOneForm(values, '/myforms', tk)
            }}
           >
               {({handleSubmit, isSubmiting}) => (
                <Form>
                </Form>
               )}

           </Formik>
        </>
    )
}

const mapDispatchToProps = {
    createOneForm,
    updateOneForm,
    sendUserEmail
}

const mapStateToProps = (state) => {
    return {
        tk: state.data.token,
        email: state.data.user.email,
        filtered: (state.itemFiltered || {}) 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationData)