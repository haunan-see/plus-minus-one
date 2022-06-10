import Directory from "../../components/directory/directory.component";

const Home = () => {
  const categories = [
    {
      id: 1,
      title: "Electronics",
      imageUrl: "https://cdn.shopify.com/s/files/1/1112/3836/products/Gen2-Silver-Product.jpg?v=1632716499&width=1100",
    },
    {
      id: 2,
      title: "Everyday Carry",
      imageUrl: "https://cdn.shopify.com/s/files/1/1112/3836/collections/Alpaka_Malaysia.jpg?v=1637299389",
    },
    {
      id: 3,
      title: "Tech & Accessories",
      imageUrl: "https://cdn.shopify.com/s/files/1/1112/3836/products/digital_1512x_d0105a28-0750-4cad-b5cc-8492eee287f4.jpg?v=1643252564",
    },
    {
      id: 4,
      title: "Backpacks",
      imageUrl: "https://images.squarespace-cdn.com/content/v1/5362a66ee4b05f0813543305/1574035525025-XTWJINKOXZY3HI0H1LRP/21022_travelpack2small_lifestyle_4.jpg?format=1000w",
    },
    {
      id: 5,
      title: "Fashions",
      imageUrl: "https://cdn.shopify.com/s/files/1/1112/3836/products/LIFESTYLE-COFB-16.jpg?v=1635305620&width=1000",
    },
  ];
  return <Directory categories={categories} />;
};

export default Home;
