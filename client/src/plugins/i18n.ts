// @/config/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zh from './locales/zh.json';
export const SupportedLngs = ['en', 'zh'] as const;
/**
 * Initializes the internationalization (i18n) library with the provided resources and configuration.
 *
 * @return {Promise<void>} A Promise that resolves when the i18n library is successfully initialized.
 */
i18n.use(initReactI18next).init({
  resources: {
    en,
    zh,
  },
  lng: 'zh', // 默认语言
  supportedLngs: SupportedLngs,
  fallbackLng: 'zh',
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
// 支持的语言
export const I18nLangs = ['en', 'zh'] as const;
// 添加国际化前缀
export const addI18n = (to: string, locale?: string) => {
  // 如果没有locale，直接返回
  if (!locale || !to) return to;
  return `/${locale}${to}`;
};
// 删除国际化前缀
export const removeI18n = (to: string) => {
  const isInLocale = SupportedLngs.find((lang) => to.startsWith(`/${lang}`)); // 是否是支持的语言
  if (!isInLocale) return to; // 不是支持的语言，直接返回
  return to.replace(`/${isInLocale}`, '');
};

// 切换国际化
// function useChangeLanguage(): [string, (newLanguage: string) => void] {
//   const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

//   const changeLanguage = (newLanguage: any) => {
//     if (SupportedLngs.includes(newLanguage)) {
//       i18n.changeLanguage(newLanguage).then(() => {
//         setCurrentLanguage(newLanguage);
//       });
//     }
//   };

//   return [currentLanguage, changeLanguage];
// }

// export default useChangeLanguage;
