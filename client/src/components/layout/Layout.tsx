// Layout.tsx
import { useEffect, Suspense, FC } from 'react';
import { useParams, Outlet, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SideBar from './SideBar';
import styles from './Layout.module.scss'; // CSS 模块
import classNames from 'classnames';
// import { useMediaQuery } from "react-responsive";
// import { FiMenu, FiX } from "react-icons/fi";
import { useState } from 'react';

const Layout: FC = () => {
  const { locale = 'en' } = useParams();
  const { t, i18n } = useTranslation();
  // const isMobile = useMediaQuery({ maxWidth: 768 });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // useEffect(() => {
  //   if (isMobile) setSidebarOpen(false);
  // }, [location.pathname]); // 路由变化时自动关闭移动端侧边栏

  if (locale && !['zh', 'en'].includes(locale) && locale !== '404') {
    return <Navigate to="/404" />;
  }

  return (
    <div className={styles.layoutContainer}>
      {/* 移动端菜单按钮 */}
      {/* {isMobile && (
        <button
          className={styles.menuToggle}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      )} */}
      <SideBar
        className={classNames(styles.sidebar, {
          [styles.mobileOpen]: sidebarOpen,
          [styles.mobileHidden]: !sidebarOpen,
        })}
      />

      <main className={styles.contentArea}>
        <Suspense fallback={<div className={styles.loading}>{t('loading')}...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
