import React, { useEffect, useState } from 'react';
import { getUsers } from "../api/ApiCalls";
import UserListItem from './UserListItem';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
const UserList = () => {
  const [page, setPage] = useState({
    content: [],
    size: 3,
    number: 0
  });
  const pendingApiCall = useApiProgress("/api/1.0/users?page");
  const [loadFailer, setLoadFailer] = useState(false);

  useEffect(() => {
    userLoad();
  }, []);

  const userLoad = async (page, size) => {
    try{
      const response = await getUsers(page, size);
      setPage(response.data);
      setLoadFailer(false);
    }catch(err){
      setLoadFailer(true);
    }
  }


  const onClickNext = () => {
    const pageNumber = page.number + 1;
    userLoad(pageNumber, 3);
  };
  const onClickPrevious = () => {
    const pageNumber = page.number - 1;
    userLoad(pageNumber, 3);
  };
  
  const { t } = useTranslation();
  const { content: users, last, first } = page;
  let actionDiv = (<>
    {first === false && (<button className='btn btn-sm btn-light' style={{ "marginRight": "4px" }} onClick={onClickPrevious}>{t('Previous')}</button>)}
    {last === false && (<button className='btn btn-sm btn-light' onClick={onClickNext}>{t('Next')}</button>)}
  </>)
  if (pendingApiCall) {

    actionDiv = (<Spinner />)
  }
  return (
    <div className='card'>
      <h3 className='card-header text-center'>Users</h3>
      <div className='list-group-flush'>
        {users.map(user => {
          return (<UserListItem key={user.username} user={user} />)
        })}
      </div>
      <div className='card-footer'>
      {actionDiv}
      {loadFailer && <div className='text-center text-danger'>{t('Load Failer')}</div>}
      </div>
    </div>
  );
}

export default UserList;