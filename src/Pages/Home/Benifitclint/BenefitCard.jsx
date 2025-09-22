import React from 'react';

const BenefitCard = ({ title, description, image }) => {
    return (
        <div className=" w-full bg-white rounded-lg  transition-all">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <img src={image} alt={title} className="w-32 p-2 h-32 object-contain" />
        <div className="divider divider-horizontal hidden sm:flex my-0" />
        <div className='p-4'>
          <h3 className=" text-2xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-base-content/70">{description}</p>
        </div>
      </div>
    </div>
    );
};

export default BenefitCard;