import React from 'react';

const ButtonWithProgress = (props) => {
    const {pendingApiCall,onClick,text,disabled  } = props;
    return (
        <>
            <button className="btn btn-primary"  disabled={disabled}  onClick={onClick}>
                        {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}{text}</button>
        </>
    );
};

export default ButtonWithProgress;