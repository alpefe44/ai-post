import React, { createContext, useState, ReactNode } from 'react';

type AIData = {
    title: string,
    content: string,
    image?: string | null
}

type AIContextType = {
    data: AIData | null,
    setData: (data: AIData) => void;
}

export const AIContext = createContext<AIContextType>({
    data: null,
    setData: () => { },
});

export const AIProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<AIData | null>(null);

    return (
        <AIContext.Provider value={{ data, setData }}>
            {children}
        </AIContext.Provider>
    );
};