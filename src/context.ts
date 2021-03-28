import { createContext } from 'react';

const value : any = []
export const Context = createContext(value);
export const ContextProvider = Context.Provider;
export const ContextConsumer = Context.Consumer;
