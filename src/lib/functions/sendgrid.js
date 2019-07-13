// https://github.com/ndethore/lambda-sendgrid-mailinglist-api
require("dotenv").config();
const client = require("@sendgrid/client");

exports.handler = function(event, context, callback) {
  const reqBody = JSON.parse(event.body);
  const email = reqBody.email;

  if (!process.env.SENDGRID_API_KEY) {
    callback("No API Key");
  }
  client.setApiKey(process.env.SENDGRID_API_KEY);

  let body = { contacts: [{ email: email.toLowerCase() }] };
  if (process.env.SENDGRID_LIST_IDS) {
    body["list_ids"] = JSON.parse(process.env.SENDGRID_LIST_IDS);
  }

  const request = {
    method: "PUT",
    url: "/v3/marketing/contacts",
    body
  };

  client
    .request(request)
    .then(([response, body]) => {
      // console.log(response.statusCode);
      // console.log(body);
      callback(null, {
        statusCode: response.statusCode,
        body: JSON.stringify(body)
      });
    })
    .catch(error => {
      // console.log(JSON.stringify(error.response.body.errors));
      callback(error);
    });
};
