import React, {useState, useEffect} from 'react';
import Moment from 'react-moment';
import {Link, useRouteMatch} from 'react-router-dom';
import {apiCall} from '../../services/api';
function EvaluationsList() {
  const {path, url} = useRouteMatch();
  console.log(path, url);
  const [evaluations, setEvaluations] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await apiCall('get', '/api/evaluation');
      setEvaluations(res);
    };
    fetch();
    return () => {};
  }, []);

  const evaluationView = evaluations.map((evaluation) => {
    return (
      <div className='card'>
        {/* <img src="..." className="card-img-top" alt="..."> */}
        <div className='card-body'>
          <Link to={`${url}/${evaluation.id}`} className='text-decoration-none'>
            <h5 className='card-title mb-0'>{evaluation.title}</h5>
          </Link>
          {/* <div className='text-muted mb-2'>By {capitalize(thread.user.name)}</div> */}
          <p className='card-text'>{evaluation.body.substring(0, 100)}</p>
          <div className='d-flex '>
            <span className='badge bg-secondary me-2 '>
              Starts :-
              <Moment format='DD MMM YYYY hh:mm:A'>{evaluation.startTime}</Moment>
            </span>
            {evaluation.endTime && (
              <span className='badge bg-secondary me-2 '>
                Ends :-
                <Moment format='DD MMM YYYY hh:mm:A'>{evaluation.endTime}</Moment>
              </span>
            )}
            {/* {thread.tags.map((tag) => {
              return (
                <Link to={`/forum/questions/tagged/${tag.title}`}>
                  <span className='badge bg-secondary me-2'>{tag.title}</span>
                </Link>
              );
            })} */}
          </div>
        </div>
      </div>
    );
  });
  return <div className=''>{evaluationView}</div>;
}

export default EvaluationsList;
