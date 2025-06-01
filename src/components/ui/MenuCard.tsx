import React from 'react';

interface MenuCardProps {
  title: string;
  description: string;
  price?: string;
  dietary?: string[];
}

const MenuCard: React.FC<MenuCardProps> = ({
  title,
  description,
  dietary = [],
  
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      {/*<div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>*/}
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-neutral-800 mb-3">{title}</h3>
        <p className="text-neutral-600 mb-4">{description}</p>
        {dietary.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {dietary.map((item, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-neutral-100 text-neutral-600"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCard;