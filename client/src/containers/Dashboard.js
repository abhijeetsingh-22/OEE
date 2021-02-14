import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {Switch, Route} from 'react-router-dom';
import Forum from './Forum';
const Dashboard = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className='container-fluid'>
        <div className='row'>
          <Sidebar />

          <Switch>
            <Route exact path='/' render={() => <h1 className='col'>Dashboard</h1>} />
            <Route path='/forum' component={Forum} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
