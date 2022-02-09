import CategoriesList from './CommunitiesList'
import CategoriesCreate from './CommunitiesCreate'
import CategoriesEdit from './CommunitiesEdit'
import PublicIcon from '@material-ui/icons/Public';


export default {
    name: 'communities',
    icon: PublicIcon,
    list: CategoriesList,
    edit: CategoriesEdit,
    create: CategoriesCreate,
    options: {
        label: 'Comunidades'
    }
}
