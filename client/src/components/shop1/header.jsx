import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
    HomeOutlined,
    AppstoreOutlined,
    BarsOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    HeartOutlined,
} from "@ant-design/icons";
import { MailOutlined, ShoppingBagOutlined } from "@mui/icons-material"; // Using MUI icons as alternatives
import {
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from "@mui/material";

// const items = [
//     {
//         key: "1",
//         icon: <HomeOutlined />,
//         title: "Home",
//         path: "/",
//     },
//     {
//         key: "2",
//         icon: <AppstoreOutlined />,
//         title: "Shop",
//         path: "/shop",
//     },
//     {
//         key: "3",
//         icon: <ShoppingCartOutlined />,
//         title: "Cart",
//         path: "/cart",
//     },
//     {
//         key: "4",
//         icon: <UserOutlined />,
//         title: "Profile",
//         path: "/profile",
//     },
//     {
//         key: "5",
//         icon: <HeartOutlined />,
//         title: "Wishlist",
//         path: "/wishlist",
//     },
// ]

// function getItem(label, key, icon = null, children = [], type = null) {
//     return {
//         label,
//         key,
//         icon,
//         children,
//         type,
//     };
// }

// const items = [
//     getItem(
//         <Link to="/shop/categories">
//             {" "}
//             <AppstoreOutlined /> Categories
//         </Link>,
//         "categories"
//     ),
//     getItem(
//         <TextField
//             label="Outlined secondary"
//             color="primary"
//             sx={{
//                 width: "83vh",
//                 marginLeft: "auto",
//             }}
//             InputProps={{
//                 endAdornment: (
//                     <span style={{ cursor: "pointer" }}>
//                         <SearchIcon
//                             sx={{ color: "action.active", mr: 1, my: 0.5 }}
//                         />
//                     </span>
//                 ),
//             }}
//         />,
//         "search"
//     ),
//     getItem(
//         <Link to="/shop/login">
//             {" "}
//             <UserOutlined /> Login
//         </Link>,
//         "login"
//     ),
//     getItem(
//         "",
//         "grp",
//         null,
//         [
//             getItem(
//                 <Link to="/shop/profile/favorites">
//                     {" "}
//                     <HeartOutlined />
//                 </Link>,
//             ),
//             getItem(
//                 <Link to="/shop/orders">
//                     {" "}
//                     <ShoppingBagOutlined />
//                 </Link>,
//             ),
//         ],
//         "group"
//     ),
// ];

const items = [
    {
      label: (
        <Link to="/shop/categories">
          {" "}
          <AppstoreOutlined /> Categories
        </Link>
      ),
      key: "categories",
    },
    {
      label: (
        <TextField
          label="Outlined secondary"
          color="primary"
          sx={{
            width: "83vh",
            marginLeft: "auto",
          }}
          InputProps={{
            endAdornment: (
              <span style={{ cursor: "pointer" }}>
                <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              </span>
            ),
          }}
        />
      ),
      key: "search",
    },
    {
      label: (
        <Link to="/shop/login">
          {" "}
          <UserOutlined /> Login
        </Link>
      ),
      key: "login",
    },
    // {
    //   label: "",
    //   key: "grp",
    //   children: [
    //     {
    //       label: (
    //         <Link to="/shop/profile/favorites">
    //           {" "}
    //           <HeartOutlined />
    //         </Link>
    //       ),
    //       key: "wishlist",
    //     },
    //     {
    //       label: (
    //         <Link to="/shop/orders">
    //           {" "}
    //           <ShoppingBagOutlined />
    //         </Link>
    //       ),
    //       key: "cart",
    //     },
    //   ],
    //   type: "group",
    // },
    {
        label: (
          <Link to="/shop/profile/favorites">
            {" "}
            <FavoriteIcon />
          </Link>
        ),
        key: "wishlist",
      },
      {
        label: (
          <Link to="/shop/orders">
            {" "}
            <ShoppingBagOutlined />
          </Link>
        ),
        key: "cart",
      },
  ];
  


const ShopHeader = () => {
    return (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // margin:0,
                // padding: 0,
                position: "sticky",
                width: "100%",
                zIndex: "1000",
                top: "0",
            }}
        >
            <Link to={"/shop/"}>
                <div className="demo-logo" />
            </Link>
            <Menu mode="horizontal" theme="light" items={items.map(item => {
          const className = item.key === "wishlist" ? "wishlistStyle" :
                            item.key === "cart" ? "cartStyle" : "";
          return { ...item, className };
        })}
        style={{
            "& .wishlistStyle": {
              // Styles for the wishlist item
              // Add your specific styles here
            //   color: "red", 
                right: "-10px"
            },
            "& .cartStyle": {
              // Styles for the cart item
              // Add your specific styles here
            //   color: "blue", 
            left: "-10px"
            },
          }}
        />
        </Header>
    );
};

export default ShopHeader;
