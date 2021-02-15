import React from 'react';
import {Link, Route} from 'react-router-dom';
import Category from './Category';
import CategoryList from './CategoryList';
import Thread from './Thread';
// import './forum.css';
const Forum = () => {
  return (
    <div className=''>
      <div className='d-flex my-1'>
        <h1 className='col'>Forum</h1>
        <Link to='/forum/ask' className=' btn btn-primary align-self-center'>
          ASK A QUESTION
        </Link>
      </div>
      <Route exact path='/forum/categories' component={CategoryList} />
      <Route exact path='/forum/categories/:categoryId' component={Category} />
      <Route exact path='/forum/threads/:threadId' component={Thread} />
    </div>
  );
};

export default Forum;
