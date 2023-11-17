import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea } from "@mui/material";
import SuccessValidation from "../../../assets/HeroImage.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ValidateCustomer } from "../../../api/customerApi";

const ValidatedAccount = () => {
    const { id } = useParams();
  const navigate = useNavigate();

  const HandleValidation = async() => {
    const response = await ValidateCustomer(id)
    navigate("/shop/signIn");

  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={SuccessValidation}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign="center"
            >
              Page Validation
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Please click the link bellow to validate your Account
            </Typography>
            <Button
              variant="contained"
              color="error"
              sx={{ backgroundColor: "#e3a346", padding: "5px" }}
              type="submit"
              onClick={HandleValidation}
            >
              Validate And return to Login
            </Button>
            {/* <Link className='nav-link' to='/shop/auth'> validate </Link> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
export default ValidatedAccount;
