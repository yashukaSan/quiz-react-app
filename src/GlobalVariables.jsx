import { createContext, useState } from 'react';

export const GlobalVariables = createContext(null);

export const GlobalVariablesProvider = ({ children }) => {
    const [ lst, setLst ] = useState([]);
    const [ choice, setChoice ] = useState("");

    return (
        <GlobalVariables.Provider value={{ lst, setLst, choice, setChoice }}>
        {children}
        </GlobalVariables.Provider >
    )
}