import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useApiProgress } from "../shared/ApiProgress";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import {useDispatch} from 'react-redux';
import {loginHandler} from "../redux/authActions";



const UserLogin = props => {
   const [username,setUsername]= useState();
   const [password,setPassword] = useState();
   const [error,setError] = useState();
   const dispatch = useDispatch();
   useEffect(() => {
    setError(undefined);
   },[username,password]);

 

    const onClick = async event => {
        event.preventDefault();

        
        const { push  } = props.history;

        const authState = {
            username: username,
            password : password
        }
        
        try {
            await dispatch(loginHandler(authState));
            push('/');
        } catch (apiError) {
            setError(apiError.response.data.message)
        }
       
    }
        const {t} = useTranslation();
        const  pendingApiCall = useApiProgress('/api/1.0/auth');
        const buttonEnabled = username && password;

        return (<>
            <div className="container">
                <form className="">
                    <h1 className="text-center">{t('Login')}</h1>
                    <Input  label={t('Username')} onChange={(event) => setUsername(event.target.value) } />
                    <Input  label={t('Password')} type="password" onChange={(evet) => setPassword(evet.target.value)} />
                   {error &&  <div className="alert alert-danger mt-2" >
                        {error}
                    </div>}
                    <div className="text-center mt-3" >
                        <ButtonWithProgress pendingApiCall={pendingApiCall} onClick={onClick} text={t('Login')} disabled={!buttonEnabled || pendingApiCall} />
                    </div>

                </form>
            </div>

        </>)
}

export default UserLogin;