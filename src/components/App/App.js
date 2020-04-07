import React, {Component} from 'react';
import LoginPage from "../LoginPage";
import {Route, Switch} from 'react-router-dom';
import ProtectedRoute from "../ProtectedRoute";
import {onTokenLoaded} from "../../actions";
import HomePage from "../HomePage";
import {connect} from "react-redux";
import Header from "../Header";
import 'antd/es/form/style/index.css';
import FavoriteModal from "../FavoriteModal";
import FavoritePage from "../FavoritePage";
import './App.scss';

class App extends Component {

  componentDidMount() {
    this.props.onTokenLoaded();
  }

  render() {
    return (
      <React.Fragment>
        <Header/>
        <div className='container'>
          <Switch>
            <Route path='/login' component={LoginPage}/>
            <ProtectedRoute path='/' exact component={HomePage}/>
            <ProtectedRoute path='/favorite' exact component={FavoritePage}/>
            <ProtectedRoute path='*' component={HomePage}/>
          </Switch>
        </div>
        <FavoriteModal/>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTokenLoaded: () => dispatch(onTokenLoaded())
  }
};

const mapStateToProps = ({userInfo}) => {
  return {
    userInfo
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);