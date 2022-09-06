import React, { useState } from "react";
import Input from "../components/Input";
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useApiProgress } from "../shared/ApiProgress";
import {signupHandler} from "../redux/authActions";
import {useDispatch} from 'react-redux';


const UserSignUp = (props) =>{    
    const [form,setForm] =useState({
        username : undefined,
        displayName: undefined,
        password : undefined,
        passwordRepeat : undefined
    });
    const [errors,setErrors] = useState({});
    const {t} = useTranslation();
    const dispatch = useDispatch();
const onChange = event =>{
        const {name,value} = event.target;
        const errorCopy = {...errors};
        errorCopy[name] = undefined;
        if(name === "password" || name === "passwordRepeat"){
            if(name === "password" && value !== form.passwordRepeat){
                errorCopy.passwordRepeat = t("password mismatch");
            }else if(name === "passwordRepeat" && value !== form.password){
                errorCopy.passwordRepeat = t("password mismatch");
            }else{
                errorCopy.passwordRepeat = undefined;
            }
        }
        setErrors(errorCopy);
        const formCopy = {...form};
        formCopy[name] = value;
        setForm(formCopy);
    }

const onClick = async event => {
        event.preventDefault();
        const {   push} = props.history;
        const {username,displayName,password} =form;
        const body = {
            username,
            displayName,
            password
        };
        try {
            await dispatch(signupHandler(body));
            push("/");
        } catch (err) {
            if (err.response.data.validationErrors) {
                setErrors({  ...err.response.data.validationErrors })
            }
        }
    };

        const userSignupPendingApiCall = useApiProgress('/api/1.0/users');
        const userLoginPengingApiCall = useApiProgress('/api/1.0/auth');
        const pendingApiCall = userLoginPengingApiCall || userSignupPendingApiCall;

        const { username : errorUsername, displayName : errorDisplayName, password : errorPassword, passwordRepeat : errorPasswordRepeat } = errors;
        return (<>
           
                <div className="container">
                    <div className="col my-auto">
                        <div className="text-center">
                            <h1 className="text-center">{t('Sign Up')}</h1>
                        </div>
                        <form className="">
                            <Input name="username" label={t('Username')} onChange={onChange} error={errorUsername} ></Input>
                            <Input name="displayName" label={t('Display Name')} onChange={onChange} error={errorDisplayName} ></Input>
                            <Input name="password" label={t('Password')} onChange={onChange} error={errorPassword} type="password" ></Input>
                            <Input name="passwordRepeat" label={t('Password Repeat')} onChange={onChange} type="password" error={errorPasswordRepeat} ></Input>
                           
                            <div className="text-center mt-3">
                            <ButtonWithProgress pendingApiCall={pendingApiCall} onClick={onClick }text={t('Sign Up')} disabled={pendingApiCall || errorPasswordRepeat !== undefined} />
                           

                            </div>
                        </form>
                    </div>
                </div>
        </>)
}


export default UserSignUp;