export let mixed = {
  default: '${path} không hợp lệ',
  required: 'Vui lòng nhập ${path}',
  oneOf: '${path} phải là một trong các giá trị: ${values}',
  notOneOf: '${path} không được chứa các giá trị:: ${values}',
  notType: ({ path, type, value, originalValue }) => {
    let isCast = originalValue != null && originalValue !== value;
    let msg = `${path} must be a \`${type}\` type, `;

    if (value === null) {
      msg += `\n If "null" is intended as an empty value be sure to mark the schema as \`.nullable()\``;
    }

    return msg;
  },
  defined: '${path} must be defined'
};

export let string = {
  length: '${path} phải có ${length} ký tư',
  min: '${path} phải có ít nhất ${min} ký tự',
  max: '${path} không được quá ${max} ký tự',
  matches: '${path} must match the following: "${regex}"',
  email: '${path} không hợp lệ',
  url: '${path} không hợp lệ',
  uuid: '${path} không hợp lệ',
  trim: '${path} must be a trimmed string',
  lowercase: '${path} must be a lowercase string',
  uppercase: '${path} must be a upper case string'
};

export let number = {
  min: '${path} must be greater than or equal to ${min}',
  max: '${path} must be less than or equal to ${max}',
  lessThan: '${path} must be less than ${less}',
  moreThan: '${path} must be greater than ${more}',
  positive: '${path} must be a positive number',
  negative: '${path} must be a negative number',
  integer: '${path} must be an integer'
};

export let date = {
  min: '${path} field must be later than ${min}',
  max: '${path} field must be at earlier than ${max}'
};

export let boolean = {
  isValue: '${path} field must be ${value}'
};

export let object = {
  noUnknown: '${path} field has unspecified keys: ${unknown}'
};

export let array = {
  min: '${path} field must have at least ${min} items',
  max: '${path} field must have less than or equal to ${max} items',
  length: '${path} must be have ${length} items'
};

export default Object.assign(Object.create(null), {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean
});
