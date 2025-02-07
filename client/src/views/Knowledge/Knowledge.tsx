import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Knowledge.module.scss';


interface Article{
  id:number,
  title:string,
  summary:string
}
interface Knowledge{
  id:number,
  name:string,
  description:string,
  articles:Article[]
}

const Knowledge = () => {
  // 路由传来的 知识库id
  const { knowledgeId } = useParams();
  const [knowledge, setKnowledge] = useState<Knowledge>();

  useEffect(() => {
    // 模拟获取知识库信息和文章列表
    const mockFetchKnowledge = async () => {
      const mockData = {
        id: 10,
        name: "示例知识库",
        description: "这是一个示例知识库的描述。",
        articles: [
          { id: 1, title: "文章一", summary: "这是第一篇文章的摘要。" },
          { id: 2, title: "文章二", summary: "这是第二篇文章的摘要。" },
          { id: 3, title: "文章三", summary: "这是第三篇文章的摘要。" },
        ],
      };

      setTimeout(() => {
        setKnowledge(mockData);
      }, 1000); // 模拟网络延迟
    };

    mockFetchKnowledge();
  }, [knowledgeId]);

  if (!knowledge) return <div>Loading...</div>;

  return (
    <div className={styles.knowledgeContainer}>
      <header className={styles.knowledgeHeader}>
        <h1>{knowledge.name}</h1>
        <p>{knowledge.description}</p>
      </header>

      <section className={styles.articlesList}>
        <h2>文章列表</h2>
        <ul>
          {knowledge.articles.map(article => (
            <li key={article.id} className={styles.articleItem}>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Knowledge;