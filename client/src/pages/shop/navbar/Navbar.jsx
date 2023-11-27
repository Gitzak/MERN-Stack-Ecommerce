import LogoShop from '../../../assets/logo.png';
import { Link, useNavigate} from 'react-router-dom'
import { Fragment } from 'react'
import { CustomerC } from '../../../context/shopContext/customer/CustomerContext';
import LogoutIcon from '@mui/icons-material/Logout';
import RightDrawer from '../../../components/shop/Drawer/RightDrawer';


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
                    currentCustomer ?  (<span className='nav-link' onClick={signOutCustomer}> <LogoutIcon/> </span>) 
                                    : (
                                        <>
                                            <Link className='nav-link' to='/shop/signIn'> <button> Sign In </button>  </Link>
                                            {/* <Link className='nav-link' to='/shop/signUp'> Sign Up </Link> */}
                                        </>
                                    )          
                    }
                    <RightDrawer/>
                </div>
            </div>

        </Fragment>
    )
}

export default Navbar
