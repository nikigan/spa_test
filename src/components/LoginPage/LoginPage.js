import React from 'react';
import 'antd/es/input/style/index.css';
import 'antd/es/button/style/index.css';
import './LoginPage.scss';
import {Loading, Message} from 'element-react';
import {Button, Form, Input} from 'antd';
import {withRouter} from 'react-router-dom';
import {onUserLogIn} from "../../actions";
import sibdevLogo from '../../assets/svg/sibdev-logo.svg'
import {connect} from 'react-redux';

class LoginPage extends React.Component {

  #alreadyAuth = () => {
    Message({
      message: 'Вы уже авторизованы как ' + this.props.userInfo?.login,
      type: 'warning'
    });
    this.props.history.push('/');
  };

  componentDidMount() {
    if (this.props.userInfo) {
      this.#alreadyAuth();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userInfo !== this.props.userInfo) {
      this.#alreadyAuth();
    }
  }

  onSubmit = ({login, password}) => {
    this.props.onUserLogIn(login, password);
  };

  render() {
    const {auth: {loading}} = this.props;

    return (
      <div className="login-page container">
        <div className='row justify-content-center align-content-center vh-100'>
          <div className='login-wrapper col-6'>
            <img className='login-logo' src={sibdevLogo} alt='logo'/>
            <h4 className="text-center form-header">Вход</h4>
            <Form
              name="basic"
              layout="vertical"
              onFinish={this.onSubmit}>

              <Form.Item
                label="Логин"
                name="login"
                rules={[{required: true, message: 'Введите логин!'}]}>
                <Input/>
              </Form.Item>

              <Form.Item
                label="Пароль"
                name="password"
                rules={[{required: true, message: 'Введите пароль!'}]}
              >
                <Input.Password/>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className='login-button'>
                  Войти
                </Button>
                {loading && <Loading fullscreen text='Авторизация...'/>}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({userInfo, auth}) => {
  return {
    userInfo,
    auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserLogIn : (login, password) => dispatch(onUserLogIn(login, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
