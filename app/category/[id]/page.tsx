import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import { formatDate } from '@/utils/date'
import Header from '@/components/Header'

// export const revalidate = 60;

interface Props {
  params: {
    id: string
  }
}

export default async function Home({ params }: Props) {
  const { id } = params
  const articleList = getSortedPostsData({
    category: id,
  })
  return (
    <div>
      <Header mainStyles={styles.main} />
      <main className={styles.main}>
        <div className="flex mt-6 pb-4">
          <div className="flex-1">
            {articleList.map((item, index) => (
              <>
                {index === 0 || item.year !== articleList[index - 1].year ? (
                  <div className="text-3xl font-bold text-slate-500 mb-2">
                    {item.year}
                  </div>
                ) : (
                  ''
                )}
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    href={`/article/${item.id}`}
                    key={item.id}
                    className="font-medium"
                  >
                    {item.title}
                  </Link>
                  <div className="text-slate-500 ml-4 whitespace-nowrap	">
                    {formatDate(item.date)}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
