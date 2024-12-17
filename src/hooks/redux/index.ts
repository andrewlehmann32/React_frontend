// Imports:
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, TRootState } from "../../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
