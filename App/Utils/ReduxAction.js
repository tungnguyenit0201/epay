import { createAction } from '@reduxjs/toolkit';

export const createRequestTypes = (base) => ({
  REQUEST: createAction(`${base}_REQUEST`),
  SUCCESS: createAction(`${base}_SUCCESS`),
  FAILURE: createAction(`${base}_FAILURE`),
  BASE: base
});
