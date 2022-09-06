import React from 'react';
import defaultPicture from '../assets/profile.png';

const ProfileImageWithDefaul = (props) => {
    const { image, username, styles} = props;

    let imageSource = defaultPicture;
    if (image) {
        imageSource = image;
    }
    return (
        <>
            <img className='rounded-circle shadow' src={imageSource} alt={`${username} profile`} width={styles}/>
        </>
    );
};

export default ProfileImageWithDefaul;