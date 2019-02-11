import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Dropdown, Menu, Icon } from 'antd';
import { logout } from '../../actions';

const { Header } = Layout;

class DefaultHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.toggleSider = this.toggleSider.bind(this);
  }

  toggleSider() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Divider />
        <Menu.Item key="1" onClick={() => this.props.logout()}>
          Logout
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className="header">
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#1">
            @barhantas
            <Icon type="down" />
          </a>
        </Dropdown>
      </Header>
    );
  }
}

DefaultHeader.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.rootReducer.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  logout: (userData) => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultHeader);
