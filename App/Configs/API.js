const ROOT = 'https://edu-shop.mangoads.com.vn';
const API_ROOT = `/wp-json/wp/v2/`;
const API_ROOT_V1 = `/wp-json/jwt-auth/v1/`;
const API_ROOT_EDU = `/wp-json/education/v2/`;
const API_ROOT_LDLMS = `/wp-json/ldlms/v2/`;
const TIMEOUT = 250000;

export default {
  ROOT,
  API_ROOT,
  API_ROOT_V1,
  API_ROOT_EDU,
  API_ROOT_LDLMS,
  TIMEOUT,
  LOGIN: 'wp-json/jwt-auth/v1/token',
  CATEGORY: {
    LIST: 'ld_course_category',
    WOO_LIST: 'products/categories',
  },
  PRODUCT: {
    LIST: 'products',
    DETAIL: 'products/<productId>',
  },
  COURSE: {
    LIST: 'list-courses',
    DETAIL: 'sfwd-courses/<courseId>',
    PROGRESS: 'users/<userId>/course-progress/<courseId>',
    MARK_COMPLETED: '<courseId>/activity',
    STEPS_COMPLETED: 'course/<courseId>/steps_completed',
    QUIZZES: 'sfwd-quiz',
  },
  LESSON: {
    LIST: 'sfwd-lessons',
  },
  TOPIC: {
    LIST: 'sfwd-topic',
  },
  COMMENT: {
    LIST: 'comments',
    CREATE: 'comment/<courseId>/add',
    NESTED: 'comments',
  },
  USER: {
    LOGIN: 'token',
    LOGIN_FB: 'social/facebook/login',
    REGISTER: 'users/register',
    WOO_REGISTER: 'customers',
    FORGOT_PASSWORD: 'users/forgot_password',
    UPDATE_PASSWORD: 'users/update_password',
    GET_PROFILE: 'customers/<userId>',
    WISHLIST: 'wishlists',
    ADD_WISHLIST: 'wishlist/<courseId>/add',
    REMOVE_WISHLIST: 'wishlist/<courseId>/remove',
    UPDATE_INFO: 'customers/<userId>',
    GET_LECTURER: 'users/<lectureId>',
  },
  CART: {
    LIST: 'cart',
    ADD: 'cart/add-item',
    REMOVE: 'cart/item/<itemId>',
  },
  REVIEWS: {
    LIST: 'products/reviews',
    CREATE: 'products/reviews',
  },
};
