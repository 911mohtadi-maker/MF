import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from './supabase'

export default function Wardrobe() {
  const { t } = useTranslation()
  const [clothes, setClothes] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [itemType, setItemType] = useState('top') 
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchClothes()
  }, [])

  const fetchClothes = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data, error } = await supabase.from('clothes').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    if (!error) setClothes(data)
  }

  const addClothing = async () => {
    if (inputValue.trim() === '' || !imageFile) {
      alert('اكتب الاسم واختار صورة الأول!') 
      return
    }
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const { error: uploadError } = await supabase.storage.from('bucket1').upload(fileName, imageFile)

    if (uploadError) {
      alert(uploadError.message)
      setLoading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('bucket1').getPublicUrl(fileName)

    const { error } = await supabase.from('clothes').insert([{ 
      user_id: user.id, 
      name: inputValue, 
      image_url: publicUrl,
      type: itemType 
    }])

    if (!error) {
      setInputValue('')
      setImageFile(null)
      fetchClothes()
    } else {
      alert(error.message)
    }
    setLoading(false)
  }

  const deleteClothing = async (id) => {
    const { error } = await supabase.from('clothes').delete().eq('id', id)
    if (!error) setClothes(clothes.filter(item => item.id !== id))
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" placeholder={t('item_name_placeholder')} value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', flex: 1, fontFamily: 'inherit' }}
        />
        
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }} />
        
        {/* القائمة اللي بتختار منها النوع يدوياً */}
        <select value={itemType} onChange={(e) => setItemType(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}>
          <option value="top">{t('type_top')}</option>
          <option value="bottom">{t('type_bottom')}</option>
          <option value="shoes">{t('type_shoes')}</option>
          <option value="outerwear">{t('type_outerwear')}</option>
        </select>

        <button onClick={addClothing} disabled={loading} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#1a1a1a', color: 'white', cursor: 'pointer', fontFamily: 'inherit' }}>
          {loading ? '...' : `➕ ${t('add_btn')}`}
        </button>
      </div>

      {clothes.length === 0 ? (
        <p>{t('empty_wardrobe')}</p>
      ) : (
        <div className="wardrobe-grid">
          {clothes.map((item) => (
            <div key={item.id} className="clothing-card">
              <img src={item.image_url} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
              <span>{item.name}</span>
              <button onClick={() => deleteClothing(item.id)} className="delete-btn">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}