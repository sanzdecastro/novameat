export const defaultLang = 'es';

export const languages = {
  es: 'ES',
  en: 'EN'
};

export function getLangFromUrl(url) {
  const parts = url.pathname.split('/');
  return languages[parts[1]] ? parts[1] : defaultLang;
}
