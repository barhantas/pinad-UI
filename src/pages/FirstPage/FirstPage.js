import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendMessage, loadMessages } from './actions';
import { Form, Icon, Button, Input, List } from 'antd';
import io from 'socket.io-client';
import store from '../../store';
import { SOCKET_URL } from '../../constants';

class FirstPage extends React.Component {
  componentDidMount() {
    this.props.loadMessages();
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('hi');
    });
    socket.on('message', (message) => {
      store.dispatch({ type: 'CAPTURE_MESSAGE', message });
      console.log(message.context);
    });
  }

  handleSubmit = (e) => {
    const { form, sendMessage } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        sendMessage(values.context);
        form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { messages } = this.props;
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('context', {
              rules: [
                { required: true, message: 'Please input your message!' },
              ],
            })(<Input prefix={<Icon type="code" />} placeholder="Message" />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              Send Message
            </Button>
          </Form.Item>
        </Form>
        <List
          size="small"
          //header={<div>Header</div>}
          //footer={<div>Footer</div>}
          bordered
          dataSource={messages}
          renderItem={(item) => <List.Item>{item.context}</List.Item>}
        />
      </React.Fragment>
    );
  }
}

FirstPage.propTypes = {
  loadMessages: PropTypes.func,
  messages: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    messages: state.messageReducer.messages,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (context) => dispatch(sendMessage(context)),
  loadMessages: (context) => dispatch(loadMessages(context)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(FirstPage));
