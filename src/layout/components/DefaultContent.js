import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Layout } from "antd";
import DefaultContentHeader from "./DefaultContentHeader";
import { authenticate } from "../../actions";

const { Content } = Layout;

class DefaultContent extends React.Component {
  // componentWillMount() {
  //   this.props.authenticate();
  // }
  render() {
    const { content, disableContentHeader } = this.props;
    const Page = content;
    return (
      <Content className="layout-content">
        {!disableContentHeader && <DefaultContentHeader />}
        <main className={!disableContentHeader ? "content-header-visible" : ""}>
          {<Page />}
        </main>
      </Content>
    );
  }
}

DefaultContent.propTypes = {
  authenticate: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  content: PropTypes.func,
  disableContentHeader: PropTypes.bool,
  contentName: PropTypes.string
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
)(DefaultContent);
