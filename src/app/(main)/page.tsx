import PostsView from '@/components/posts/posts-view'
import Sidebar from '@/components/home/sidebar'
import client from '@/apollo-client'
import { GET_POSTS } from '@/utils/api/graphql/queries/posts.queries'
export default async function HomePage() {
  const { data } = await client.query({
    query: GET_POSTS,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  })
  const posts = data?.getPosts
  return (
    <div className="grid md:grid-cols-7 gap-4">
      <article className="md:col-span-5">
        <PostsView posts={posts} />
      </article>
      <aside className="md:col-span-2">
        <Sidebar />
      </aside>
    </div>
  )
}
