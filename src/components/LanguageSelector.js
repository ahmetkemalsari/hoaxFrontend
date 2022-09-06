import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../api/ApiCalls';

const LanguageSelector = (props) => {
    const { i18n } = useTranslation();

   const onChangeLanguage = language => {
        i18n.changeLanguage(language);
        changeLanguage(language);
    };
    return (
        <div className='container'>
            <img
                src="https://flagcdn.com/32x24/tr.png"
                width="32"
                height="24"
                alt="Turkey"
                style={{ cursor: 'pointer' }}
                onClick={() => onChangeLanguage('tr')} />
            <img
                src="https://flagcdn.com/32x24/us.png"
                width="32"
                height="24"
                alt="United States"
                style={{ cursor: 'pointer', marginLeft: '5px' }}
                onClick={() => onChangeLanguage('en')} />
        </div>
    );
};

export default LanguageSelector;