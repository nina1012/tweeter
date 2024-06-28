import { supabase } from '@/lib/supabase';

type uploadImageProps = {
  image: File;
  imageName: string;
  bucketName: string;
};

export const uploadImage = async ({
  image,
  imageName,
  bucketName,
}: uploadImageProps) => {
  if (!image) return;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(imageName, image, {
      contentType: image.type,
    });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
};
