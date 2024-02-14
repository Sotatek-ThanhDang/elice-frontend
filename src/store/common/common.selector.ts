import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store';

const selectCommonState = (state: RootState) => state.common;

const selectAppTheme = createSelector(selectCommonState, (state) => state.theme);

export { selectAppTheme };
