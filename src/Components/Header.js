import React from 'react'
import { ImageWrapper, Image, Title, TitleArticle, Wrapper, Description } from '../assets/styles/General-styles'
// import { Button } from 'carbon-components-react'
// import { Login20 } from '@carbon/icons-react';

import Logo from '../assets/images/ICPO-MKT-HomePage-max-carousel.jpg'
import '../assets/styles/Header.css'
// import { Link } from 'react-router-dom'


export const Header = ({isLogged}) => (
  <>
    <div className="bx--grid grid" style={{margin:0}}>
      <div className="bx--row">
        <div className="bx--col bx--col-sm-4" style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
          <div className="header__wrapper_info" style={{marginTop: '70px'}}>
            <Title>Aplicación Broker de IBM para administradores</Title>
            <div className="header__wrapper_description" >
              {/* <h3>
                Una forma mas rapida de poder hacer el proceso, <br />
                para poder vender productos tecnologícos de IBM
              </h3> */}
            </div>
              {/* {
                isLogged ? 
                  <Link to="/register">
                    <Button>
                      Registrate <Login20 style={{ fontSize: 16 }} />
                    </Button>
                  </Link>
                  :
                  null
              } */}
          </div>
        </div>
        <div className="bx--col" style={{ padding: 0 }}>
          <ImageWrapper>
            <Image src={Logo} style={{height: '80vh'}}/>
          </ImageWrapper>
        </div>
      </div>
    </div>
  </>
);

// export const Article = ({isLogged}) => (
//   <>
//     <div className="bx--grid">
//       <div className="bx--row">
//         <div className="bx--col" style={{display: 'flex', justifyContent:'flex-start', alignItems:'center', marginTop: 50}}>
//           <Description>Visión general</Description>
//         </div>
//         <div className="bx--col">
//           <Wrapper>
//             <TitleArticle>¿Que es usar la aplicación de broker de IBM?</TitleArticle>
//             <Description>IBM cuenta con una infinidad de servicios los cuales puede brindar y prestar a otras empresas, la aplicación de bróker ayuda a poder realizar un proceso de solicitud de manera más fácil y eficiente. Se necesita realizar el llenado de un formulario el cual será enviado a nuestro validadores los cuales se encargarán de revisar la información enviada para poder aceptar que la empresa registrada es óptima para poder revender los productos de hardware de IBM</Description>
//           </Wrapper>
//         </div>
//       </div>
//     </div>
//   </>
// );