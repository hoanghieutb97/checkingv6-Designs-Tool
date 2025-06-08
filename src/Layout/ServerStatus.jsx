import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import CheckTrello from "./CheckTrello";
const socket = io('192.168.1.240:3010'); // Kết nối tới server Node.js
const socket_tool1 = io('192.168.1.90:4444'); // Kết nối tới server Node.js

function ServerStatus() {
    const [status, setStatus] = useState('Connecting to server...');
    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');

    const [status_tool1, setStatus_tool1] = useState('Connecting to server...');
    const [message_tool1, setMessage_tool1] = useState('');
    const [receivedMessage_tool1, setReceivedMessage_tool1] = useState('');

    const [time, setTime] = useState({ minutes: 0, seconds: 0 });
    useEffect(() => {
        // Hàm cập nhật thời gian mỗi giây
        const interval = setInterval(() => {
            const now = Date.now();
            const totalSeconds = Math.floor((now - receivedMessage_tool1.activeTime) / 1000);

            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            setTime({ minutes, seconds });
        }, 1000);

        // Hủy interval khi component bị unmount
        return () => clearInterval(interval);
    }, [receivedMessage_tool1]);

    useEffect(() => {
        // Nhận tin nhắn chào mừng từ server
        socket.on('welcome', (msg) => {
            console.log("hehehehehe---------------hehehe", msg);

            setReceivedMessage(msg);
            setStatus('Connected to server');
        });

        // Lắng nghe sự kiện `disconnect`
        socket.on('disconnect', () => {
            setStatus('Disconnected from server');
        });

        // Lắng nghe sự kiện `connect_error`
        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            setStatus('Connection error');
        });

        // Lắng nghe sự kiện `connect_failed`
        socket.on('connect_failed', () => {
            setStatus('Connection failed');
        });

        // Lắng nghe sự kiện `reconnect_attempt`
        socket.on('reconnect_attempt', () => {
            setStatus('Attempting to reconnect...');
        });

        // Lắng nghe sự kiện `reconnect`
        socket.on('reconnect', () => {
            setStatus('Reconnected to server');
        });

        // Cleanup khi component unmount
        return () => {
            socket.off('welcome');
            socket.off('disconnect');
            socket.off('connect_error');
            socket.off('connect_failed');
            socket.off('reconnect_attempt');
            socket.off('reconnect');
        };
    }, []);
    // tool 1
    useEffect(() => {
        // Nhận tin nhắn chào mừng từ server
        socket_tool1.on('welcome', (msg) => {
            setReceivedMessage_tool1(msg);
            console.log("welcome-------", msg);

            setStatus_tool1('Connected to server');
        });


        // Lắng nghe sự kiện `disconnect`
        socket_tool1.on('disconnect', () => {
            setStatus_tool1('Disconnected from server');
        });

        // Lắng nghe sự kiện `connect_error`
        socket_tool1.on('connect_error', (error) => {
            console.error('Connection error:', error);
            setStatus_tool1('Connection error');
        });

        // Lắng nghe sự kiện `connect_failed`
        socket_tool1.on('connect_failed', () => {
            setStatus_tool1('Connection failed');
        });

        // Lắng nghe sự kiện `reconnect_attempt`
        socket_tool1.on('reconnect_attempt', () => {
            setStatus_tool1('Attempting to reconnect...');
        });

        // Lắng nghe sự kiện `reconnect`
        socket_tool1.on('reconnect', () => {
            setStatus_tool1('Reconnected to server');
        });

        // Cleanup khi component unmount
        return () => {
            socket_tool1.off('welcome');
            socket_tool1.off('disconnect');
            socket_tool1.off('connect_error');
            socket_tool1.off('connect_failed');
            socket_tool1.off('reconnect_attempt');
            socket_tool1.off('reconnect');
        };
    }, []);

    const sendMessage = () => {
        // Gửi tin nhắn đến server
        socket.emit('message', message);
        setMessage('');
    };
    const sendMessage_tool1 = () => {
        // Gửi tin nhắn đến server
        socket_tool1.emit('message', message_tool1);
        setMessage_tool1('');
    };
    // console.log(receivedMessage_tool1);


    return (
        <div className="App">

            <div className="row">
                <div className="col-6">
                    <h3>server</h3>
                    <div className={(status !== "Connected to server") ? 'sttsvfalse' : 'sttsvtrue'}> {status}</div>
                    <div className="row ">
                        <div className="col-12 sdvsdv">
                            <span className='vsdv'>Số card: </span>  <span className='vsdvvbnn'>{receivedMessage}</span>
                        </div>
                    </div>

                </div>
                <div className="col-6">
                    <h3>client 1</h3>
                    <div className={(status_tool1 !== "Connected to server") ? 'sttsvfalse' : 'sttsvtrue'}> {status_tool1}</div>
                    <div className="row">

                        <div className="col-12">

                            <span className='vsdv'>Trạng thái: </span><span className='vsdsv'>{receivedMessage_tool1.state}</span>
                        </div>
                        <div className="col-12">

                            <span className='vsdv'>Thời gian:</span><span className='vsdsv'> {time.minutes} phút {time.seconds} '</span>
                        </div>
                    </div>
                    {/* <p>Server says: {receivedMessage_tool1}</p> */}

                </div>
            </div>
            <div className="row">
                <div className="col-11 vsdaaf">
                    <span className='vsdv'>File: </span><span className='vsdsv'>{receivedMessage_tool1.fileName}</span>

                </div>
            </div>
          

            <div className="row">
                <div className="col-12">
                    <CheckTrello />
                </div>
            </div>
        </div>
    );
}

export default ServerStatus;
