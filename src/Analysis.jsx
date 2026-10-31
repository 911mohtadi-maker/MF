import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Analysis() {
  const { t } = useTranslation()
  
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bodyShape, setBodyShape] = useState('')
  const [skinColor, setSkinColor] = useState('')
  const [undertone, setUndertone] = useState('')
  const [result, setResult] = useState(null)

  const analyzeStyle = () => {
    if (!height || !weight || !bodyShape || !skinColor || !undertone) {
      alert('من فضلك املأ كل البيانات الأول عشان نقدر نحللك صح!')
      return
    }

    let advice = { bmi: '', colors: [], fits: [], trend: '' }

    const hMeters = height / 100;
    const bmiValue = (weight / (hMeters * hMeters)).toFixed(1);
    
    if (bmiValue < 18.5) advice.bmi = `${bmiValue}`
    else if (bmiValue >= 18.5 && bmiValue < 25) advice.bmi = `${bmiValue}`
    else if (bmiValue >= 25 && bmiValue < 30) advice.bmi = `${bmiValue}`
    else advice.bmi = `${bmiValue}`

    if (undertone === 'warm') advice.colors = ['Gold/Cream', 'Olive', 'Terracotta']
    else if (undertone === 'cool') advice.colors = ['Royal Blue', 'Silver', 'Burgundy']
    else advice.colors = ['White', 'Black', 'Gray']

    if (bodyShape === 'triangle') {
      advice.fits = ['Broad Shoulders', 'Wide-leg']
      advice.trend = '2026 Trend: Classic styles with Cropped Jackets.'
    } else if (bodyShape === 'rectangle') {
      advice.fits = ['Belted', 'Layering']
      advice.trend = '2026 Trend: Layering and Asymmetrical cuts.'
    } else if (bodyShape === 'inverted_triangle') {
      advice.fits = ['V-neck', 'Flared']
      advice.trend = '2026 Trend: Bold colors like Red and Purple.'
    } else {
      advice.fits = ['Relaxed fit', 'Draped']
      advice.trend = '2026 Trend: Sustainable and classic pieces.'
    }

    setResult(advice)
  }

  return (
    <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
      <h2>📊 {t('analysis_title')}</h2>
      <p>{t('analysis_desc')}</p>

      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <label style={{ fontWeight: 'bold' }}>{t('height')}:</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <label style={{ fontWeight: 'bold' }}>{t('weight')}:</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
      </div>

      <div style={{ margin: '20px 0', textAlign: 'right' }}>
        <label style={{ fontWeight: 'bold' }}>{t('body_shape')}</label>
        <select value={bodyShape} onChange={(e) => setBodyShape(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }}>
          <option value="">...</option>
          <option value="triangle">Triangle</option>
          <option value="rectangle">Rectangle</option>
          <option value="inverted_triangle">Inverted Triangle</option>
          <option value="oval">Oval</option>
        </select>
      </div>

      <div style={{ margin: '20px 0', textAlign: 'right' }}>
        <label style={{ fontWeight: 'bold' }}>{t('skin_color')}</label>
        <select value={skinColor} onChange={(e) => setSkinColor(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }}>
          <option value="">...</option>
          <option value="fair">Fair</option>
          <option value="medium">Medium</option>
          <option value="dark">Olive</option>
          <option value="deep">Deep</option>
        </select>
      </div>

      <div style={{ margin: '20px 0', textAlign: 'right' }}>
        <label style={{ fontWeight: 'bold' }}>{t('undertone')}</label>
        <select value={undertone} onChange={(e) => setUndertone(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }}>
          <option value="">...</option>
          <option value="warm">Warm</option>
          <option value="cool">Cool</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>

      <button onClick={analyzeStyle} style={{ padding: '12px 30px', fontSize: '18px', backgroundColor: '#1a1a1a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginTop: '10px' }}>
        🔍 {t('analyze_btn')}
      </button>

      {result && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px', textAlign: 'right', border: '1px solid #e0e0e0' }}>
          <h3 style={{ borderBottom: '2px solid #d4af37', paddingBottom: '10px', display: 'inline-block' }}>🎯 {t('result_title')}:</h3>
          <p style={{ marginTop: '15px' }}><strong>{t('measurements')}:</strong> {result.bmi}</p>
          <p><strong>{t('suitable_colors')}:</strong> {result.colors.join(', ')}</p>
          <p><strong>{t('suitable_fits')}:</strong> {result.fits.join(', ')}</p>
          <p style={{ marginTop: '15px', color: '#555', fontSize: '14px', backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}>
            <strong>💡 {t('trend_touch')}:</strong> {result.trend}
          </p>
        </div>
      )}
    </div>
  )
}