import type { ReactNode } from 'react';
import { useState, createContext, Dispatch, SetStateAction } from 'react';

import { selectedValuesType, inputType } from '../common/types';

export const StoredContext = createContext<{
  form: selectedValuesType;
  setForm: Dispatch<SetStateAction<selectedValuesType>>;
  customData: inputType;
  setCustomData: Dispatch<SetStateAction<inputType>>;
  skipped: { [key: string]: Set<string> };
  setSkipped: Dispatch<SetStateAction<{ [key: string]: Set<string> }>>;
}>({} as any);

export const StoredProvider = ({ children }: { children: ReactNode }) => {
  const [form, setForm] = useState<selectedValuesType>({});
  const [customData, setCustomData] = useState<inputType>({});
  const [skipped, setSkipped] = useState<{[key: string]: Set<string>}>({});
  return (
    <StoredContext.Provider
      value={{
        form,
        setForm,
        skipped,
        setSkipped,
        customData,
        setCustomData,
      }}>
      {children}
    </StoredContext.Provider>
  );
};
