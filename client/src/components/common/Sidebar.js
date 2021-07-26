import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React from 'react'
import {Link, NavLink} from 'react-router-dom'

function Sidebar() {
	return (
		<nav id='sidebarMenu' className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'>
			<div className='position-sticky pt-3'>
				<ul className='nav flex-column'>
					{/* <li className='nav-item'>
						<NavLink exact to='/' className='nav-link' aria-current='page'>
							<FontAwesomeIcon icon='home' className='fs-5 me-1 icon-container' />
							Dashboard
						</NavLink>
					</li> */}
					<li className='nav-item '>
						<div className='d-flex align-items-center justify-content-between me-3 '>
							<NavLink to='/forum' className='nav-link pb-0'>
								{/* <svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
									className='feather feather-file'
								>
									<path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'></path>
									<polyline points='13 2 13 9 20 9'></polyline>
								</svg> */}
								<FontAwesomeIcon icon={['far', 'comment']} className='fs-5 me-1 icon-container' />
								Forum
							</NavLink>
							{/* <a
								data-toggle='collapse'
								href='#submenu1'
								data-bs-toggle='collapse'
								className='link-secondary'
							>
								<FontAwesomeIcon icon='plus-circle' className='fs-5 me-1' />

							
							</a> */}
						</div>
						<NavLink to='/forum/tags' className='nav-link  col ms-4 pt-1' id='submenu1'>
							<FontAwesomeIcon icon='tag' className='fs-6 me-1 ' />
							Tags
						</NavLink>
					</li>
					<li className='nav-item mb-1'>
						<NavLink className='nav-link' to='/drive'>
							<FontAwesomeIcon icon={['far', 'folder']} className='fs-5 me-1 icon-container' />
							E-Resources
						</NavLink>
					</li>

					<li className='nav-item mb-1'>
						<div className='d-flex align-items-center justify-content-between me-3 '>
							<NavLink to='/evaluations' className='nav-link pb-0'>
								<FontAwesomeIcon icon='laptop-code' className='fs-5 me-1 icon-container' />
								Evaluation{' '}
							</NavLink>
						</div>
					</li>
					<li className='nav-item mb-1 '>
						<div className='d-flex align-items-center justify-content-between me-3 '>
							<NavLink to='/quiz' className='nav-link pb-0'>
								<FontAwesomeIcon icon='question' className='fs-5 me-1 icon-container' />
								Quiz{' '}
							</NavLink>
						</div>
					</li>
					<li className='nav-item mb-1 '>
						<div className='d-flex align-items-center justify-content-between me-3 '>
							<NavLink to='/codeplayground' className='nav-link pb-0'>
								<FontAwesomeIcon icon='code' className='fs-5 me-1 icon-container' />
								Code Playground
							</NavLink>
						</div>
					</li>
					<li className='nav-item '>
						<div className='d-flex align-items-center justify-content-between me-3 '>
							<NavLink to='/meetings' className='nav-link pb-0'>
								<FontAwesomeIcon icon='users' className='fs-5 me-1 icon-container' />
								Meetings
							</NavLink>
						</div>
					</li>
				</ul>

				{/* <h6 className='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'>
					<span>List</span>
					<a className='link-secondary' href='#' aria-label='Add a new report'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
							className='feather feather-plus-circle'
						>
							<circle cx='12' cy='12' r='10'></circle>
							<line x1='12' y1='8' x2='12' y2='16'></line>
							<line x1='8' y1='12' x2='16' y2='12'></line>
						</svg>
					</a>
				</h6> */}
				{/* <ul className='nav flex-column mb-2'>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                className='feather feather-file-text'
              >
                <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path>
                <polyline points='14 2 14 8 20 8'></polyline>
                <line x1='16' y1='13' x2='8' y2='13'></line>
                <line x1='16' y1='17' x2='8' y2='17'></line>
                <polyline points='10 9 9 9 8 9'></polyline>
              </svg>
              Reports
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                className='feather feather-file-text'
              >
                <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path>
                <polyline points='14 2 14 8 20 8'></polyline>
                <line x1='16' y1='13' x2='8' y2='13'></line>
                <line x1='16' y1='17' x2='8' y2='17'></line>
                <polyline points='10 9 9 9 8 9'></polyline>
              </svg>
              Reports
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                className='feather feather-file-text'
              >
                <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path>
                <polyline points='14 2 14 8 20 8'></polyline>
                <line x1='16' y1='13' x2='8' y2='13'></line>
                <line x1='16' y1='17' x2='8' y2='17'></line>
                <polyline points='10 9 9 9 8 9'></polyline>
              </svg>
              Reports
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                className='feather feather-file-text'
              >
                <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path>
                <polyline points='14 2 14 8 20 8'></polyline>
                <line x1='16' y1='13' x2='8' y2='13'></line>
                <line x1='16' y1='17' x2='8' y2='17'></line>
                <polyline points='10 9 9 9 8 9'></polyline>
              </svg>
              Reports
            </a>
          </li>
        </ul> */}
			</div>
		</nav>
	)
}

export default Sidebar
