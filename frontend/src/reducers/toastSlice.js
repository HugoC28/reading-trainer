import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  showToast: false,
};

// Slice
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    // Action to show toast
    setShowToast: (state, action) => {
      state.showToast = action.payload;
    },
  },
});

// Export the action
export const { setShowToast } = toastSlice.actions;

// Export the reducer
export default toastSlice.reducer;
