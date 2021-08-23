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
    .required(TEXT.PHONE_INVALID)
    .matches(
      /^(\+?84|0)((3([2-9]))|(5([2689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
      TEXT.PHONE_INVALID,
    )
    .label(TEXT.PHONE),
});

export const passwordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      'Mật khẩu tối thiểu 8 ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, tự đặc biệt',
    )
    .label('Mật khẩu'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], TEXT.PASSWORD_NOT_MATCH)
    .label('Xác nhận mật khẩu'),
});

export const addressSchema = yup.object().shape({
  Address: yup.string().required("Địa chỉ không được bỏ trống."),
  Ward: yup.string().required("Phương không được bỏ trống."),
  County: yup.string().required("Quận không được bỏ trống."),
  Provincial: yup.string().required("Tỉnh không được bỏ trống."),
});