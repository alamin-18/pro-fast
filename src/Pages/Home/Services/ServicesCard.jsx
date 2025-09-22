// src/components/ServiceCard.jsx
import React from "react";

const ServiceCard = ({ icon, title, desc }) => {
  return (
    <div
      className="rounded-2xl shadow-md p-6 text-center bg-white 
                 transition-all duration-300 hover:bg-lime-200 hover:shadow-lg"
    >
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
};

export default ServiceCard;
