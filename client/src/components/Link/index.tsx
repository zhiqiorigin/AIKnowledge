import { ForwardedRef, forwardRef, useMemo } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useParams,
  useLocation,
} from 'react-router-dom';
import { addI18n, removeI18n } from '@/plugins/i18n';
type LinkProps = Omit<RouterLinkProps, 'ref'> & {
  ref?: ForwardedRef<HTMLAnchorElement>;
  to?: string;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { locale } = useParams<{ locale?: string }>(); // 获取当前语言
  const { pathname } = useLocation(); // 获取当前路径
  const { to: propsTo } = props; // 获取props中的to
  const to = propsTo ?? removeI18n(pathname); // 跳转路径
  const getUrlWithPrefix = useMemo<RouterLinkProps['to']>(() => {
    return addI18n(to, locale);
  }, [locale, to]); // 添加当前语言前缀
  return <RouterLink ref={ref} {...props} to={getUrlWithPrefix} style={{width:'100%'}}/>;
});

export default Link;
