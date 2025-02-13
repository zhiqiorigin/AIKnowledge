// contexts/KnowledgeContext.tsx
import React, { createContext, useContext } from 'react';

interface Article {
  id: string;
  title: string;
  summary: string;
}

interface Knowledge {
  id: string;
  name: string;
  description: string;
  articles: Article[];
}

interface KnowledgeContextType {
  knowledge: Knowledge | null;
}

export const KnowledgeContext = createContext<KnowledgeContextType>({
  knowledge: null,
});

export const useKnowledgeContext = () => useContext(KnowledgeContext);
