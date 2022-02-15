import CommunitiesList from './CommunitiesList'
import CommunitiesCreate from './CommunitiesCreate'
import CommunitiesEdit from './CommunitiesEdit'
import PublicIcon from '@material-ui/icons/Public';


export default {
    name: 'communities',
    icon: PublicIcon,
    list: CommunitiesList,
    edit: CommunitiesEdit,
    create: CommunitiesCreate,
    options: {
        label: 'Comunidades'
    }
}
