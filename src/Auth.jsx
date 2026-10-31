import { useState } from 'react'
import { supabase } from './supabase'
import { useTranslation } from 'react-i18next'

export default function Auth({ onLogin }) {
  const { t } = useTranslation()
  const [isLogin, setIsLogin] = useState(true) // تبديل بين تسجيل الدخول وإنشاء حساب
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isLogin) {
        // تسجيل دخول
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        onLogin(data.user) // نبلغ التطبيق إن المستخدم دخل
      } else {
        // إنشاء حساب جديد
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.')
        setIsLogin(true) // نرجعه لصفحة الدخول
      }
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="البريد الإلكتروني" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}
        />
        <input 
          type="password" 
          placeholder="كلمة المرور" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}
        />
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '12px', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'inherit' }}
        >
          {loading ? 'جاري التحميل...' : (isLogin ? 'دخول' : 'إنشاء الحساب')}
        </button>
      </form>

      {message && <p style={{ color: 'red', marginTop: '15px' }}>{message}</p>}

      <button 
        onClick={() => { setIsLogin(!isLogin); setMessage('') }}
        style={{ marginTop: '20px', background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}
      >
        {isLogin ? 'ليس لديك حساب؟ إنشاء حساب جديد' : 'لديك حساب بالفعل؟ تسجيل الدخول'}
      </button>
    </div>
  )
}