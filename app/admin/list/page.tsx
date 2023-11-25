import styles from './page.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import { formatDate } from '@/utils/date'
import ArticleList from './ArticleList'

export default async function Home() {
  const articleListDraft = getSortedPostsData({
    draft: true,
  })
  const articleListPublish = getSortedPostsData()
  return (
    <div>
      <main className={styles.main}>
        <div className="mt-6 pb-4">
          <ArticleList
            articleList={articleListPublish}
            articleListDraft={articleListDraft}
          />
        </div>
      </main>
    </div>
  )
}
