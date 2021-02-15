import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {apiCall} from '../services/api';
import {capitalize} from '../utils';

const Category = () => {
  const {categoryId} = useParams();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  //   var response = {};
  useEffect(() => {
    setLoading(true);
    apiCall('get', `/api/forum/categories/${categoryId}/threads`).then((res) => {
      setResponse(res);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <h2>Threads</h2>
      {loading ? (
        <div className='d-flex align-items-center flex-row'>
          <div class='spinner-border text-primary mx-auto' role='status'>
            <span class='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        response.map((thread) => {
          return (
            <div className='card'>
              {/* <img src="..." className="card-img-top" alt="..."> */}
              <div className='card-body'>
                <h5 className='card-title mb-0'>{thread.title}</h5>
                <div className='text-muted mb-2'>By {capitalize(thread.user.name)}</div>
                <p className='card-text'>{thread.body.substring(0, 100)}...</p>
              </div>
              {/* <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>Cras justo odio</li>
                  <li className='list-group-item'>Dapibus ac facilisis in</li>
                  <li className='list-group-item'>Vestibulum at eros</li>
                </ul> */}
              <div className='card-body'>
                <Link to={`/forum/threads/${thread._id}`} className='card-link'>
                  View
                </Link>
                {/* <a href='#' className='card-link'>
                    Another link
                  </a> */}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
export default Category;
