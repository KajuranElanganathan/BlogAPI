import { createContext, useContext, useState } from "react";

const HomeContext = createContext(null);

export function HomeProvider({ children }) {
  const [scrollToTop, setScrollToTop] = useState(null);

  return (
    <HomeContext.Provider value={{ scrollToTop, setScrollToTop }}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHome() {
  const context = useContext(HomeContext);
  if (!context) {
    return { scrollToTop: null, setScrollToTop: () => {} };
  }
  return context;
}

