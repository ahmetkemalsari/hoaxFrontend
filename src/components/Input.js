import React from "react";

const Input = props => {
    const{name,error,label,onChange,type} = props;
    const className = error ? 'form-control is-invalid' : 'form-control';
    return (<>
        <div className="form-group">
            <label className="">{label}</label>
            <input className={className} name={name} onChange={onChange} type={type}></input>
            <div className="invalid-feedback">
                {error}
            </div> 
        </div>
    </>)
}

export default Input;