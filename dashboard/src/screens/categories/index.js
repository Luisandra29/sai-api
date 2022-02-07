import React from 'react';
import List from './List';
import Show from './Show';
import Edit from './Edit';
import Create from './Create';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export default {
    name: "categories",
    list: List,
    show: Show,
    create: Create,
    edit: Edit,
    icon: <LocalOfferIcon />,
    options: {
      label: 'Categorías'
    }
}
