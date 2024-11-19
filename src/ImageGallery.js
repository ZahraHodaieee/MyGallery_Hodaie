import React, { useState, useEffect } from 'react';

const ImageGallery = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // تابع برای دریافت تصویر جدید
  const fetchImage = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://picsum.photos/600/400'); // دریافت یک تصویر تصادفی
      if (response.ok) {
        setImage(response.url);
      } else {
        console.error('دریافت تصویر ناموفق بود');
      }
    } catch (error) {
      console.error('خطا در دریافت تصویر:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage(); // بارگذاری تصویر اولیه در زمان بارگذاری کامپوننت
  }, []);

  const handleNext = () => {
    fetchImage(); // دریافت تصویر جدید با کلیک روی دکمه "بعدی"
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>باز کردن گالری</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {loading ? (
              <p>در حال بارگذاری...</p>
            ) : (
              <img src={image} alt="Random" style={{ width: '100%', height: 'auto' }} />
            )}
            <button onClick={handleNext}>تصویر بعدی</button>
            <button onClick={() => setShowModal(false)}>بستن</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;