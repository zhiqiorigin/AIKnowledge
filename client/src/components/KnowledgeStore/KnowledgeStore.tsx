import { useState } from 'react';
import styles from './KnowledgeBase.module.scss';

interface KnowledgeBase {
  id: string;
  name: string;
  description?: string;
  teamId: string;
  documents: Document[];
}

export default function KnowledgeBasePage({ kb }: { kb: KnowledgeBase }) {
  const [activeDocument, setActiveDocument] = useState<Document | null>(null);

  return (
    <div className={styles.kbPage}>
      <div className={styles.header}>
        <h1>{kb.name}</h1>
        <button onClick={() => {/* 新建文档逻辑 */ }}>+ 新建文档</button>
      </div>

      <div className={styles.documentList}>
        {kb.documents.map(doc => (
          <div key={doc.id} className={styles.docItem}>
            <span className={styles.title}>{doc.title}</span>
            <span className={styles.lastModified}>上次修改于：{doc.lastModifiedAt?.toLocaleString()}</span>
            <button onClick={() => setActiveDocument(doc)}>编辑</button>
          </div>
        ))}
      </div>

      {activeDocument && (
        <DocumentEditor document={activeDocument} />
      )}
    </div>
  );
}
