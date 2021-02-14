import React, {useEffect, useState} from 'react';
import {apiCall} from '../services/api';
import {Link} from 'react-router-dom';
const CategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  //   var response = {};
  useEffect(() => {
    setLoading(true);
    apiCall('get', '/api/forum/categories').then((res) => {
      setResponse(res);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <h2>Categories</h2>
      {loading
        ? 'Loading.....'
        : response.map((data) => {
            return (
              <div className='card'>
                {/* <div className='card-header'>Featured</div> */}
                <Link to={`/forum/categories/${data._id}`} className='nolinkstyle'>
                  <div className='card-body'>
                    <h5 className='card-title'>{data.title}</h5>
                    {/* <p className='card-text'>
                    With supporting text below as a natural lead-in to additional content.
                  </p> */}
                    {/* <a href='#' className='btn btn-primary'>
                    Go somewhere
                  </a> */}
                  </div>
                </Link>
              </div>
            );
          })}
    </div>
  );
};
export default CategoryList;
