import { useState } from 'react';
import styles from './RecentUpdates.module.scss';

interface Document {
  id: number;
  title: string;
  lastModified: string;
  status?: string; // 可以是 'draft' 或者 'published'
}

export default function RecentUpdates() {
  const [documents] = useState<Document[]>([
    { id: 1, title: '项目计划书', lastModified: '2023-07-20 15:30' },
    { id: 2, title: '用户需求文档', lastModified: '2023-07-19 14:45', status: 'draft' },
    { id: 3, title: '开发规范', lastModified: '2023-07-18 09:10' },
    { id: 4, title: '测试报告', lastModified: '2023-07-17 16:58' },
  ]);

  // 模拟新建文档
  const [newDocumentName, setNewDocumentName] = useState('');

  const handleCreateNewDoc = () => {
    if (!newDocumentName.trim()) return;
    const newDoc: Document = {
      id: Date.now(),
      title: newDocumentName,
      lastModified: new Date().toLocaleString(),
    };
    // 这里你可以添加到你的文档存储系统中
    setNewDocumentName('');
  };

  const handleCreateNewKnowledgeBase = () => {
    // 这里可以添加新建知识库的逻辑
    alert('功能待开发：新建知识库');
  };

  return (
    <div className={styles.recentUpdates}>
      {/* 顶部操作栏 */}
      <div className={styles.topBar}>
        <h1>最近更新</h1>
        <button onClick={handleCreateNewKnowledgeBase}>新建知识库</button>
        <button onClick={() => setNewDocumentName('')}>新建文档</button>
      </div>

      {/* 主内容区 */}
      <div className={styles.mainContent}>
        <h3>最近编写过的文档</h3>
        <div className={styles.documentsList}>
          {documents.map((doc) => (
            <div key={doc.id} className={styles.documentItem}>
              <div className={styles.documentTitle}>{doc.title}</div>
              <div className={styles.documentMeta}>
                <span>{doc.lastModified}</span>
                {doc.status && (
                  <span className={`status-badge ${doc.status === 'draft' ? 'draft' : 'published'}`}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}