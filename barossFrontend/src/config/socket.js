import { io } from 'socket.io-client'

const socket = io('http://192.168.9.115:3000')

export default socket