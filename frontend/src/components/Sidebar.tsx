import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const sidebarVariants = {
    open: { x: 0, transition: { duration: 0.3 } },
    closed: { x: '-100%', transition: { duration: 0.3 } },
  };

  return (
    <>
      {/* Przycisk hamburgera dla urządzeń mobilnych */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <motion.div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col p-4 z-40 md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
      >
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span>Obsidian Clone</span>
        </h2>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`
            }
            onClick={toggleSidebar}
          >
            {(FaHome as any)()}
            Wszystkie notatki
          </NavLink>
          <NavLink
            to="/new"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`
            }
            onClick={toggleSidebar}
          >
            {(FaPlus as any)()}
            Nowa notatka
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`
            }
            onClick={toggleSidebar}
          >
            {(FaSearch as any)()}
            Wyszukaj
          </NavLink>
        </nav>
      </motion.div>

      {/* Overlay dla urządzeń mobilnych */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;