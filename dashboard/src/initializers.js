import createAdminStore from './store';
import spanishMessages from '@blackbox-vision/ra-language-spanish';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { history } from './utils';
import { apiURL } from './config';
import apiClient from '@jodaz_/data-provider';

const i18nProvider = polyglotI18nProvider(() => ({
  ...spanishMessages,
  resources: {
    organizations: {
      name: 'Institución |||| Instituciones'
    }
  },
}));

export const dataProvider = apiClient(apiURL);

export const store = createAdminStore({
  dataProvider,
  history
});

export {
  i18nProvider,
  history
}

