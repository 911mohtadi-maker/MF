import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "tagline": "Dress Smarter. Look Better. Buy Wisely.",
      "wardrobe": "Wardrobe",
      "outfits": "Outfits",
      "analysis": "Analysis",
      "outfits_title": "Smart Outfit Generator",
      "outfits_desc": "Click below to get an outfit suggestion.",
      "suggest_btn": "Suggest Outfit!",
      "analysis_title": "Smart Style Analysis",
      "analysis_desc": "Enter your details to know what suits you.",
      "height": "Height (cm)",
      "weight": "Weight (kg)",
      "body_shape": "What is your body shape?",
      "skin_color": "What is your skin color?",
      "undertone": "Skin Undertone?",
      "analyze_btn": "Analyze My Style",
      "result_title": "Result",
      "measurements": "Measurements",
      "suitable_colors": "Colors that suit you",
      "suitable_fits": "Suitable fits",
      "trend_touch": "Trend Touch",
      "add_btn": "Add",
      "item_name_placeholder": "Item name (e.g., Black T-shirt)",
      "empty_wardrobe": "Your wardrobe is empty... Add your first item above! 👆",
      "need_two_items": "You need at least 2 items to suggest an outfit!",
      "type_top": "Top / Shirt",
      "type_bottom": "Bottom / Pants",
      "type_shoes": "Shoes",
      "type_outerwear": "Jacket / Coat"
    }
  },
  ar: {
    translation: {
      "tagline": "البس بذكاء. اظهر بشكل أفضل. اشترِ بوعي.",
      "wardrobe": "خزانتي",
      "outfits": "إطلالات",
      "analysis": "تحليل",
      "outfits_title": "منسق الإطلالات الذكي",
      "outfits_desc": "دوس تحت عشان أقترحلك طقم من ملابسك.",
      "suggest_btn": "اقترح لي طقم!",
      "analysis_title": "تحليل الستايل الذكي",
      "analysis_desc": "سجل بياناتك عشان نعرف الستايل اللي يليق عليك ويركب على الترند.",
      "height": "الطول (سم)",
      "weight": "الوزن (كجم)",
      "body_shape": "شكل جسمك إيه؟",
      "skin_color": "لون بشرتك إيه؟",
      "undertone": "الميل اللوني للبشرة (Undertone)؟",
      "analyze_btn": "حلل ستايلي",
      "result_title": "النتيجة",
      "measurements": "القياسات",
      "suitable_colors": "الألوان اللي تليق عليك",
      "suitable_fits": "القصات المناسبة",
      "trend_touch": "لمسة ترند",
      "add_btn": "أضف",
      "item_name_placeholder": "اسم القطعة (مثلاً: تيشيرت أسود)",
      "empty_wardrobe": "خزانتك فاضية... أضف أول قطعة ملابس فوق! 👆",
      "need_two_items": "محتاج تضيف قطعتين على الأقل في خزانتك عشان أقدر أطقملك! 👕👖",
      "type_top": "تيشيرت / قميص (علوي)",
      "type_bottom": "بنطلون / شورت (سفلي)",
      "type_shoes": "حذاء",
      "type_outerwear": "جاكيت / معطف"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
});

export default i18n;