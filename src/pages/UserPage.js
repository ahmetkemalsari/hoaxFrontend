import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/ApiCalls';
import ProfileCard from '../components/ProfileCard';
import Spinner from '../components/Spinner';
import { useApiProgress } from '../shared/ApiProgress';


const UserPage = (props) => {
    
    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);
    const { username } = useParams();
    const pendingApiCall = useApiProgress('/api/1.0/users/'+username);
    const { t } = useTranslation();
    

    useEffect(() => {
        setNotFound(false);
    }, [user]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
            } catch (err) {
                setNotFound(true)
            }
        }
        loadUser();
    }, [username]);
    if(pendingApiCall){
        return(<Spinner />)
    }
    if (notFound) {
        return (
            <div className='container'>
                <div className="alert alert-danger" role="alert">
                    <div className='text-center'>
                       <div className='mt-3'>
                       <span className="material-icons text-danger" style={{fontSize : "48px"}}>
                            error
                        </span>
                       </div>
                        {t('User Not Found')}
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='container'>
            <ProfileCard user= {user}/>
        </div>
    );
};

export default UserPage;