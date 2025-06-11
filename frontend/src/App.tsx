import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import NoteEdit from "./components/NoteEdit";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex flex-col">
        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex-1 p-6 bg-gray-100 min-h-screen">
            <Routes>
              <Route path="/" element={<NoteList />} />
              <Route
                path="/new"
                element={
                  <NoteForm
                    onNoteCreated={() => (window.location.href = "/")}
                  />
                }
              />
              <Route path="/search" element={<NoteList />} />
              <Route path="/edit/:id" element={<NoteEdit />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
