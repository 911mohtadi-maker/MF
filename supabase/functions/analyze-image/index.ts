// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { imageBase64 } = await req.json()
    
    const OPENROUTER_API_KEY = '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'

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemma-4-26b-a4b-it:free", 
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "What is the clothing item in this image? Reply with one word only from this list: top, bottom, shoes, outerwear."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64 
                }
              }
            ]
          }
        ]
      })
    })

    const data = await response.json()

    // 👇 السطرين دول هنضيفهم عشان نشوف OpenRouter رد بإيه
    console.log("OpenRouter Response Status:", response.status)
    console.log("OpenRouter Response Body:", JSON.stringify(data, null, 2))

    // لو OpenRouter رجع خطأ، بنوقفه هنا ونطبع الرسالة
    if (!response.ok) {
       throw new Error(`OpenRouter Error: ${data.error?.message || 'Unknown error'}`)
    }

    let itemType = data.choices[0].message.content.trim().toLowerCase()
    
    if (!['top', 'bottom', 'shoes', 'outerwear'].includes(itemType)) {
      itemType = 'top'
    }

    return new Response(JSON.stringify({ type: itemType }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })

  } catch (error) {
    // 👇 وهنا بنطبع الخطأ الحقيقي
    console.error("Function Error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})