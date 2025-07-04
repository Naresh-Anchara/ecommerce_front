import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartModel from '../pages/shop/CartModel';
import avatar from '../assets/avatar.png'
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';
const Navbar = () => {
  const products = useSelector((state) => state.cart.products); 
  const [isCartOpen,setIsCartOpen] = useState(false);
  const handleCartToggle = () =>{
    setIsCartOpen(!isCartOpen);
  }
 
  //show user if logged in
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  //dropdown menu
  const [isDropDownOpen,setIsDropDownOpen] = useState(false);

  const handDropDownToggle = () =>{
    setIsDropDownOpen(!isDropDownOpen);
  }

  const handleLogout = async () =>{
    try {
       await logoutUser().unwrap();
       dispatch(logout());
       navigate("/");
    } catch (error) {
      console.error("failed to log out",error);
    }
  }

  //admin drop down menus
  const adminDropDownMenus = [
    {lable:"Dashboard",path:"/dashboard/admin"},
    {lable:"Manage Items",path:"/dashboard/manage-products"},
    {lable:"All Orders",path:"/dashboard/manage-orders"},
    {lable:"Add Product",path:"/dashboard/add-product"},
  ]
  
  //users drop down menus
  const userDropDownMenus = [
    {lable:"Dashboard",path:"/dashboard"},
    {lable:"Profile",path:"/dashboard/profile"},
    {lable:"Payments",path:"/dashboard/payments"},
    {lable:"Orders",path:"/dashboard/orders"},
  ]

  const dropDownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : 
    [...userDropDownMenus];

  return (
    <header className='fixed-nav-bar w-nav'>
      <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
        <ul className='nav__links'>
          <li className='link'><Link to="/">Home</Link></li>
          <li className='link'><Link to="/shop">Shope</Link></li>
          <li className='link'><Link to="/pages">Pages</Link></li>
          <li className='link'><Link to="/contact">Contact</Link></li>
        </ul>

        {/* logo */}
        <div className='nav__logo'>
            <Link to="/">Lebaba<span>.</span></Link>
        </div>

        {/* nav icons */}
        <div className='nav__icons relative'>
           <span>
              <Link to="/search">
                <i className="ri-search-line"></i>
              </Link>
           </span>
           <span>
            <button onClick={handleCartToggle} className='hover:text-primary'>
            <i className="ri-shopping-bag-line"></i>
            <sup className='text-sm inline-block px-1.5 text-white rounded-full
            bg-primary text-center'>{products.length}</sup>
            </button>
           </span>
           <span>
            {
              user && user ? <>
                <img 
                onClick={handDropDownToggle}
                src={user?.profileImage || avatar} alt="" className='size-6
                rounded-full cursor-pointer'/> 
                {
                  isDropDownOpen && (
                    <div className='absolute right-0 mt-3 p-4 w-48 bg-white
                    border border-gray-200 rounded-lg shadow-lg z-50'>
                      <ul className='font-medium space-y-4 p-2'>
                        {dropDownMenus.map((menu,index)=>(
                          <li key={index}>
                             <Link 
                             onClick={() => setIsDropDownOpen(false)}
                             className='dropDown-items' to={menu.path}>
                             {menu.lable}</Link>
                          </li>
                        ))}
                        <li><Link onClick={handleLogout}
                        className='dropDown-items'
                        >Logout</Link></li>
                      </ul>
                    </div>
                  )
                }
              </>:(<Link to="login">
                <i className="ri-user-line"></i>
               </Link>)
            }
           </span>
        </div>
      </nav>
      {isCartOpen && <CartModel products={products} isOpen={isCartOpen}
      onClose={handleCartToggle} />}
    </header>
  )
}

export default Navbar


