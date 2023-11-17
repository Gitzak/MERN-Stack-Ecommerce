import { Box, Stack, Typography } from '@mui/material'
import './CollectionSection.css'
import CollectionCard from "./collectionCard/CollectionCard"

const CollectionSection = () => {
  return (
    <Box 
        sx={{ mt: {lg: '110px'}}}
        mt='50px'
        p='20px'
    >
        <Typography variant='h3' fontWeight='bold' mb="50px" sx={{ textAlign: 'center' }}>
            Popular Categories  
        </Typography>
        
        <Stack direction='row' sx={{ gap: { lg: '50px', xs:'50px'}}} flexWrap='wrap' justifyContent='center'>
            <CollectionCard categoryName={"Leather Goods"}/>
            <CollectionCard categoryName={"Traditional Jewelry"}/>
            <CollectionCard categoryName={"Artisanal Furniture"} />
        </Stack>
    </Box>

    
  )
}

export default CollectionSection
