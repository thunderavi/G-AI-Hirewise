// src/components/ReDocComponent.jsx

import React from 'react';
import { ReDoc } from 'redoc';

const ReDocComponent = () => {
  return (
    <ReDoc
      specUrl="http://127.0.0.1:8000/swagger.json"
      options={{
        title: 'Your Project API',
        scrollYOffset: '100',
      }}
    />
  );
};

export default ReDocComponent;
