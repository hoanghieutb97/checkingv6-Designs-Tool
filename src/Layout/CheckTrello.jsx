import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

function PasswordProtectedButton() {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [showSecretButton, setShowSecretButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Kiểm tra giá trị mkserver trong localStorage khi component được tải
    const storedPassword = localStorage.getItem('mkserver');
    if (storedPassword === '123456') {
      setShowSecretButton(true);
    } else {
      setShowPasswordInput(true);
    }
  }, []);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === "123456") {
      localStorage.setItem('mkserver', '123456'); // Lưu mật khẩu vào localStorage
      setShowSecretButton(true);
      setShowPasswordInput(false);
      setErrorMessage('');
    } else {
      setErrorMessage("Mật khẩu không chính xác!");
    }
  };

  // Định nghĩa hàm handleInitialButtonClick
  const handleInitialButtonClick = () => {
    setShowPasswordInput(true);
    setShowSecretButton(false);
    setErrorMessage('');
  };

  const HandleResetServerClient = () => {
    axios.get('http://192.168.1.240:3012/resetServer')
      .then(response => {

      })
      .catch(error => {

      });
  };



  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [imageSrc, setImageSrc] = useState('');
  useEffect(() => {
    // Kết nối với server Node.js qua WebSocket
    const socket = io('https://192.168.1.90:3012'); // Thay thế 'PC1_IP_ADDRESS' bằng địa chỉ IP của PC1

    // Nhận dữ liệu hình ảnh từ server
    socket.on('screenshot', (data) => {
      setImageSrc('data:image/png;base64,' + data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>


      {!showSecretButton && (
        <button onClick={handleInitialButtonClick} className='d-none'></button>
      )}
      {showPasswordInput && (
        <div className='gggsed'>
          <input
            type="password"
            value={password}
            className='sdvsdvsdv'
            onChange={handlePasswordChange}
            placeholder="Nhập mật khẩu"
          />
          <button onClick={handlePasswordSubmit} className='ssdvsdvsdv'>Đăng nhập</button>
        </div>
      )}
      {showSecretButton && (
        <div className='gggsed'>
          <div className="row">
            <div className="col-12">
              <div>

                <img src={imageSrc} alt="Màn hình chia sẻ" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="col-12 vdfvfd">
              <button onClick={HandleResetServerClient} className='ssdvsdvsdv' >Khởi động lại server</button>
            </div>
          </div>



        </div>
      )}
      {errorMessage && (
        <div style={{ color: 'red' }}>{errorMessage}</div>
      )}
    </div>
  );
}

export default PasswordProtectedButton;
