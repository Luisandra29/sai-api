import React from 'react';
import ApplicationsList from './ApplicationsList';
import ApplicationsCreate from './ApplicationsCreate';
import ApplicationsShow from './ApplicationsShow';
import TelegramIcon from '@material-ui/icons/Telegram';

export default {
  name: "applications",
  list: ApplicationsList,
  show: ApplicationsShow,
  create: ApplicationsCreate,
  icon: TelegramIcon,
  options: {
    label: 'Solicitudes'
  }
}