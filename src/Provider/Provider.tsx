"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProviderProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: ProviderProps) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer
      autoClose={1000}
      />
    </Provider>
  );
}
