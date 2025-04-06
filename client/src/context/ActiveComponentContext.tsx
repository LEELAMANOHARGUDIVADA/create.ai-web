import { createContext, useState } from "react";
import { ComponentType } from "../constants/nav_items";

interface ActiveComponentContextType {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

export const ActiveComponentContext = createContext<ActiveComponentContextType | undefined>(undefined);

export function ActiveComponentProvider({ children }: React.PropsWithChildren) {
  const [activeComponent, setActiveComponent] = useState<ComponentType>("Home");

  return (
    <ActiveComponentContext.Provider value={{ activeComponent, setActiveComponent }}>
      {children}
    </ActiveComponentContext.Provider>
  );
}

export default ActiveComponentContext;
