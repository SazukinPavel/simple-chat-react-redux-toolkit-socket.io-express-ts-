import { TypedUseSelectorHook, useSelector } from "react-redux";
import { StoreType } from "../store";

export const useTypedSelector:TypedUseSelectorHook<StoreType>=useSelector