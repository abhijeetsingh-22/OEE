import React from 'react'
import {Link, NavLink} from 'react-router-dom'

function Sidebar() {
	return (
		<nav id='sidebarMenu' className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'>
			<div className='position-sticky pt-3'>
				<ul className='nav flex-column'>
					<li className='nav-item'>
						<NavLink exact to='/' className='nav-link' aria-current='page'>
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
								className='feather feather-home'
							>
								<path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
								<polyline points='9 22 9 12 15 12 15 22'></polyline>
							</svg>
							Dashboard
						</NavLink>
					</li>
					<li className='nav-item '>
						<div className='d-flex align-items-center justify-content-between me-3 '>
							<NavLink to='/forum' className='nav-link pb-0'>
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
									className='feather feather-file'
								>
									<path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'></path>
									<polyline points='13 2 13 9 20 9'></polyline>
								</svg>
								Forum
							</NavLink>
							<a
								data-toggle='collapse'
								href='#submenu1'
								data-bs-toggle='collapse'
								className='link-secondary'
							>
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
						</div>
						<NavLink to='/forum/tags' className='nav-link collapse col ms-5 pt-1' id='submenu1'>
							Tags
						</NavLink>
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
								className='feather feather-shopping-cart'
							>
								<circle cx='9' cy='21' r='1'></circle>
								<circle cx='20' cy='21' r='1'></circle>
								<path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
							</svg>
							E-Resources
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
								className='feather feather-users'
							>
								<path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
								<circle cx='9' cy='7' r='4'></circle>
								<path d='M23 21v-2a4 4 0 0 0-3-3.87'></path>
								<path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
							</svg>
							Profile
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
								className='feather feather-bar-chart-2'
							>
								<line x1='18' y1='20' x2='18' y2='10'></line>
								<line x1='12' y1='20' x2='12' y2='4'></line>
								<line x1='6' y1='20' x2='6' y2='14'></line>
							</svg>
							Results
						</a>
					</li>
					<li className='nav-item '>
						<div className='d-flex align-items-center justify-content-between me-3 '>
							<NavLink to='/evaluations' className='nav-link pb-0'>
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
									className='feather feather-file'
								>
									<path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'></path>
									<polyline points='13 2 13 9 20 9'></polyline>
								</svg>
								Evaluation{' '}
							</NavLink>
						</div>
					</li>
					<li className='nav-item '>
						<div className='d-flex align-items-center justify-content-between me-3 '>
							<NavLink to='/codeplayground' className='nav-link pb-0'>
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
									className='feather feather-file'
								>
									<path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'></path>
									<polyline points='13 2 13 9 20 9'></polyline>
								</svg>
								Code Playground
							</NavLink>
						</div>
					</li>
				</ul>

				<h6 className='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'>
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
				</h6>
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
