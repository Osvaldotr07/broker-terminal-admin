import React from "react";
import { LineChart, PieChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import { connect } from 'react-redux'

const StaticsContainer = ({forms}) => {
  let n = 0;
  const dias = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ];

  let styles = 
    { marginTop: 70, 
      maxWidth: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      gap: 10,
      flexDirection: 'column'
    }
  
  let dateItems = []
  let statusCount = [{
    "group": 'Aceptar',
    "value": 0
  },

  {
    "group": "Rechazar",
    "value": 0
  }
]
  forms.forEach(item => {
    
    dateItems.push({
      "group": "2020 - 2021",
      "date": item.applicationDate,
      "value": new Date(item.applicationDate).getDay(),
      "surplus": 77251122.48734318
    })

    switch(item.status){
      case 'aceptar':
        statusCount[0].value += 1
        break
      case 'rechazar':
        statusCount[1].value += 1
        break
      default:
        break
    }
  })

  let optionsPie =  {
    "title": "Fomularios aceptados y rechazados",
    "resizable": true,
    "height": "400px"
  }

  
  let options = {
    "title": "Formularios enviados       ",
    "axes": {
      "bottom": {
        "title": "Historia de formularios enviados",
        "mapsTo": "date",
        "scaleType": "time"
      },
      "left": {
        "mapsTo": "value",
        "title": "Dias de la semana",
        "scaleType": "linear"
      }
    },
    "curve": "curveMonotoneX",
    "height": "400px"
  }

  return (
    <>
      <div style={styles} className="form-container">
        <h1>Hello world</h1>
        <LineChart
          data = {dateItems}
          options = {options}
          
        />
        <PieChart 
          data={statusCount}
          options={optionsPie}
        />
      </div>
    </>
  );
};

let mapStateToProps = (state) => {
  return {
    forms: state.forms.data
  }
}

export default connect(mapStateToProps, null)(StaticsContainer);
