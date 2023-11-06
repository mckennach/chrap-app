import { ImageLoaderProps } from 'next/image'
import { ImageProps } from '../types/images.types'
import { supabase } from '@/app/supabase'

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const imageUrl = new URL(src)
  return imageUrl.search
    ? `${src}&w=${width}&q=${quality || 75}`
    : `${src}?w=${width}&q=${quality || 75}`
}

export const checkAbsoluteImage = (src: string) => {
  try {
    new URL(src)
    return true
  } catch (err) {
    return false
  }
}

export const getImageUrl = async (imageObject: ImageProps, bucket: string) => {
  const { name } = imageObject
  let imageUrl = null
  imageUrl = await supabase.storage.from(bucket).getPublicUrl(name)
  return imageUrl?.data?.publicUrl
}

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

export const toBase64 = (str: string) => {
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
}
