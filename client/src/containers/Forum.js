import React from 'react';
import {Route} from 'react-router-dom';
import Category from './Category';
import CategoryList from './CategoryList';
import Thread from './Thread';
import './forum.css';
const Forum = () => {
  return (
    <div className='col'>
      <h1 className='col'>Forum</h1>
      <Route exact path='/forum/categories' component={CategoryList} />
      <Route exact path='/forum/categories/:categoryId' component={Category} />
      <Route exact path='/forum/threads/:threadId' component={Thread} />
    </div>
  );
};

export default Forum;
