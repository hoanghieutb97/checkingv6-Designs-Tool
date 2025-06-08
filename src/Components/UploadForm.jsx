import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const [StatusDown, setStatusDown] = useState(false);


  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    formData.append('NameFolder', localStorage.NameFolder); // Ví dụ: chuỗi 'additionalValue'
    try {
      setStatusDown(false)

      const response = await axios.post('http://192.168.1.194:3008/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setStatusDown(true)
      console.log('File uploaded:', response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  return (
    <div className={(StatusDown === true) ? 'vsvsd' : "vdv"}>
      <input type="file" onChange={handleFileChange} />
      <Button type="primary" onClick={handleFileUpload}>
        Tải File
      </Button>
      {/* <Button type="primary" onClick={handleFileUpload2} className='svsv'>
        Tải File2
      </Button> */}
      {/* <button onClick={handleFileUpload}>Upload</button> */}

    </div >
  );
};

export default UploadForm;
