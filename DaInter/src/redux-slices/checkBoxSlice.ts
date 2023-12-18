import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckboxState {
  showCheckboxes: boolean;
  selectedCheckboxes: Record<number, boolean>;
}

const initialState: CheckboxState = {
  showCheckboxes: false,
  selectedCheckboxes: {},
};

const checkboxSlice = createSlice({
  name: 'checkbox',
  initialState,
  reducers: {
    setShowCheckboxes: (state, action: PayloadAction<boolean>) => {
      state.showCheckboxes = action.payload;
    },
    setSelectedCheckbox: (state, action: PayloadAction<{ index: number; value: boolean }>) => {
      const { index, value } = action.payload;
      state.selectedCheckboxes[index] = value;
    },
    resetCheckboxes: (state) => {
      state.showCheckboxes = false;
      state.selectedCheckboxes = {};
    },
  },
});

export const { setShowCheckboxes, setSelectedCheckbox, resetCheckboxes } = checkboxSlice.actions;
export default checkboxSlice.reducer;
