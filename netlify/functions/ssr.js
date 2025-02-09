const server = require('../../dist/angular-cms-server/main');

exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    server.app.handle(event, {
      send: (body) => resolve({ statusCode: 200, body }),
      setHeader: () => {},
    });
  });
};
