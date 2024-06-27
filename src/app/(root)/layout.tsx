import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex'>
    sidebar
    <div className="flex flex-col">
    header
    {children}
    </div>
  </div>
  );
}

export default Layout;
