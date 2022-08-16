import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItemsCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const dispatch = useDispatch();

  const cartItemsCount = useSelector(selectCartItemsCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toggleIsOpenCart = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <div className="cart-icon-container" onClick={toggleIsOpenCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartItemsCount}</span>
    </div>
  );
};

export default CartIcon;
