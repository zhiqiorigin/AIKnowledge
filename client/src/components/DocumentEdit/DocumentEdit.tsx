import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DocumentEditor.module.scss';

interface Document {
  id: string;
  title: string;
  content: string;
  version: number;
}

export default function DocumentEditor({ document }: { document: Document }) {
  const [editedContent, setEditedContent] = useState(document.content);
  const navigate = useNavigate();

  const saveDocument = async () => {
    try {
      // 提交修改到后端
      await fetch(`/api/document/${document.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
          version: document.version + 1
        })
      });

      navigate(-1); // 返回上一页
    } catch (error) {
      console.error('保存文档失败:', error);
    }
  };

  return (
    <div className={styles.editorPage}>
      <div className={styles.header}>
        <h2>{document.title}</h2>
        <button onClick={saveDocument}>保存</button>
      </div>

      <div className={styles.editor}>
        {/* 使用富文本编辑器，例如Quill */}
        <QuillEditor
          value={editedContent}
          onChange={(content) => setEditedContent(content)}
        />
      </div>
    </div>
  );
}
