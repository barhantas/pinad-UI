import { RestBaseModel } from 'rest-in-model';

class Message extends RestBaseModel {
  getConfig() {
    return {
      fields: {
        id: { map: '_id' },
        context: {},
      },

      // Normally you don't need to do this. But sometimes back-end doesn't/can't give what you want...
      // You can get any child from response as result list to convert if you need.
      resultListField: (response) => response, //response.result,
      paths: {
        default: '/api/messages ',
      },
      //endpointName: '',
      //apiPathName: '',
    };
  }
}

export default Message;
