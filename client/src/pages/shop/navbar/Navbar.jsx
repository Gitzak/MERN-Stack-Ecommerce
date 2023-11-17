import LogoShop from '../../../assets/logo.png';
import { Outlet , Link, useNavigate} from 'react-router-dom'
import { Fragment } from 'react'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { CustomerC } from '../../../context/shopContext/CustomerContext';

import './Navbar.css'

const Navbar = () => {
    const { currentCustomer, setCurrentCustomer } = CustomerC();
    const navigate = useNavigate();


    const signOutCustomer = () => {
        setCurrentCustomer(null);
        localStorage.removeItem("CustomerId");
        localStorage.removeItem("token");
        navigate("/shop/signIn");

    } 
    return (
        <Fragment>
            <div className='navigation'> 
                <Link className='logo-container' to='/shop'>
                    <img className='logo' src={LogoShop} alt='Logo' />
                </Link>


                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop/products'>Shop</Link>
                    {
                    currentCustomer ?  (<span className='nav-link' onClick={signOutCustomer}> Sign Out </span>) 
                                    : (
                                        <>
                                            <Link className='nav-link' to='/shop/signIn'> Sign In </Link>
                                            <Link className='nav-link' to='/shop/signUp'> Sign Up </Link>
                                        </>
                                    )          
                    }
                   
                    <Link className='nav-link' to='/shop/products'> <LocalMallOutlinedIcon/> </Link>
                    <Link className='nav-link' to='/shop/products'> <SearchOutlinedIcon/> </Link>
                </div>
            </div>

        </Fragment>
    )
}

export default Navbar
