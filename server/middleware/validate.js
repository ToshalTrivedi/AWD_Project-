/**
 * Generic Joi Validation Middleware.
 * Validates request data (body, query, or params) against a Joi schema.
 * If validation fails, responds with HTTP 400 Bad Request and detailed field errors.
 */
export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // Return all validation errors, not just the first one
      stripUnknown: true // Remove unknown keys to protect against mass assignment
    });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message.replace(/['"]/g, ''));
      return res.status(400).json({
        success: false,
        message: 'Input validation failed',
        errors: errorMessages
      });
    }

    // Replace request property with sanitized and typed value
    req[property] = value;
    next();
  };
};
