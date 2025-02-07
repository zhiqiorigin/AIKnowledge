import { useState } from 'react';
import styles from './TeamOverview.module.scss';

interface TeamSummary {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  knowledgeBaseCount: number;
  lastActivityAt?: Date;
}

export default function TeamOverview({ team }: { team: Team }) {
  const [activeTab, setActiveTab] = useState<'members' | 'knowledge_bases'>( 'knowledge_bases');

  return (
    <div className={styles.teamOverview}>
      <div className={styles.header}>
        <h1>{team.name}</h1>
        <p>{team.description}</p>
        <div className="stats">
          <span>成员：{team.members.length}人</span>
          <span>知识库：{team.knowledgeBasesCount || 0}个</span>
        </div>
      </div>

      <div className={styles.content}>
        {activeTab === 'knowledge_bases' && (
          <KnowledgeBaseList teamId={team.id} />
        )}

        {activeTab === 'members' && (
          <MembersList members={team.members} />
        )}
      </div>
    </div>
  );
}
