import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface Data {
  id: string;
  sellorbuy: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  date: string;
}

const itemsSlice = createSlice({
  name: "items",
  initialState: { data: [] as Data[] },
  reducers: {
    addItem: {
      reducer(state, action: PayloadAction<Data>) {
        state.data.push(action.payload);
      },
      prepare(
        sellorbuy: string,
        name: string,
        price: number,
        quantity: number,
        date: string
      ) {
        return {
          payload: {
            id: nanoid(),
            sellorbuy,
            name,
            price,
            quantity,
            total: price * quantity,
            date,
          } as Data,
        };
      },
    },
    removeItem(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export default itemsSlice.reducer;
export const { addItem, removeItem } = itemsSlice.actions;
