import React, {Component} from 'react';
import sibdevLogo from '../../assets/svg/sibdev-logo.svg';
import {onUserLoggedOut} from "../../actions";
import './Header.scss';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {Button} from "antd";

class Header extends Component {
  render() {
    const {userInfo, onUserLoggedOut} = this.props;

    if (!userInfo) return null;
    
    return (
      <div className='header'>
        <div className="container">
          <div className='row'>
            <img className='header-logo' src={sibdevLogo} alt="logo"/>
            <div className='header-menu'>
              <NavLink activeClassName='active' exact to='/' className='menu-item'>Поиск</NavLink>
              <NavLink activeClassName='active' to='/favorite' className='menu-item'>Избранное</NavLink>
            </div>
            <div className='last-item'>
              <span className='user-name'>Пользователь:
                <span className='user-login'> {userInfo.login}</span>
              </span>
              <Button
                type='link'
                onClick={onUserLoggedOut}
              className='exit-button'>Выход</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({userInfo}) => {
  return {
    userInfo
  }
};

export default connect(mapStateToProps, {onUserLoggedOut})(Header);