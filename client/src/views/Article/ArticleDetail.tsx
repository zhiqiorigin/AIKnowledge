// components/ArticleDetail.tsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useKnowledgeContext } from '../Knowledge/KnowledgeContext';

const ArticleDetail = () => {
  const { knowledge } = useKnowledgeContext();
  const { articleId } = useParams<{ articleId: string }>();
  const [article, setArticle] = useState<any | null>(null);

  useEffect(() => {
    // 模拟异步请求
    if (knowledge) {
      const foundArticle = knowledge.articles.find(a => a.id === articleId);
      if (foundArticle) {
        // 假设这里有一个延迟来模拟网络请求
        setTimeout(() => {
          setArticle(foundArticle);
        }, 500); // 模拟网络延迟
      }
    }
  }, [knowledge, articleId]);

  if (!knowledge || !article) return <div>Loading...</div>;

  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <p>{article.summary}</p>
      {/* 如果有更多文章内容可以在这里添加 */}
    </div>
  );
};

export default ArticleDetail;