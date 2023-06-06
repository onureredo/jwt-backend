const errorHandler = (err, req, res, next) => {
  // Log the error stack trace to the console
  console.error(err.stack);

  // Set the response status code based on the error's status code or default to 500 (Internal Server Error)
  // Send a JSON response with the error message
  res.status(err.statusCode || 500).json({ error: err.message });
};

export default errorHandler;
