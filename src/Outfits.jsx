import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from './supabase'

export default function Outfits() {
  const { t } = useTranslation()
  const [outfit, setOutfit] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const generateOutfit = async () => {
    setLoading(true)
    setMessage('')
    setOutfit(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // بنجيب كل ملابس المستخدم
    const { data: clothes, error } = await supabase.from('clothes').select('*').eq('user_id', user.id)
    
    if (error || clothes.length < 2) {
      setMessage('محتاج تضيف قطعتين على الأقل في خزانتك عشان أقدر أطقملك!')
      setLoading(false)
      return
    }

    // بنفصلهم حسب النوع
    const tops = clothes.filter(c => c.type === 'top' || c.type === 'outerwear' || !c.type) // لو مفيش نوع، نحسبه علوي
    const bottoms = clothes.filter(c => c.type === 'bottom')
    const shoes = clothes.filter(c => c.type === 'shoes')

    if (tops.length === 0 || bottoms.length === 0) {
      setMessage('عشان أقترح طقم كامل، محتاج قطعة علوية وقطعة سفلية على الأقل في الخزانة!')
      setLoading(false)
      return
    }

    // بنختار علوي عشوائي وسفلي عشوائي
    const randomTop = tops[Math.floor(Math.random() * tops.length)]
    const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)]
    
    const selected = [randomTop, randomBottom]

    // لو عنده أحذية، نضيف واحد
    if (shoes.length > 0) {
      const randomShoe = shoes[Math.floor(Math.random() * shoes.length)]
      selected.push(randomShoe)
    }

    setOutfit(selected)
    setLoading(false)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>✨ {t('outfits_title')}</h2>
      <p>{t('outfits_desc')}</p>
      
      <button onClick={generateOutfit} disabled={loading} style={{ padding: '12px 24px', fontSize: '18px', backgroundColor: '#d4af37', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold' }}>
        {loading ? 'جاري الاقتراح...' : `🪄 ${t('suggest_btn')}`}
      </button>

      {message && <p style={{ color: '#ff4d4d', marginTop: '20px', fontWeight: 'bold' }}>{message}</p>}

      {outfit && (
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {outfit.map((item, index) => (
            <div key={index} className="clothing-card" style={{ width: '150px', cursor: 'default' }}>
              <img src={item.image_url} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
              <span style={{ marginTop: '10px', fontWeight: 'bold' }}>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}