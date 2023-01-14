import type { ReactNode } from 'react';
import { useState, createContext, Dispatch, SetStateAction } from 'react';

import { selectedValuesType, inputType } from '../common/types';

export const StoredContext = createContext<{
  form: selectedValuesType;
  setForm: Dispatch<SetStateAction<selectedValuesType>>;
  customData: inputType;
  setCustomData: Dispatch<SetStateAction<inputType>>;
  skipped: Set<string>;
  setSkipped: Dispatch<SetStateAction<Set<string>>>;
}>({} as any);

export const StoredProvider = ({ children }: { children: ReactNode }) => {
  const [form, setForm] = useState<selectedValuesType>({});
  const [customData, setCustomData] = useState<inputType>({});
  const [skipped, setSkipped] = useState<Set<string>>(new Set());
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
