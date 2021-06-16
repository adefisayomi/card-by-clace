import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { GlobalState } from '../../context/globalState';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 0,
    padding: '0 2px',
  },
}))(Badge);



export default function CardTab () {

  const { cart, user} = GlobalState()


  return (
      <div>
          <IconButton aria-label="cart" style= {{ color: 'white' }} color= 'inherit' disableElevation >
            <StyledBadge badgeContent={ user && cart?.length > 0 ? cart?.length : '0' } >
                <ShoppingCartIcon style= {{ fontSize: '16px' }} />
            </StyledBadge>
          </IconButton>
      </div>
  );
}
