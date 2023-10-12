import { createSlice } from "@reduxjs/toolkit";

const filiereSlice = createSlice({
  name: "filiere",
  initialState: { filieres: [] },
  reducers: {
    getFiliere: (state, action) => {
      state.filieres = action.payload;
    },
  },
});

export const { getFiliere } = filiereSlice.actions;
export default filiereSlice.reducer;
export const selectFiliereSlice = (state) => state.filiere.filieres;
