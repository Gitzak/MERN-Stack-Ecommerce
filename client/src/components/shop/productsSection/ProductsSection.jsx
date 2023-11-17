import { Box, Stack, Typography} from '@mui/material'
import HorizontalScrollBar from './horizontalScrollBar/HorizontalScrollBar'

const ProductsSection = () => {


  return (
    <Stack alignItems='center' mt='40px' justifyContent='center' p='20px'>
      <Typography 
        fontWeight={700}
        sx={{ fontSize:{  lg:'40px', xs:'30px'}}}
        mb="50px"
        textAlign="center"
      
      >
        Most Polular <br/>
        Products 
      </Typography>

      <Box sx={{ position:"relative", width:"100%", p:'20px'}}>
        <HorizontalScrollBar/>
      </Box>

    </Stack>
  )
}

export default ProductsSection
