"use client";

import { Provider } from "react-redux";
import store from "../store/store";
import React from "react";

type props = {
  children: React.ReactNode;
};

const ReduxProvider = ({ children }: props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
