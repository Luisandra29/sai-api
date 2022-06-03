import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit';
import LinkBehavior from './LinkBehavior';

const EditButton = ({ href, ...rest }) => (
    <Button component={LinkBehavior} to={href} {...rest}>
        <EditIcon />
    </Button>
)

export default EditButton
