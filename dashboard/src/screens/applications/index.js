import React from 'react';
import List from './List';
import Create from './Create';
import Show from './Show';
import TelegramIcon from '@material-ui/icons/Telegram';

export default {
  name: "applications",
  list: List,
  show: Show,
  create: Create,
  icon: <TelegramIcon />,
  options: {
    label: 'Solicitudes'
  }
}