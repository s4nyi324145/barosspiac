import { io } from 'socket.io-client'

// Create a Socket.IO client instance and connect to the server
const socket = io('http://localhost:22014')

export default socket