import React from 'react';
import UserLogin from '../pages/UserLogin';
import UserSignUp from '../pages/UserSignUp';
import LanguageSelector from '../components/LanguageSelector';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { Route, Redirect, Switch, HashRouter as Router } from 'react-router-dom';
import TabBar from '../components/TabBar';
import { useSelector } from 'react-redux';

const App = () => {
    const { isLoggedIn } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn
    }));
    return (
        <>
            <div className=''>
                <Router>
                    <TabBar />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        {!isLoggedIn && <Route path="/login" component={UserLogin} />}
                        <Route path="/signup" component={UserSignUp} />
                        <Route path="/user/:username" component={UserPage} />
                        <Redirect to="/" />
                    </Switch>
                </Router>
                <LanguageSelector />
            </div>
        </>
    );
}
export default App;