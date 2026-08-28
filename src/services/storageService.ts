import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const uploadProductImage = async (
  file: File,
  productId: string = 'general'
): Promise<string | null> => {
  if (!isSupabaseConfigured()) {
    // Return fake object URL for local preview mode
    return URL.createObjectURL(file);
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${productId}/${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Supabase Storage upload error:', uploadError.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.error('Storage upload exception:', err);
    return null;
  }
};
