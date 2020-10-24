import React from 'react'
import { connect } from 'react-redux'
//Components
import { Header, Article } from '../Components/Header'

const Home = ({isLogged}) => {
  return (
    <div style={{overflowX: 'hidden'}}>
      <Header isLogged={isLogged} />
      <Article />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLogged: (state.user ? state.user.id : undefined)
  }
}

export default connect(mapStateToProps, null)(Home)