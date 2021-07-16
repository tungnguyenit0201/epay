// import {LOGOUT} from 'actions/auth';

const safeOps = state => {
  if (typeof state.loading !== 'object') {
    state.loading = {};
  }
  if (typeof state.success !== 'object') {
    state.success = {};
  }
  if (typeof state.error !== 'object') {
    state.error = {};
  }
};

export const buildRequestReducer = (
  builder,
  actionBase,
  takeout,
  onRequest,
  onFailed,
) => {
  builder
    .addCase(actionBase.REQUEST, (state, action) => {
      safeOps(state);

      onRequest?.(state, action);

      state.loading[actionBase.BASE] = true;
      state.success[actionBase.BASE] = false;
    })
    .addCase(actionBase.SUCCESS, (state, action) => {
      safeOps(state);

      state.success[actionBase.BASE] = true;
      state.loading[actionBase.BASE] = false;

      if (typeof takeout === 'function') {
        takeout(state, action);
      } else if (takeout?.constructor === Array) {
        takeout.forEach(key => {
          state[key] = action.payload[key];
        });
      }
    })
    .addCase(actionBase.FAILURE, (state, action) => {
      safeOps(state);

      state.error[actionBase.BASE] = action.payload;

      state.loading[actionBase.BASE] = false;
      state.success[actionBase.BASE] = false;

      if (typeof onFailed === 'function') {
        onFailed(state, action);
      } else if (onFailed?.constructor === Array) {
        onFailed.forEach(key => {
          state[key] = action.payload[key];
        });
      }
    });
};

// export const resetOnLogoutOrUnauth = (initialState, builder) => {
//   return builder
//     .addCase(LOGOUT, () => initialState)
//     .addMatcher(
//       action => /FAILURE$/.test(action.type),
//       (state, action) => {
//         if (action?.payload?.status === 401) {
//           return initialState;
//         }
//       },
//     );
// };
