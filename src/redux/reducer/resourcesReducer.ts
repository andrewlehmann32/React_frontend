import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Versions = {
  label: string;
  id: number;
  title: string;
  icon: React.ReactNode;
};

type OSItem = {
  id?: number;
  icon?: React.ReactNode;
  title: string;
  version: string;
  versions: Versions[];
};

export type RegionItem = {
  icon: React.ReactNode;
  title: string | undefined;
  id?: number;
};

type SSHType = { name: string; key: string };
export interface RenderDetailsState {
  os: OSItem | null;
  region: RegionItem | null;
  raid: string | null;
  ssh?: SSHType | null;
  billing: string | null;
  hostname: string;
}

const initialState: RenderDetailsState = {
  os: null,
  region: null,
  raid: null,
  ssh: null,
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
    setSshKey: (state, action: PayloadAction<SSHType>) => {
      state.ssh = action.payload;
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
    setToInitial: () => {
      return initialState;
    },
  },
});

export const {
  setOS,
  setRegion,
  setRaid,
  setBilling,
  setHostname,
  setSshKey,
  setToInitial,
} = renderDetailsSlice.actions;

export default renderDetailsSlice.reducer;
