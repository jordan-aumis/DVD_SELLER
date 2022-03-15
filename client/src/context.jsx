import React, {
    createContext,
    useContext,
    useState,
    useEffect,
  } from "react";

  const Context = createContext({});

  export const useGlobalContext = () => useContext(Context);

  export const GlobalProvider = ({ items, children }) => {

  const [item, setItem] = useState(JSON.parse(localStorage.getItem('cart')) || [])
  const removeLocalStorage = () =>{
    localStorage.removeItem("cart");
    setItem([]);
  }
  
  const value = {
      item: item,
      setItem: setItem,
      removeLocalStorage: removeLocalStorage,
  }

    return<Context.Provider value={value}>{children}</Context.Provider>
  }