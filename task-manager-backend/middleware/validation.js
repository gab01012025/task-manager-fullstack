const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required()
    .messages({
      'string.min': 'Username deve ter pelo menos 3 caracteres',
      'string.max': 'Username deve ter no máximo 30 caracteres',
      'any.required': 'Username é obrigatório'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Email inválido',
      'any.required': 'Email é obrigatório'
    }),
  password: Joi.string().min(6).max(100).required()
    .messages({
      'string.min': 'Senha deve ter pelo menos 6 caracteres',
      'any.required': 'Senha é obrigatória'
    })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Email inválido',
      'any.required': 'Email é obrigatório'
    }),
  password: Joi.string().required()
    .messages({ 'any.required': 'Senha é obrigatória' })
});

const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).required()
    .messages({
      'string.min': 'Título não pode estar vazio',
      'string.max': 'Título deve ter no máximo 200 caracteres',
      'any.required': 'Título é obrigatório'
    }),
  description: Joi.string().max(1000).optional(),
  completed: Joi.boolean().optional().default(false)
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).optional(),
  description: Joi.string().max(1000).optional(),
  completed: Joi.boolean().optional()
}).min(1);

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { 
      abortEarly: false,
      stripUnknown: true 
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors
      });
    }

    req.body = value;
    next();
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  createTaskSchema,
  updateTaskSchema,
  validate
};
