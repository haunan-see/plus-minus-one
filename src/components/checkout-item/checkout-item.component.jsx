import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
} from "../../store/cart/cart.action";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addItemHandler = () => dispatch(addItemToCart(cartItem, cartItems));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItem, cartItems));
  const clearItemHandler = () =>
    dispatch(deleteItemFromCart(cartItem, cartItems));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          <RemoveIcon />
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          <AddIcon />
        </div>
      </span>
      <span className="price"> {price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        <DeleteForeverIcon />
      </div>
    </div>
  );
};

export default CheckoutItem;
