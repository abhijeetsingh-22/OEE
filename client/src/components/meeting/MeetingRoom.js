import React, {useEffect, useRef, useState} from 'react'
import Peer from 'peerjs'
import './style.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {socket} from '../../services/socket'
import {Link, Prompt, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCurrentUser} from '../../store/selectors/user'
var peers = {}
var myID = ''
var activeSreen = ''
function MeetingRoom() {
	const [myPeer, setMyPeer] = useState(
		new Peer(undefined, {
			host: window.location.hostname,
			// port: window.location.port || window.location.protocol === 'https' ? 443 : 80,
			port: 3000,
			path: '/peerjs',
		})
	)
	var myVideoStream = useRef(null)
	const myVideoRef = useRef(null)
	myVideoRef.current = document.createElement('video')
	const {meetingId} = useParams()
	const currentUser = useSelector(getCurrentUser)
	const handleInvite = () => {}
	// const handleScreen = () => {}
	const videoGridRef = useRef(null)
	const msgRef = useRef(null)
	const btnRef = useRef(null)
	const userListRef = useRef(null)
	const listRef = useRef(null)
	const [messages, setMessages] = useState([])
	const [chatMessage, setChatMessage] = useState('')
	const [participants, setParticipants] = useState([])

	useEffect(() => {
		console.log('h', !myVideoStream.current)
		if (videoGridRef.current && !myVideoStream.current) {
			init()
		}
		return () => {
			myVideoStream.current.getTracks().forEach((track) => track.stop())
			myVideoStream.current = null
			myPeer.disconnect()
			// socket.emit('disconnect')
			socket.disconnect()
			setMyPeer(null)
		}
	}, [videoGridRef])
	useEffect(() => {
		socket.connect()
		socket.on('message', (message, userId, username) => {
			// const container = document.querySelector('.main__chat__box')
			console.log(messages, message)
			setMessages((prev) => [...prev, {message, userId, username}])

			// container.scrollTop = container.scrollHeight
		})

		socket.on('participants', (users) => {
			// const container = document.querySelector(".main__users__box");
			// const lists = document.getElementById('users')
			setParticipants(users)
		})
		socket.on('user-disconnected', (userID, username) => {
			peers[userID]?.close()
			systemMessage(username)
		})
		myPeer.on('open', (id) => {
			console.log('joining')
			socket.emit('join-room', meetingId, id, currentUser.user.name)
			myID = id
		})
	}, [])
	const participantsView = participants.map((user) => {
		return (
			<li className='user'>
				<div className='user__avatar'>{user.name[0].toUpperCase()}</div>
				<span className='user__name'>
					{user.name}
					{user.id == myID ? ' (You)' : ''}
				</span>
				<div className='user__media'>
					<FontAwesomeIcon
						icon={`microphone${user.audio === false ? '-slash' : ''}`}
						className='ml-1'
					/>
					<FontAwesomeIcon icon={`video${user.video === false ? '-slash' : ''}`} className='ms-2' />
				</div>
			</li>
		)
	})
	const messageView = messages.map((message) => {
		return (
			// <li className='message-right'>hello</li>
			<li className={message.userId === myID ? 'message-right' : 'message-left'}>
				{message.userId !== myID ? (
					<div className='message__avatar'> {message.username[0].toUpperCase()}</div>
				) : (
					''
				)}

				<div className='message__content'>
					{message.userId !== myID ? <span> {message.username}</span> : ''}
					<div className='message__text'>
						<span>{message.message}</span>
					</div>
				</div>
			</li>
		)
	})
	// console.log(messages, messageView)
	// console.log(socket.connected)
	// socket.emit('join-room', meetingId, '2', currentUser.user.name)
	// socket.emit('answer', {type: 'hello'})

	const init = () => {
		navigator.mediaDevices
			.getUserMedia({
				video: true,

				audio: true,
			})
			.then((stream) => {
				// console.log('b', myVideo.srcObject, myVideoStream)
				addVideoStream(myVideoRef.current, stream)

				myVideoStream.current = stream
				// console.log('a', myVideo.srcObject, myVideoStream)
				// console.log('insidi')

				myPeer.on('call', (call) => {
					console.log('call received')
					call.answer(stream)
					const video = document.createElement('video')

					call.on('stream', (userVideoStream) => {
						addVideoStream(video, userVideoStream)
					})
				})

				socket.on('user-connected', (userID, username) => {
					setTimeout(() => {
						connectNewUser(userID, stream)
					}, 1000)
					systemMessage(username, true)
				})

				socket.emit('participants')
			})
	}

	const addVideoStream = (video, stream) => {
		video.srcObject = stream
		video.addEventListener('loadedmetadata', () => {
			video.play()
		})
		video.className = 'col-3'
		videoGridRef.current.append(video)
	}
	const connectNewUser = (userID, stream) => {
		console.log('calling', userID)
		const call = myPeer.call(userID, stream)
		const video = document.createElement('video')
		console.log(call)
		call.on('stream', (userVideoStream) => {
			console.log('onstream')
			addVideoStream(video, userVideoStream)
		})

		call.on('close', () => {
			video.remove()
		})

		peers[userID] = call
	}
	const sendMessage = (e) => {
		e.preventDefault()
		console.log(chatMessage)
		setChatMessage('')
		if (chatMessage !== '') socket.emit('message', chatMessage)

		msgRef.current.focus()
	}
	// msg.addEventListener("keypress", (e) => {
	// 	if (e.key == "Enter" && !e.shiftKey) {
	// 		e.preventDefault();
	// 		sendMessage(msg.value);
	// 	}
	// });

	// btn.addEventListener("click", (e) => {
	//     e.preventDefault();
	//     sendMessage(msg.value);
	// });

	const systemMessage = (username, join = false) => {
		// const addVideoStream = (video, stream) => {
		// 	video.srcObject = stream
		// 	video.addEventListener('loadedmetadata', () => {
		// 		video.play()
		// 	})
		// 	videoGridRef.current.append(video)
		// }

		const date = new Date()
		var hours = date.getHours()
		var minutes = date.getMinutes()
		const format = hours >= 12 ? 'PM' : 'AM'
		hours %= 12
		hours = hours ? hours : 12
		minutes = minutes < 10 ? '0' + minutes : minutes

		const container = document.querySelector('.main__chat__box')
		const list = document.createElement('li')
		list.className = 'system-message'
		list.innerHTML = `<span>${hours}:${minutes}${format}</span><span>${username} has ${
			join ? 'joined' : 'left'
		} the meeting</span>`

		// listRef.current.append(list)
		// container.scrollTop = container.scrollHeight
	}
	const handleMicrophone = () => {
		const enabled = myVideoStream.current.getAudioTracks()[0].enabled
		const node = document.querySelector('.mute-btn')

		if (enabled) {
			socket.emit('mute-mic')
			myVideoStream.current.getAudioTracks()[0].enabled = false

			node.children[0].classList.remove('fa-microphone')
			node.children[0].classList.add('fa-microphone-slash')
			node.children[1].innerHTML = 'Unmute'
		} else {
			socket.emit('unmute-mic')
			myVideoStream.current.getAudioTracks()[0].enabled = true

			node.children[0].classList.remove('fa-microphone-slash')
			node.children[0].classList.add('fa-microphone')
			node.children[1].innerHTML = 'Mute'
		}
	}
	const handleVideo = () => {
		const enabled = myVideoStream.current.getVideoTracks()[0].enabled
		const node = document.querySelector('.video-btn')

		if (enabled) {
			socket.emit('stop-video')
			myVideoStream.current.getVideoTracks()[0].enabled = false

			node.children[0].classList.remove('fa-video')
			node.children[0].classList.add('fa-video-slash')
			node.children[1].innerHTML = 'Play Video'
		} else {
			socket.emit('play-video')
			myVideoStream.current.getVideoTracks()[0].enabled = true

			node.children[0].classList.remove('fa-video-slash')
			node.children[0].classList.add('fa-video')
			node.children[1].innerHTML = 'Stop Video'
		}
	}
	const handleLeave = () => {
		console.log('closing')
		window.close()
	}
	const isHidden = (screen) => screen.classList.contains('screen-hide')

	const handleActive = (buttonClass) => {
		const button = document.querySelector(`.${buttonClass}`)
		const active = button.classList.contains('active-btn')

		if (active) button.classList.remove('active-btn')
		else button.classList.add('active-btn')
	}
	const handleScreen = (screen) => {
		const left_container = document.querySelector('.main__left')
		const right_container = document.querySelector('.main__right')
		const chatScreen = document.getElementById('chat-screen')
		const usersScreen = document.getElementById('users-screen')

		if (screen.id === 'chats') {
			handleActive('chat-btn')
			if (activeSreen === '') {
				chatScreen.classList.remove('screen-hide')
				activeSreen = 'chats'
			} else if (activeSreen === 'chats') {
				chatScreen.classList.add('screen-hide')
				activeSreen = ''
			} else {
				chatScreen.classList.remove('screen-hide')
				usersScreen.classList.add('screen-hide')
				activeSreen = 'chats'
				handleActive('users-btn')
			}
		} else {
			handleActive('users-btn')
			if (activeSreen === '') {
				usersScreen.classList.remove('screen-hide')
				activeSreen = 'users'
			} else if (activeSreen === 'users') {
				usersScreen.classList.add('screen-hide')
				activeSreen = ''
			} else {
				usersScreen.classList.remove('screen-hide')
				chatScreen.classList.add('screen-hide')
				activeSreen = 'users'
				handleActive('chat-btn')
			}
		}

		if (isHidden(right_container)) {
			right_container.classList.remove('screen-hide')
			left_container.classList.remove('screen-full')
		} else if (activeSreen === '') {
			right_container.classList.add('screen-hide')
			left_container.classList.add('screen-full')
		}
	}
	return (
		<div>
			<main>
				<div className='main__left screen-full'>
					<div className='main__videos'>
						<div id='video-grid' className='d-flex flex-wrap' ref={videoGridRef}></div>
						<div id='share-screen'></div>
					</div>
					<div className='main__controls'>
						<div className='main__controls__block'>
							<div className='main__controls__button mute-btn' onClick={handleMicrophone}>
								{/* <i className='fas fa-microphone'></i> */}
								<FontAwesomeIcon icon='microphone' />
								<span>Mute</span>
							</div>
							<div className='main__controls__button video-btn' onClick={handleVideo}>
								{/* <i className='fas fa-video'></i> */}
								<FontAwesomeIcon icon='video' />
								<span>Stop Video</span>
							</div>
						</div>
						<div className='main__controls__block mid-block'>
							<div className='main__controls__button' onClick={handleInvite}>
								{/* <i className='fad fa-user-plus'></i> */}
								<FontAwesomeIcon icon='user-plus' />
								<span>Invite</span>
							</div>
							<div
								className='main__controls__button users-btn'
								onClick={() => handleScreen({id: 'users'})}
							>
								{/* <i className='fas fa-user-friends'></i> */}
								<FontAwesomeIcon icon='user-friends' />
								<span>Participants</span>
							</div>
							<div
								className='main__controls__button chat-btn'
								id='chats'
								onClick={() => handleScreen({id: 'chats'})}
							>
								{/* <i className='fas fa-comment-alt'></i> */}
								<FontAwesomeIcon icon='comment-alt' />
								<span>Chat</span>
							</div>
						</div>
						<div className='main__controls__block'>
							<Link to='/'>
								<div className='main__controls__button leave-btn'>
									<span>Leave Meeting</span>
								</div>
							</Link>
						</div>
					</div>
				</div>

				<div className='main__right screen-hide'>
					<div className='main__right__render screen-hide' id='chat-screen'>
						<div className='main__header'>
							<h4>Chat Box</h4>
						</div>
						<div className='main__chat__box'>
							<ul id='messages' ref={listRef}>
								hello
								{messageView}
							</ul>
						</div>
						<form className='main__message__container'>
							<textarea
								id='chat-message'
								cols={20}
								rows={1}
								placeholder='Type a message here'
								ref={msgRef}
								value={chatMessage}
								onKeyPress={(e) => {
									// console.log('key')
									if (e.key == 'Enter' && !e.shiftKey) {
										sendMessage(e)
									}
								}}
								onChange={(e) => {
									// console.log(JSON.stringify(chatMessage))
									setChatMessage(e.target.value)
								}}
							></textarea>
							<button
								className='main__message__send'
								type='submit'
								onClick={sendMessage}
								id='send-btn'
								ref={btnRef}
							>
								{/* <i className='fas fa-paper-plane'></i> */}
								<FontAwesomeIcon icon='paper-plane' className='text-white' />
							</button>
						</form>
					</div>
					<div className='main__right__render screen-hide' id='users-screen'>
						<div className='main__header'>
							<h4>Participants</h4>
						</div>
						<div className='main__users__box'>
							<ul id='users' ref={userListRef}>
								{participantsView}
							</ul>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default MeetingRoom
