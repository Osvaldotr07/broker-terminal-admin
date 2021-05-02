import React, {useState, useEffect} from 'react'
import { getForms, deleteForm, dataToUpdate } from "../actions/index";

import { connect } from 'react-redux'
import headersInTablet from '../utils/headers'
import FormTable from './FormTable'

const FormTableWrapper = ({getForms, tk, email}) => {
    const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      let infoForms = await  getForms(tk, email);
      console.log(infoForms)
      let formFixed = infoForms.data
      ? infoForms.data?.map((item) => {
          return {
            id: item._id,
            companyName: item.companyName,
            name: item.name,
            status: item.status,
            userEmail: item.userEmail,
          };
        })
      : [];
      setRows(formFixed);
    })()
  }, rows );
    return (
        <div style={{'margin-top': 100}}>
            <FormTable 
                title="Solicitudes enviadas a revisar"
                isDraft={true}
                rows={rows.filter(item => item.status === 'Enviado')}
                headers={headersInTablet.cabecerasEnviadas}
            />
            <br/>
            <FormTable 
                title="Solicitudes aceptadas"
                isDraft={true}
                rows={rows.filter(item => item.status === 'aceptar')}
                headers={headersInTablet.cabecerasPreguardadas}
            />
            <br/>
            <FormTable 
                title="Solicitudes rechazadas"
                isDraft={true}
                rows={rows.filter(item => item.status === 'rechazar')}
                headers={headersInTablet.cabecerasPreguardadas}
            />
        </div>
    )
}

const mapDispatchToProps = {
    getForms,
    deleteForm,
    dataToUpdate,
  };
  
  const mapStateToProps = (state) => {
    return {
      forms: state.forms ? state.forms : [],
      tk: state.data.token,
      email: state.data.user.email,
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(FormTableWrapper)