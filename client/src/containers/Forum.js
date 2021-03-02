import React from 'react';
import {Link, Route} from 'react-router-dom';
import Category from './Category';
import CategoryList from './CategoryList';
import TagList from './TagList';
import Thread from './Thread';
import ThreadList from './ThreadList';
// import './forum.css';
const Forum = () => {
  return (
    <div className='mt-3'>
      <Route exact path='/forum' component={ThreadList} />
      <Route exact path='/forum/tags' component={TagList} />
      <Route exact path='/forum/questions/tagged/:tag' component={ThreadList} />
      {/* <Route exact path='/forum/categories/:categoryId' component={Category} /> */}
      <Route exact path='/forum/threads/:threadId' component={Thread} />
    </div>
  );
};

export default Forum;
