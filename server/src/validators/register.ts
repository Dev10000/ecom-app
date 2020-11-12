import { body } from 'express-validator';
// registerValidator is used for user create and edit endpoints

export default [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email address is a required field.')
        .isEmail()
        .withMessage('Chosen Email is not a valid email address.'),
    // Doesn't work and not sure why?
    // .custom(async (value) => {
    //     return QB(User)
    //         .where('email', value)
    //         .first()
    //         .then((user) => {
    //             if (user) return Promise.reject(new Error('Email already taken.'));
    //             return true;
    //         });
    // }),

    body('password').trim().notEmpty().isLength({ min: 6, max: 250 }).withMessage('Password can be 6 - 250 characters'),

    // body('confirm-password')
    //     .trim()
    //     .notEmpty()
    //     .isLength({ min: 6, max: 250 })
    //     .custom((value, { req }) => {
    //         if (value !== req.body.password) throw new Error('Password confirmation field must match password field.');
    //         return true;
    //     })
    //     .withMessage('Invalid Password confirmation field.'),

    body('first_name')
        .trim()
        .notEmpty()
        .withMessage('First name is a required field.')
        .isLength({ min: 3, max: 30 })
        .withMessage('First name can be 3 - 30 characters')
        .escape(),

    body('last_name')
        .trim()
        .notEmpty()
        .withMessage('Last name is a required field.')
        .isLength({ min: 3, max: 30 })
        .withMessage('Lsat name can be 3 - 30 characters')
        .escape(),

    body('address')
        .trim()
        .isLength({ max: 100 })
        .withMessage('The maximum length of a city is 100 characters')
        .escape(),

    body('city')
        .trim()
        .notEmpty()
        .withMessage('City is a required field.')
        .isLength({ min: 3, max: 40 })
        .withMessage('City can be 3 - 40 characters')
        .escape(),

    body('postal_code')
        .trim()
        .notEmpty()
        .withMessage('Postal Code is a required field.')
        .isLength({ min: 2, max: 30 })
        .withMessage('Postal Code can be 2 - 30 characters')
        .isPostalCode('any')
        .escape(),

    body('phone_number')
        .trim()
        .notEmpty()
        .withMessage('Mobile Phone Number is a required field.')
        .isMobilePhone('fi-FI')
        .withMessage('Invalid Mobile Phone Number')
        .escape(),
];
