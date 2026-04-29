import { io } from 'socket.io-client'

// Create a Socket.IO client instance and connect to the server
const socket = io('https://nodejs214.dszcbaross.edu.hu')

export default socket