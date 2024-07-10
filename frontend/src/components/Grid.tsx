import { useLayoutEffect } from "react";
import { useStore } from "../store";
import styled from "@emotion/styled";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

const LayountGrid = styled.div`
  margin-top: 76px;
  margin-left: 16px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(345px, 1fr));
  width: 100%;
  justify-items: center;
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Grid = () => {
  const { isLoading, isError } = useStore((state) => state.APIState);
  const fetchData = useStore((state) => state.fetchProductData);
  const data = useStore((state) => state.products);
  const buyProduct = useStore((state) => state.buyProduct);

  useLayoutEffect(() => {
    if (fetchData) fetchData();
  }, [fetchData]);

  if (isLoading)
    return (
      <CenteredDiv>
        <div>Loading data...</div>
        <CircularProgress />
      </CenteredDiv>
    );

  if (isError)
    return (
      <CenteredDiv>
        <div style={{ color: "red" }}>There's been an error...</div>
      </CenteredDiv>
    );

  if (!data.length)
    return <CenteredDiv>There are no products to display</CenteredDiv>;

  return (
    <LayountGrid>
      {data.map((product) => (
        <Card sx={{ maxWidth: 345 }} key={product.id}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                In stock: {product.quantity}
              </Typography>
              <Button variant="outlined" onClick={() => buyProduct(product.id)}>
                {product.currency.symbol}
                {product.price.toFixed(2)}
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </LayountGrid>
  );
};
