import { Link } from "react-router-dom"
import { Button, Stack, Typography } from "@mui/material"
import HeroBannerImage from '../../../../assets/HeroImage.jpg'

import './CollectionCard.css'

const CollectionCard = ({categoryName}) => {
  return (
    <Link to={`/shop/products`} className="exercise-card">
      
      <img src={HeroBannerImage} alt=""  loading="lazy"/>
      <Stack direction='row'>
            <Button sx={{ ml: '21px', color: '#fff', background: '#e3a346', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
                Womens
            </Button>
            <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
                Mens
            </Button>
      </Stack>
      <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">
            {categoryName}
      </Typography>

    </Link>
  )
}

export default CollectionCard
