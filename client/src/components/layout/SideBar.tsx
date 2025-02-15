import { FC, useState } from 'react';
import Link from '@/components/Link';
import styles from './SideBar.module.scss';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
const SideBar: FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [knowledgeBases] = useState([
    { id: '1', name: '项目文档' },
    { id: '2', name: '设计资源' },
    { id: '3', name: '会议记录' },                      
  ]);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <nav className={classNames(styles.sidebar, className)}>
      <div className={styles.topSection}>
        {/* 搜索框 */}
        <div className={styles.searchBox}>
          <input
            type="search"
            placeholder={t('navbar.search')}
            className={styles.searchInput}
          />
        </div>
        {/* 个人资料区域 */}
        <div className={styles.profileBox}>
          <div className={styles.profileLeft}>
            <div className={styles.avatar} />
            <div className={styles.userInfo}>
              <span className={styles.userName}>张三</span>
              <span className={styles.userStatus}>在线</span>
            </div>
          </div>
          <button className={styles.moreButton}>⋯</button>
        </div>
      </div>

      <div className={styles.scrollableContent}>
        <ul className={styles.menu}>
          <li
            className={`${location.pathname.split('/')[2] === 'home' ? styles.active : ''}`}
          >
            <Link
              to="/home"
            >
              <i className="iconfont">&#xe6e9;</i>
              <span>{t('navbar.home')}</span>
            </Link>
          </li>
          <li
            className={`${location.pathname.split('/')[2] === 'recentupdate' ? styles.active : ''}`}
          >
            <Link
              to="/recentupdate"
            >
              <i className="iconfont">&#xe6e9;</i>
              <span>{t('navbar.recentupdate')}</span>
            </Link>
          </li>
          <li
            className={`${location.pathname.split('/')[2] === 'ai' ? styles.active : ''}`}
          >
            <Link
              to="/ai"
            >
              <i className="iconfont">&#xe6e9;</i>
              <span>{t('navbar.ai')}</span>
            </Link>
          </li>
        </ul>
        
        {/* 知识库模块 */}
        <div className={styles.knowledgeSection}>
          <h3 className={styles.sectionTitle}>
            {/* 添加点击事件和旋转样式 */}
            <i
              className={`iconfont ${styles.collapseIcon} ${isCollapsed ? styles.collapsed : ''}`}
              onClick={toggleCollapse}
            >&#xe6e9;</i>
            {t('navbar.knowledgeBase')}
          </h3>

          {/* 根据折叠状态控制显示 */}
          <ul className={`${styles.menu} ${isCollapsed ? styles.collapsedMenu : ''}`}>
            {knowledgeBases.map((kb) => (
              <li key={kb.id} className={`${styles.menuItem} ${location.pathname.startsWith(`/knowledge/${kb.id}`) ? styles.active : ''}`}>
                <Link to={`/knowledge/${kb.id}`}>
                  <i className="iconfont">&#xe6e9;</i>
                  <span>{kb.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
