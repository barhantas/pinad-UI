import './index.css';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions';
import { Button, Input, message } from 'antd';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChangeLoginForm = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickLoginButton = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const userData = {
      username: username,
      password: password,
    };
    if (username.length && password.length) {
      this.props.login(userData);
    } else {
      message.error('Please fill the blank fields');
    }
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    let { isAuthenticated } = this.props;
    if (isAuthenticated) return <Redirect to={from} />;
    return (
      <div>
        Login Page
        <Input
          name="username"
          placeholder="username"
          onChange={(e) => this.handleChangeLoginForm(e)}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => this.handleChangeLoginForm(e)}
        />
        <Button htmlType="submit" onClick={this.handleClickLoginButton}>
          Login
        </Button>
      </div>
    );
  }
}

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.rootReducer.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (userData) => dispatch(login(userData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
