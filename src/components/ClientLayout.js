"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AmazonLoader from "./LazyImage";
import { set } from "date-fns";

export default function ClientLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
  }, [setIsLoad]);

  return (
    <>
      <Provider store={store}>
      <Header isMobile={isMobile} />
        {isLoad ? <AmazonLoader /> : children} {/* ✅ Fix: Removed `{}` around children */}
      </Provider>
      <Footer />
    </>
  );
}
