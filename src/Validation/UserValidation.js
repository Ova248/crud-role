import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().when('signUp', {
    is: true,
    then: yup.string().min(3).max(20).required(),
  }),
  lastName: yup.string().when('signUp', {
    is: true,
    then: yup.string().required(),
  }),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(20).required(),
  confirmPassword: yup.string().when('signUp', {
    is: true,
    then: yup.string().oneOf([yup.ref(), null]).required(),
  }),
});

export default validationSchema;
