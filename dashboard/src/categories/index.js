import CategoriesList from './CategoriesList'
import CategoriesCreate from './CategoriesCreate'
import CategoriesEdit from './CategoriesEdit'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

export default {
    name: 'categories',
    icon: ShoppingBasketIcon,
    list: CategoriesList,
    edit: CategoriesEdit,
    create: CategoriesCreate,
    options: {
        label: 'Categorías'
    }
}
