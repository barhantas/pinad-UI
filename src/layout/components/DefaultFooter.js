import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

class DefaultFooter extends React.Component {
  render() {
    return (
      <Footer className="layout-footer">
        Barış Hantaş 2018 React - Antd - Router - Rest-Auth Boilerplate
      </Footer>
    );
  }
}

export default DefaultFooter;
