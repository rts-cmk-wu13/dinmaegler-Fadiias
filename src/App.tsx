import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Boliger from './pages/Boliger'
import PropertyDetail from './pages/PropertyDetail'
import Maeglere from './pages/Maeglere'
import AgentDetail from './pages/AgentDetail'
import MineFavoritter from './pages/MineFavoritter'
import Kontakt from './pages/kontakt'
import Login from './pages/login'
import Opret from './pages/opret'
import NotFound from './pages/NotFound'
import './App.css'

const AppContent: React.FC = () => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boliger" element={<Boliger />} />
          <Route path="/bolig/:id" element={<PropertyDetail />} />
          <Route path="/medarbejdere" element={<Maeglere />} />
          <Route path="/maeglere" element={<Maeglere />} />
          <Route path="/maegler/:id" element={<AgentDetail />} />
          <Route path="/favoritter" element={<MineFavoritter />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Opret />} />
          <Route path="/opret" element={<Opret />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router 
        future={{ 
          v7_startTransition: true,
          v7_relativeSplatPath: true 
        }}
      >
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
