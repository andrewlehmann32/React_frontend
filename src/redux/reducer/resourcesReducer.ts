import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OSItem = {
  id?: number;
  icon: React.ReactNode;
  title: string;
  version: string;
};

export type RegionItem = {
  icon: React.ReactNode;
  title: string;
  id: number;
};

interface RenderDetailsState {
  os: OSItem | null;
  region: RegionItem | null;
  raid: string | null;
  billing: string | null;
  hostname: string;
}

const initialState: RenderDetailsState = {
  os: null,
  region: null,
  raid: null,
  billing: null,
  hostname: "",
};

export const renderDetailsSlice = createSlice({
  name: "renderDetails",
  initialState,
  reducers: {
    setOS: (state, action: PayloadAction<OSItem>) => {
      state.os = action.payload;
    },
    setRegion: (state, action: PayloadAction<RegionItem>) => {
      state.region = action.payload;
    },
    setRaid: (state, action: PayloadAction<string>) => {
      state.raid = action.payload;
    },
    setBilling: (state, action: PayloadAction<string>) => {
      state.billing = action.payload;
    },
    setHostname: (state, action: PayloadAction<string>) => {
      state.hostname = action.payload;
    },
  },
});

export const { setOS, setRegion, setRaid, setBilling, setHostname } =
  renderDetailsSlice.actions;

export default renderDetailsSlice.reducer;
