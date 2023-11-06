export interface ImageProps {
  id: string
  bucket_id: string
  name: string
  owner: string
  created_at: Date
  updated_at: Date
  last_accessed_at: Date
  metadata: string
  path_tokens: string
  version: number
}
