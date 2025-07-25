import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapse }) => {
  return (
    <div
      style={{
        width: collapsed ? 60 : 200,
        transition: 'width 0.3s',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        paddingTop: '40px',
      }}
    >
      <button
        onClick={toggleCollapse}
        style={{ position: 'absolute', top: 10, left: 10 }}
      >
        {collapsed ? '>' : '<'}
      </button>
      {!collapsed && (
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <Link href="/module3">模块3</Link>
            </li>
            <li>
              <Link href="/module4">模块4</Link>
            </li>
            <li>
              <Link href="/module5">模块5</Link>
            </li>
            <li>
              <Link href="/module6">模块6</Link>
            </li>
            <li>
              <Link href="/module7">模块7</Link>
            </li>
            <li>
              <Link href="/next-module">下一个模块</Link>
            </li>
            <li>
              <Link href="/story">故事</Link>
            </li>
            <li>
              <Link href="/main">主页</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;