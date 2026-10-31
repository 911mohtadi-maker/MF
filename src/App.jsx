import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from './supabase'
import './App.css'
import Wardrobe from './Wardrobe'
import Outfits from './Outfits'
import Analysis from './Analysis'
import Auth from './Auth'

function Navigation() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  
  return (
    <nav className="nav">
      <Link to="/" className={`nav-btn ${location.pathname === '/' ? 'active' : ''}`}>👕 {t('wardrobe')}</Link>
      <Link to="/outfits" className={`nav-btn ${location.pathname === '/outfits' ? 'active' : ''}`}>✨ {t('outfits')}</Link>
      <Link to="/analysis" className={`nav-btn ${location.pathname === '/analysis' ? 'active' : ''}`}>📊 {t('analysis')}</Link>
      
      <button 
        onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
        className="nav-btn" 
        style={{ marginRight: 'auto', backgroundColor: '#d4af37', color: 'white' }}
      >
        {i18n.language === 'ar' ? 'EN' : 'AR'} 🌐
      </button>
    </nav>
  )
}

function App() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // فحص لو فيه مستخدم مسجل دخول
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // الاستماع لتغيير حالة الدخول
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => authListener.subscription.unsubscribe()
  }, [])

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>جاري التحميل...</div>

  // لو مفيش مستخدم مسجل، نعرض صفحة تسجيل الدخول بس
  if (!user) {
    return <Auth onLogin={setUser} />
  }

  // لو المستخدم مسجل، نعرض التطبيق
  return (
    <BrowserRouter>
      <div className="app" dir={document.documentElement.dir}> 
        <header className="header">
          <div className="logo">MF</div>
          <h1 className="app-name">Mohtadi F</h1>
          <p className="tagline">{t('tagline')}</p>
          <button onClick={() => supabase.auth.signOut()} style={{ marginTop: '10px', padding: '5px 10px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>تسجيل خروج</button>
        </header>

        <Navigation />

        <main className="content">
          <Routes>
            <Route path="/" element={<Wardrobe />} />
            <Route path="/outfits" element={<Outfits />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App