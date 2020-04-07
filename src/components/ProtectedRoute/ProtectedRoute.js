import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

const ProtectedRoute = ({component: Component, userInfo, ...rest}) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (localStorage.getItem('userToken')) {
            return <Component {...props}/>;
          } else{
            localStorage.removeItem('userToken');
            return (<Redirect to="/login"/>)
          }
        }}/>
    )
};

const mapStateToProps = ({userInfo}) => {
  return {
    userInfo
  }
};

export default connect(mapStateToProps)(ProtectedRoute);