import React from 'react';
import logo from "../assets/hoaxify.png"
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {  useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';

const TabBar = props => {
    const { t } = useTranslation();
    const {username,isLoggedIn} = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username
    }));
    const dispatch = useDispatch();

    const  onLogoutSuccess  = () => {dispatch(logoutSuccess())};

    let links = (<ul className='navbar-nav ml-auto'>
        <Link className='nav-link' to="/login"><li>{t('Login')}</li></Link>
        <Link className='nav-link' to="/signup"><li>{t('Sign Up')}</li></Link>
    </ul>)
    if (isLoggedIn) {
        links = (
            links = (<ul className='navbar-nav ml-auto'>
                <Link className='nav-link' to={'/user/' + username}><li>{username}</li></Link>
                <Link className='nav-link' to="/login"><li onClick={onLogoutSuccess}>{t('Logout')}</li></Link>
            </ul>)
        )
    }
    return (

        <>
            <div className='shadow-sm bg-light mb-2'>
                <nav className='navbar navbar-light  container navbar-expand justify-content-between'>
                    <Link className='navbar-brand' to="/">
                        <img src={logo} width="60" alt='hoaxify logo' />
                        Hoaxify
                    </Link>
                    {links}
                </nav>
            </div>
        </>
    );

}


export default TabBar;