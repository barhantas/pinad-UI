import "./index.scss";

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Layout } from "antd";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { ROUTES } from "./../routes";
import DefaultFooter from "./components/DefaultFooter";
import DefaultContent from "./components/DefaultContent";
import DefaultHeader from "./components/DefaultHeader";
import DefaultSider from "./components/DefaultSider";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import { authenticate } from "../actions";

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Layout className="layout">
          <Switch>
            <Route
              exact
              path="/login"
              key={`route-/login`}
              render={props => (
                <Layout>
                  <LoginPage {...props} />
                </Layout>
              )}
            />
            {ROUTES.map(route => (
              <Route
                exact
                path={route.path}
                key={`route-${route.path}`}
                render={props =>
                  this.props.isAuthenticated ? (
                    <React.Fragment>
                      {!route.disableHeader && <DefaultHeader />}
                      <Layout>
                        {!route.disableSider && <DefaultSider />}
                        <DefaultContent
                          content={route.component}
                          disableContentHeader={route.disableContentHeader}
                          //collapsed={collapsed}
                          contentName={route.name}
                        />
                      </Layout>
                      {!route.disableFooter && <DefaultFooter />}
                    </React.Fragment>
                  ) : (
                    <Redirect
                      to={{
                        pathname: "/login",
                        state: { from: route.path }
                      }}
                    />
                  )
                }
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

DefaultLayout.propTypes = {
  authenticate: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.rootReducer.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authenticate())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);
