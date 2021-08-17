import {TEXT} from 'configs/Constants';
import * as yup from 'yup';

const FULLNAME_REGEX =
  /^[aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ ([aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ ?)+$/i;

export const registerSchema = yup.object().shape({
  username: yup.string().required(TEXT.USERNAME_NOT_BLANK),
  password: yup
    .string()
    .required(TEXT.PASSWORD_NOT_BLANK)
    .label(TEXT.PASSWORD)
    .min(8, TEXT.PASSWORD_MIN_8),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   'Mật khẩu phải bao gồm ký tự in thường, in hoa, số và ký tự đặc biệt',
  // ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], TEXT.PASSWORD_NOT_MATCH),
  email: yup.string().email(TEXT.EMAIL_INVALID).required(TEXT.EMAIL_NOT_BLANK),
  address: yup.string(),
  phone: yup
    .string()
    .matches(
      /^(\+?84|0)((3([2-9]))|(5([2689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
      TEXT.PHONE_INVALID,
    )
    .label(TEXT.PHONE),
  agreement: yup.boolean().oneOf([true], TEXT.AGREEMENT_NOT_ACCEPTED),
});

export const reviewsSchema = yup.object().shape({
  review: yup.string().required(TEXT.REVIEWS),
  reviewer: yup.string().required(TEXT.USERNAME_NOT_BLANK),
  reviewer_email: yup
    .string()
    .email(TEXT.EMAIL_INVALID)
    .required(TEXT.EMAIL_NOT_BLANK),
  rating: yup.number().moreThan(0, TEXT.REVIEWS).required(TEXT.EMAIL_NOT_BLANK),
});

export const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(
      /^(\+?84|0)((3([2-9]))|(5([2689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
      TEXT.PHONE_INVALID,
    )
    .label(TEXT.PHONE),
});

// export const guesetAddressSchema = yup.object().shape({
//   // lastname: yup.string().required().label('tên'),
//   // firstname: yup.string().required().label('họ'),
//   fullname: yup
//     .string()
//     .required()
//     .matches(FULLNAME_REGEX, 'Vui lòng nhập đầy đủ họ và tên')
//     .label('Họ và tên'),
//   email: yup.string().email().required().label('email'),
//   telephone: yup
//     .string()
//     .required()
//     .matches(
//       /^(\+?84|0)((3([2-9]))|(5([2689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
//       'Số điện thoại không hợp lệ',
//     )
//     .label('số điện thoại'),
//   address: yup.string().required().label('địa chỉ'),
// });

// export const forgotCodeSchema = yup.object().shape({
//   email: yup.string().email().required().label('Email'),
// });

// export const loginSchema = yup.object().shape({
//   email: yup.string().email().required().label('Email'),
//   password: yup.string().required().label('Mật khẩu').min(8),
// });

// export const updateProfileSchema = yup.object().shape({
//   // lastname: yup.string().required().label('tên'),
//   // firstname: yup.string().required().label('họ'),
//   fullname: yup
//     .string()
//     .required()
//     .matches(FULLNAME_REGEX, 'Vui lòng nhập đầy đủ họ và tên')
//     .label('Họ và tên'),
//   isSubscribed: yup.boolean(),
//   phone: yup
//     .string()
//     .matches(
//       /^(\+?84|0)((3([2-9]))|(5([2689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
//       'Số điện thoại không hợp lệ',
//     )
//     .required()
//     .label('Số điện thoại'),
//   dob: yup.string().label('Ngày sinh'),
//   gender: yup.string().label('Giới tính'),
// });
