import React, { createContext, useContext, ReactNode } from "react";

type Messages = Record<string, any>;

const I18nContext = createContext<{ t: (k: string) => string }>({ t: (k) => k });

function get(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

export function I18nProvider({
  children,
  messages,
  defaultLocale = "en",
}: {
  children: ReactNode;
  messages: Messages;
  defaultLocale?: string;
}) {
  const t = (k: string) => {
    const val = get(messages, k);
    if (val === undefined || val === null) return k;
    if (Array.isArray(val)) return val.join("\n");
    return String(val);
  };
  return <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>;
}

export function useT() {
  return useContext(I18nContext).t;
}

export function T({ k }: { k: string }) {
  const t = useT();
  return <>{t(k)}</>;
}
