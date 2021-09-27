import {TEXT} from 'configs/Constants';
import * as yup from 'yup';

const FULLNAME_REGEX =
  /^[aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ ([aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ ?)+$/i;
export const bankCardRegex = /^[a-zA-Z0-9]+$/;
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

export const emailSchema = yup.object().shape({
  email: yup.string().email(TEXT.EMAIL_INVALID).required(TEXT.EMAIL_NOT_BLANK),
});

export const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required('Số điện thoại không đúng')
    .matches(
      /^(\+?84|0)((3([2-9]))|(5([2689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
      'Số điện thoại không đúng',
    )
    .label(TEXT.PHONE),
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      'Mật khẩu cần có ít nhất 8 kí tự gồm chữ thường, chữ hoa và số',
    )
    .label('Mật khẩu'),
});

export const newPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      'Mật khẩu cần có ít nhất 8 kí tự gồm chữ thường, chữ hoa và số',
    )
    .label('Mật khẩu'),
  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword'), null], TEXT.PASSWORD_NOT_MATCH)
    .label('Xác nhận mật khẩu'),
});

export const napasSchema = yup.object().shape({
  Address: yup.string().required('Địa chỉ không được bỏ trống.'),
  Ward: yup.string().required('Phương không được bỏ trống.'),
  County: yup.string().required('Quận không được bỏ trống.'),
  Provincial: yup.string().required('Tỉnh không được bỏ trống.'),
});

export const visaSchema = yup.object().shape({
  Address: yup.string().required('Địa chỉ không được bỏ trống.'),
  Ward: yup.string().required('Phương không được bỏ trống.'),
  County: yup.string().required('Quận không được bỏ trống.'),
  Provincial: yup.string().required('Tỉnh không được bỏ trống.'),
});

export const addressSchema = yup.object().shape({
  Address: yup.string().required('Địa chỉ không được bỏ trống.'),
  Ward: yup.string().required('Phương không được bỏ trống.'),
  County: yup.string().required('Quận không được bỏ trống.'),
  Provincial: yup.string().required('Tỉnh không được bỏ trống.'),
});

export const verifyUserSchema = yup.object().shape({
  Address: yup.string().required('Địa chỉ không được bỏ trống.'), // TODO: translate
  Ward: yup.string().required('Phương không được bỏ trống.'),
  County: yup.string().required('Quận không được bỏ trống.'),
  Provincial: yup.string().required('Tỉnh không được bỏ trống.'),
  ICFullName: yup.string().required('Họ và tên không được bỏ trống.'),
  ICIssuedDate: yup.string().required('Ngày cấp không được bỏ trống.'),
  ICIssuedPlace: yup.string().required('Nơi cấp không được bỏ trống.'),
  ICNumber: yup.string().required('CMND / CCCD không được bỏ trống.'),
  DateOfBirth: yup.string().required('Ngày sinh không được bỏ trống.'),
});

export const nameSchema = yup.object().shape({
  FullName: yup.string().required('Tên không được bỏ trống.').max(100),
});
