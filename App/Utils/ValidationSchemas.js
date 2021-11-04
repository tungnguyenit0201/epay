import {TEXT} from 'configs/Constants';
import * as yup from 'yup';

// const FULLNAME_REGEX = /[^@$!%*#?&]+$/;
const FULLNAME_REGEX =
  /^[a-zA-ZaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵzAÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬDĐEÈẺẼÉẸÊỀỂỄẾỆIÌỈĨÍỊOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢUÙỦŨÚỤƯỪỬỮỨỰYỲỶỸÝỴ\s]+$/;

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
  email: yup
    .string()
    .email(TEXT.EMAIL_INVALID)
    .required(TEXT.EMAIL_NOT_BLANK)
    .matches(/^[A-Za-z0-9@.]*$/, TEXT.EMAIL_INVALID),
});

export const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required('incorrect_phone_number')
    .matches(
      /^(\+?84|0)((3([2-9]))|(5([2689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
      'incorrect_phone_number',
    )
    .label(TEXT.PHONE),
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*([_]|\W))[A-Za-z\d[_]|\W]{8,}$/,
      'password_must_have_at_least_8_characters_including_lowercase_uppercase_numbers_and_special_characters',
    )
    .label('password'),
});

export const newPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required()
    .max(20, 'password_maximum_20_characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*([_]|\W))[A-Za-z\d[_]|\W]{8,}$/,
      'password_must_have_at_least_8_characters_including_lowercase_uppercase_numbers_and_special_characters',
    )
    .label('password'),
  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword'), null], 'data_does_not_match_with_password')
    .label('Xác nhận mật khẩu')
    .max(20, 'password_maximum_20_characters'),
});

export const napasSchema = yup.object().shape({
  Address: yup.string().required('Địa chỉ không được bỏ trống.'),
  // Ward: yup.string().required('Phường không được bỏ trống.'),
  Ward: yup.string(),
  County: yup.string().required('Quận không được bỏ trống.'),
  Provincial: yup.string().required('Tỉnh không được bỏ trống.'),
});

export const visaSchema = yup.object().shape({
  Address: yup.string().required('Địa chỉ không được bỏ trống.'),
  Ward: yup.string().required('Phường không được bỏ trống.'),
  County: yup.string().required('Quận không được bỏ trống.'),
  Provincial: yup.string().required('Tỉnh không được bỏ trống.'),
});

export const addressSchema = yup.object().shape({
  Address: yup.string().required('Địa chỉ không được bỏ trống.'),
  // Ward: yup.string().required('Phường không được bỏ trống.'),
  Ward: yup.string(),
  County: yup.string().required('Quận không được bỏ trống.'),
  Provincial: yup.string().required('Tỉnh không được bỏ trống.'),
});

export const verifyUserSchema = yup.object().shape({
  Address: yup.string().required('Địa chỉ không được bỏ trống.'), // TODO: translate
  // Ward: yup.string().required('Phường không được bỏ trống.'),
  Ward: yup.string(),
  County: yup.string().required('Quận không được bỏ trống.'),
  Provincial: yup.string().required('Tỉnh không được bỏ trống.'),
  ICFullName: yup.string().required('Họ và tên không được bỏ trống.'),
  ICIssuedDate: yup.string().required('Ngày cấp không được bỏ trống.'),
  ICIssuedPlace: yup.string().required('Nơi cấp không được bỏ trống.'),
  ICNumber: yup.string().required('CMND / CCCD không được bỏ trống.'),
  DateOfBirth: yup.string().required('Ngày sinh không được bỏ trống.'),
});

export const nameSchema = yup.object().shape({
  FullName: yup
    .string()
    .required('full_name_cannot_be_left_blank')
    .max(100, 'fullname_maximum_100_characters')
    .matches(
      FULLNAME_REGEX,
      'first_and_last_name_must_not_contain_special_characters',
    ),
});

export const eKYCSchema = yup.object().shape({
  ICFullName: yup
    .string()
    .required('full_name_cannot_be_left_blank')
    .max(100, 'fullname_maximum_100_characters')
    .matches(
      FULLNAME_REGEX,
      'first_and_last_name_must_not_contain_special_characters',
    ),
});

export const forgetPasswordKYCSchema = yup.object().shape({
  icNumber: yup.string().required('CMND / CCCD không được bỏ trống.'),
  validDate: yup.string().required('Ngày cấp không được bỏ trống.'),
});

export const forgetPasswordKYCBankSchema = yup.object().shape({
  icNumber: yup.string().required('CMND / CCCD không được bỏ trống.'),
  validDate: yup.string().required('Ngày cấp không được bỏ trống.'),
  lastBankNumber: yup
    .string()
    .required('4 số cuối ngân hàng liên kết không được bỏ trống.')
    .length(4, '4 số cuối ngân hàng đã liên kiết không đủ'),
});
