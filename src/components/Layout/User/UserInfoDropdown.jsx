import React, { createContext } from 'react';
import { useRef, useState } from 'react';
import ShoppingCart from '../shoppingCart/shoppingCart';
import Login from '../../Pages/LoginPage/LoginPage';
import useClickOutside from '../../../Hooks/useClickOutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRectangleList,
    faPizzaSlice,
    faGear,
    faGears,
} from '@fortawesome/free-solid-svg-icons';
import './UserStyles.scss';
import 'animate.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import userIcon from '../../../assets/images/user.png'

export const UserContext = createContext();

const UserInfoDropdown = ({ show, setShow }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate();
    const userData = Cookies.get('userData')
        ? JSON.parse(Cookies.get('userData'))
        : {};
    const userInfoRef = useRef(null);

    useClickOutside(userInfoRef, () => {
        setTimeout(() => {
            if (showLogin || showPass || showRegister) {
                return;
            } else {
                setShow(false);
            }
        }, 100);
    });

    function toTop() {
        document.documentElement.scrollTop = 0;
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
    }

    return (
        <div
            className={`user-info ${!show ? 'reverse' : ''}`}
            ref={userInfoRef}
        >
            <div className="user-img">
                <img src={userIcon} alt="user-image" />
            </div>
            <h4 className="animate__animated animate__heartBeat">
                {userData.id ? `Welcome, ${userData.userName || 'User'}!` : 'Welcome!'}
            </h4>
            {
                // userData.id ? (
                <>
                    <div className="gadgets">
                        <div className="orderHistory-btn" onClick={() => {
                            navigate('/ElixirRestaurant/account/orders');
                            toTop()
                            setShow(false);
                        }}>
                            <FontAwesomeIcon
                                icon={faRectangleList}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}

                            />
                            <p className="gadget-description first">
                                Check Order History
                            </p>
                        </div>
                        <UserContext.Provider
                            value={{
                                showLogin,
                                setShowLogin,
                                showPass,
                                setShowPass,
                                showRegister,
                                setShowRegister,
                            }}
                        >
                            <Login />
                        </UserContext.Provider>
                        <div className='accountSettings'
                            onClick={() => {
                                navigate('/ElixirRestaurant/account');
                                toTop()
                            }}>
                            <FontAwesomeIcon icon={faGears} /></div>
                    </div>

                </>

                // ) 
                // : <div className="icons">
                //     <UserContext.Provider
                //         value={{
                //             showLogin,
                //             setShowLogin,
                //             showPass,
                //             setShowPass,
                //             showRegister,
                //             setShowRegister,
                //         }}
                //     >
                //         <Login />
                //     </UserContext.Provider>
                // </div>
            }

        </div>
    );
};

export default UserInfoDropdown;
