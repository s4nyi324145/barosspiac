import { io } from 'socket.io-client'

const socket = io('http://localhost:22014')

export default socket