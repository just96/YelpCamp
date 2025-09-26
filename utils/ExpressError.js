// Custom error class with status code
class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

// Export ExpressError
module.exports = ExpressError;
