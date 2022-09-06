import React, { Component, useEffect, useState } from 'react';
import axios from "axios";

export const useApiProgress = (apiPath) => {
    const [pendingApiCall,setPendingApiCall] = useState();
    useEffect(() => {
        let requestInterceptor,responseInterseptor;
        const updateApiCallFor = (url,inProgress) =>{
            if(url.startsWith(apiPath)){
                setPendingApiCall(inProgress);
            }
        };
       const registerInterSepters = () => {
            requestInterceptor =  axios.interceptors.request.use(request => {
                updateApiCallFor(request.url,true);
                  return request;
              });
              responseInterseptor =axios.interceptors.response.use((response)=>{
                  updateApiCallFor(response.config.url,false);
                  return response;
              },(error) =>{
                  updateApiCallFor(error.config.url,false);
                  throw error;
              });
        };
        const unRegisterInterSeptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterseptor);
        };
        registerInterSepters();
        return function unmount(){
            unRegisterInterSeptors();
        }
    },[apiPath]);

    return pendingApiCall;
}

function getDisplayName(WrappedComponent){
    return WrappedComponent.displayName || WrappedComponent.name  || "Component";
}
export function withApiProgress(WrappedComponent, apiPath) {
    // ...and returns another component...
    return class extends Component {
        static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`;
        state = {
            pendingApiCall:false
        }
  
      componentDidMount(){
     this.registerInterSepter();
    }
    componentWillUnmount(){
       this.unRegisterInterSeptor();
    }
   

   
  
      render() {
        const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall;
        return <WrappedComponent {...this.props} pendingApiCall = {pendingApiCall} />;
      }
    };
  }
