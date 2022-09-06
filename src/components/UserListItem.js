import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImageWithDefaul from './ProfileImageWithDefaul';

const UserListItem = (props) => {
    const {user} = props;
    const {username, image} = user;
    
    return (
      <Link className='list-group-item list-group-item-action' to={`/user/${user.username}`}>
       <ProfileImageWithDefaul image = {image} username = {username} styles="32" />
        {`    ${user.username}@${user.displayName}`}</Link>
    );
};

export default UserListItem;