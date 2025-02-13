// components/Knowledge.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import styles from './Knowledge.module.scss';
import Link from '@/components/Link';
import {KnowledgeContext} from './KnowledgeContext'

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

const Knowledge = () => {
  // 路由传来的 知识库id
  const { knowledgeId } = useParams<{ knowledgeId: string }>();
  const navigate = useNavigate();
  const [knowledge, setKnowledge] = useState<Knowledge | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const context = useContext(KnowledgeContext);

  useEffect(() => {
    // 模拟获取知识库信息和文章列表
    const mockFetchKnowledge = async () => {
      const mockData = {
        id: '1',
        name: "示例知识库",
        description: "这是一个示例知识库的描述。",
        articles: [
          { id: '1', title: "文章一", summary: "这是第一篇文章的摘要。" },
          { id: '2', title: "文章二", summary: "这是第二篇文章的摘要。" },
          { id: '3', title: "文章三", summary: "这是第三篇文章的摘要。" },
        ],
      };

      setTimeout(() => {
        setKnowledge(mockData);
      }, 1000); // 模拟网络延迟
    };

    mockFetchKnowledge();
  }, [knowledgeId]);

  if (!knowledge) return <div>Loading...</div>;

  const handleArticleClick = (article: Article) => {
    navigate(`/zh/knowledge/${knowledge.id}/articles/${article.id}`);
  };

  return (
    <div className={styles.knowledgeContainer}>
      {/* 侧边栏 */}
      <aside className={styles.sidebar}>
        <header className={styles.knowledgeHeader}>
          <div className={styles.headerLeft}>
            <h1>{knowledge.name}</h1>
            <p>{knowledge.description}</p>
          </div>
          <i className="iconfont">&#xe6e9;</i>
        </header>
        {/* 知识库介绍界面 */}
        <section className={styles.articlesList}>
          <Link to={`/knowledge/${knowledge.id}`} className={styles.homeLink}>首页</Link>
          <div className={styles.toggleButton} onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '收起目录' : '展开目录'}
          </div>
          {isExpanded && (
            <ul>
              {knowledge.articles.map(article => (
                <li key={article.id} className={styles.articleItem} onClick={() => handleArticleClick(article)}>
                  {article.title}
                </li>
              ))}
            </ul>
          )}
        </section>
      </aside>

      {/* 主内容区域 */}
      <main className={styles.mainContent} >
        <KnowledgeContext.Provider value={{ knowledge }}>
          <Outlet  /> {/* 传递文章数据到子路由 */}
        </KnowledgeContext.Provider>
      </main>
    </div>
  );
};

export default Knowledge;