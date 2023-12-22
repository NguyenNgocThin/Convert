import React, { useState } from 'react';
import axios from 'axios';

const GeocodingForm = () => {
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyArVizBbMBDY027MKq7kGrwuAPZB-am0oE`
      );

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        setLatitude(location.lat);
        setLongitude(location.lng);
      } else {
        console.log('Không tìm thấy tọa độ.');
      }
    } catch (error) {
      console.error('Lỗi khi chuyển đổi địa chỉ:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Nhập địa chỉ"
          value={address}
          onChange={handleAddressChange}
        />
        <button type="submit">Chuyển đổi</button>
      </form>
      {latitude && longitude && (
        <div>
          <p>Kinh độ: {latitude}</p>
          <p>Vĩ độ: {longitude}</p>
        </div>
      )}
    </div>
  );
};

export default GeocodingForm;