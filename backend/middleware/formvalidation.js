const { body } = require('express-validator');

const employeeValidationRules = () => {
  return [
    // body('employee_id').notEmpty().withMessage('Employee ID is required'),
    body('employee_img').isURL().withMessage('Invalid image URL'),
    body('employee_name').notEmpty().withMessage('Employee name is required'),
    body('employee_email').isEmail().withMessage('Invalid email address'),
    body('employee_phone').isMobilePhone().withMessage('Invalid phone number'),
    body('employee_designation').notEmpty().withMessage('Designation is required'),
    body('employee_gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    body('employee_course').notEmpty().withMessage('Course is required'),
  ];
};

module.exports = { employeeValidationRules };