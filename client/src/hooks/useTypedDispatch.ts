import { useDispatch } from "react-redux";
import { DispatchType } from "../store";

export const useTypedDispatch=()=>useDispatch<DispatchType>()