import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {Switch, Route} from 'react-router-dom';
import Forum from './Forum';
import ProtectedRoute from '../hocs/ProtectedRoute';
import AddQuestionForm from './AddQuestionForm';
const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className='container-fluid'>
        <div className='row'>
          <Sidebar />

          <div className='col-md-9 col-lg-10 ms-sm-auto px-md-4'>
            <Switch>
              <Route exact path='/' render={() => <h1 className='col'>Dashboard</h1>} />
              <Route exact path='/forum/ask' component={AddQuestionForm} />
              <Route path='/forum' component={Forum} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
