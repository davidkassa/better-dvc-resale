// https://github.com/ndethore/lambda-sendgrid-mailinglist-api
require("dotenv").config();
const client = require("@sendgrid/client");
const { createLogger, format, transports } = require("winston");
const colorize = require("json-colorizer");
const redact = require("../redact-secrets")("[REDACTED]");

const parser = param => {
  if (!param) {
    return "";
  }
  if (typeof param === "string") {
    return redact.map(param);
  }
  return Object.keys(param).length
    ? colorize(JSON.stringify(redact.map(param), undefined, 2))
    : "";
};

const logger = createLogger({
  level: process.env.LOGGING_LEVEL || "info",
  format: format.combine(
    format.colorize(),
    format.errors({ stack: true }),
    format.splat(),
    format.timestamp(),
    format.printf(info => {
      const { timestamp, level, message, meta } = info;
      const metaMsg = meta ? `: ${parser(meta)}` : "";
      return `${timestamp} [${level}] ${parser(message)} ${metaMsg}`;
    })
  ),
  defaultMeta: { service: "send-grid-function" },
  transports: [new transports.Console({})]
});

exports.handler = function(event, context, callback) {
  logger.info("Processing New Contact...");
  if (!process.env.SENDGRID_API_KEY) {
    callback("No API Key");
  }
  client.setApiKey(process.env.SENDGRID_API_KEY);

  const reqBody = JSON.parse(event.body);
  const email = reqBody.email;

  let body = { contacts: [{ email: email.toLowerCase() }] };
  if (process.env.SENDGRID_LIST_IDS) {
    body["list_ids"] = JSON.parse(process.env.SENDGRID_LIST_IDS);
  }

  const request = {
    method: "PUT",
    url: "/v3/marketing/contacts",
    body
  };
  logger.debug(request);

  client
    .request(request)
    .then(([response, body]) => {
      logger.debug(response.statusCode);
      logger.debug(body);
      logger.info("Processing Succeeded.");
      callback(null, {
        statusCode: response.statusCode,
        body: JSON.stringify(body)
      });
    })
    .catch(error => {
      logger.debug(JSON.stringify(error.response.body.errors));
      logger.info("Processing Failed.");
      callback(error);
    });
};
