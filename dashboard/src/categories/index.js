import CategoriesList from './CategoriesList'
import CategoriesCreate from './CategoriesCreate'
import CategoriesEdit from './CategoriesEdit'
import LocalOfferIcon from '@material-ui/icons/LocalOffer';


export default {
    name: 'categories',
    icon: LocalOfferIcon,
    list: CategoriesList,
    edit: CategoriesEdit,
    create: CategoriesCreate,
    options: {
        label: 'Categorías'
    }
}
