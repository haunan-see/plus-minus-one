import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItemToCart(product, cartItems));
  };

  return (
    <Card className="product-card-container" sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="300" image={imageUrl} alt={name} />
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            {`RM ${price}`}
          </Typography>
        </Stack>
      </CardContent>
      <Button size="large" onClick={addToCart}>
        Add to cart
      </Button>
    </Card>
  );
};

export default ProductCard;
