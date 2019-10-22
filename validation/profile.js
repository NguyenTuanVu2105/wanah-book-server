const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.country = !isEmpty(data.country) ? data.country : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.district = !isEmpty(data.district) ? data.district : '';

    if (Validator.isEmpty(data.first_name)) {
      errors.first_name = 'First Name field is required';
    }

    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = 'Last Name field is required';
    }

    if (Validator.isEmpty(data.country)) {
        errors.country = 'Country field is required';
    }

    if (Validator.isEmpty(data.city)) {
        errors.city = 'City field is required';
    }

    if (Validator.isEmpty(data.district)) {
        errors.district = "District field is required";
    }

    return { errors, isValid: isEmpty(errors) };
};