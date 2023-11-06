export default function TopicPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Topic Page</h1>
      <p>SLUG: {params?.slug}</p>
    </div>
  )
}
