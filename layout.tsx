import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <html>
      <body style={{ margin: 0 }}>
        <Sidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />
        <main
          style={{
            marginLeft: collapsed ? 60 : 200,
            padding: 20,
            transition: 'margin-left 0.3s',
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}