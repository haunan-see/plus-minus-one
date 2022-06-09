import { useContext } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { CartContext } from "../../contexts/cart.context";

import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addToCart = () => {
    addItemToCart(product);
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
