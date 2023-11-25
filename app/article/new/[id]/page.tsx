import { getArticleDetail, getSortedPostsData } from '@/lib/posts'
import ArticleEditor from '../ArticleEditor'

interface Props {
  params: {
    id: string
  }
}

export default async function ArticleEdit({ params }: Props) {
  const { id } = params
  const matterArticle = await getArticleDetail(decodeURI(id))
  return (
    <div>
      <ArticleEditor matterArticle={matterArticle} />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData()

  return posts.map((post) => ({
    id: post.id,
  }))
}
