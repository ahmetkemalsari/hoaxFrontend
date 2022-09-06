import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileImageWithDefaul from './ProfileImageWithDefaul';
import { useTranslation } from 'react-i18next';
import Input from './Input';


const ProfileCard = (props) => {

  const { username: loggedInUsername } = useSelector(store => ({
    username: store.username
  }));
  const { username, displayName, image } = props.user;
  const routeParams = useParams();
  const pathUsername = routeParams.username;
  const [inEditMode, setInEditMode] = useState(false);
  const { t } = useTranslation();


  let editForm = (<>

  </>)
  if (pathUsername === loggedInUsername && !inEditMode) {
    editForm = (
      <>
        <button className='btn btn-success d-inline-flex' onClick={() => setInEditMode(true)}>
          <span className="material-icons text-align" style={{ fontSize: "20px" }}>
            edit
          </span>{t('Edit')}</button>
      </>
    )
  }
  if (inEditMode) {
    editForm = (
      <form className="">
        <div>
            <label>{t('Change Display Name')}</label>
            <Input name="displayName" />

          <div className="my-2">
            <button type="submit" class="btn btn-primary mx-1 ">
              <span className="material-icons align-middle mx-2" style={{ fontSize: "17px" }}>
                save
              </span>{t('Save')}</button>
            <button type="submit" class="btn btn-primary mx-1" onClick={() => setInEditMode(false)}>
              <span className="material-icons align-middle mx-1" style={{ fontSize: "17px" }}>
                cancel
              </span>{t('Cancel')}</button>
          </div>
        </div>
      </form>
    )
  }
  return (
    <div className='card text-center'>
      <div className='card-header'>
        <ProfileImageWithDefaul image={image} username={username} styles="200px" />
      </div>
      <div className='card-body'>
      <div className='my-1'>
       {displayName}@{username}
       </div>
          {editForm}
      </div>
    </div>
  );


};

export default ProfileCard;
