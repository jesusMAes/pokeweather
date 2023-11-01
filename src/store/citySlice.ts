import { apiCities } from "../models/apiModels";
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "./store";

/**Estado inicial en el store */
const cityInitialState:apiCities = {
  key:'',
  value:''
}

export const citySlice = createSlice({
  name:'city',
  initialState:cityInitialState,
  reducers:{
    /**Pone la ciudad que va en el payload en el estado */
    changeCity: (state, action:PayloadAction<apiCities>) => {
      state.key = action.payload.key;
      state.value = action.payload.value;
    }
  }
})

/**ChangeCity actua a la vez de acción y reducer */
export const { changeCity } = citySlice.actions;

/**Selector para recuperar la ciudad seleccionada */
export const selectCity = (state:RootState) => state.city;

export default citySlice.reducer;//exportamos