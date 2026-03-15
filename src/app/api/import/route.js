import { supabase } from '@/lib/supabase'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET() {

  const filePath = path.join(process.cwd(), 'public', 'data1.json')
  const file = await readFile(filePath, 'utf8')
  const data = JSON.parse(file)

  for (const item of data) {

    const { error } = await supabase
      .from('properties')
      .insert({
        id: Number(item.listingId),
        title: item.imageAlt || 'بدون عنوان',
        slug: item.imageAlt?.toLowerCase().replace(/\s+/g, '-'),
        is_featured: item.is_featured || false,
        status_label: 'imported'
      })

    if (error) {
      console.log("ERROR:", error)
    }
  }

  return Response.json({ message: "تم الاستيراد 🚀" })
}
