import { Navigate, useRoutes, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Layout = lazy(() => import('@/components/layout/Layout'));
const Home = lazy(() => import('@/views/Home'));
const NotFound = lazy(() => import('@/views/Constant/404'));
const RecentUpdate = lazy(() => import('@/views/RecentUpdate'));
const AI = lazy(() => import('@/views/AI'));
const Login = lazy(()=> import('@/views/Constant/Login'))
const Register = lazy(()=> import('@/views/Constant/Register'))
const Knowledge = lazy(()=> import('@/views/Knowledge/Knowledge'))
const ArticleHome = lazy(()=> import('@/views/Article/Home'))
const ArticleDetail = lazy(()=> import('@/views/Article/ArticleDetail'))
/**
 * 公共路由
 */
// export const constantRoutes: RouteObject[] = [
//   {
//     path: '/',
//     id: 'Home',
//     element: <Home />,
//   },
// ];

const constantRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={`/zh/home`} />,
  },
  {
    path: '/:locale',
    element: <Navigate to={`/zh/home`} />,
  },
  {
    path: '/:locale',
    element: <Layout />,
    children: [
      // 其他子路由配置
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'recentupdate',
        element: <RecentUpdate />,
      },
      {
        path: 'ai',
        element: <AI />,
      },
      {
        path: 'knowledge/:knowledgeId',
        element: <Knowledge />,
        children: [
          {
            index: true,
            element: <ArticleHome />, // 默认显示首页
          },
          {
            path: 'articles/:articleId',
            element: <ArticleDetail />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to={`/404`} />,
  },
];
// 创建一个可以被 React 应用程序使用的路由实例
const router = () => {
  const routes = useRoutes(constantRoutes);
  return routes;
};

export default router;
