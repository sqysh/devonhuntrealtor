"use client";

import React, { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <main className="min-h-[calc(100vh-584px)]">{children}</main>
        <Footer />
      </PersistGate>
    </Provider>
  );
};

export default PageWrapper;
