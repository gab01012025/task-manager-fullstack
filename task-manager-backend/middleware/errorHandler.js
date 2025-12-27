class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleMongooseValidationError = (err) => {
  return new ApiError(400, 'Erro de validação');
};

const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  return new ApiError(409, `${field} já está em uso`);
};

const handleCastError = (err) => {
  return new ApiError(400, `ID inválido: ${err.value}`);
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  let error = { ...err };
  error.message = err.message;

  if (err.name === 'ValidationError') error = handleMongooseValidationError(err);
  if (err.code === 11000) error = handleDuplicateKeyError(err);
  if (err.name === 'CastError') error = handleCastError(err);
  if (err.name === 'JsonWebTokenError') error = new ApiError(401, 'Token inválido');
  if (err.name === 'TokenExpiredError') error = new ApiError(401, 'Token expirado');

  return res.status(error.statusCode || 500).json({
    success: false,
    status: error.status || 'error',
    message: error.message || 'Erro interno do servidor'
  });
};

const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Rota ${req.originalUrl} não encontrada`));
};

module.exports = {
  ApiError,
  errorHandler,
  notFoundHandler
};
