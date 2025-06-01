import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isScrolled?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  href, 
  children, 
  isScrolled = false, 
  isMobile = false,
  onClick 
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        font-medium transition-colors duration-300
        ${isMobile 
          ? 'text-brown-700 hover:text-brown-800' 
          : isScrolled 
            ? 'text-neutral-700 hover:text-brown-700' 
            : 'text-white hover:text-white/80'
        }
      `}
    >
      {children}
    </a>
  );
};

export default NavLink;