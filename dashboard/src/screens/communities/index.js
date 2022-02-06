import React from 'react';
import List from './List';
import Edit from './Edit';
import Create from './Create';
import Show from './Show';
import PublicIcon from '@material-ui/icons/Public';

export default {
    name: "communities",
    list: List,
    show: Show,
    create: Create,
    edit: Edit,
    icon: <PublicIcon />,
    options: {
      label: 'Comunidades'
    }
}
