import { Link } from "react-router-dom"
import { Button, Stack, Typography } from "@mui/material"
import Image from '../../../assets/HeroImage.jpg'
import './ShopProductCard.css'

const ShopProductCard = ({product}) => {
  return (
    <Link to={`/shop/products/${product._id}`} className="product-card">
      <img src={product.productImages[0] || Image} alt=""  loading="lazy"/>
      <Stack direction='row'>
            <Button sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
                {product.productName}
            </Button>
            <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
                {product.price}
            </Button>
      </Stack>
      <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">
            {product.quantity}
      </Typography>

    </Link>
  )
}

export default ShopProductCard
