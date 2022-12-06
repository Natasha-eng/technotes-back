const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

const loginLimiter = rateLimit({
  windowMs: 60 * 100, //1 minute
  max: 5, //Limit each IP to 5 login requires per 'window' per minute
  message: {
    message:
      "Too many login attempts from this IP, please try again after a 60 second pause",
  },
  handler: (req, res, next, options) => {
    logEvents(
      "Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}",
      "errLog.log"
    );
  },
  standardHeaders: true, //Return rate limit in the 'RateLimit-*' headers
  legacyHeaders: false, //Disable the 'X-RateLimit-*' headers
});

module.exports = loginLimiter;
