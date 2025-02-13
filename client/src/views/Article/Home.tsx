// components/Home.tsx
import React, { useContext } from 'react';
import styles from './Home.module.scss';
import { useKnowledgeContext } from '../Knowledge/KnowledgeContext';

const Home = () => {
  const { knowledge } = useKnowledgeContext();

  if (!knowledge) return <div>Loading...</div>;

  return (
    <div className={styles.homeContainer}>
      {/* 知识库基础介绍 */}
      <section className={styles.knowledgeIntro}>
        <h1>{knowledge.name}</h1>
        <p>{knowledge.description}</p>
      </section>

      {/* 文章列表 */}
      <section className={styles.articlesList}>
        <h2>文章列表</h2>
        <ul>
          {knowledge.articles.map(article => (
            <li key={article.id} className={styles.articleItem}>
              <strong>{article.title}</strong> - {article.summary}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;