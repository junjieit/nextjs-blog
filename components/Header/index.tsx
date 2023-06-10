import { getCategoryList, getSortedPostsData } from '@/lib/posts'
import ClientHeader from './ClientHeader'
import styles from './header.module.css'

export default function Header({
  mainStyles,
  title,
}: {
  mainStyles?: string
  title?: string
}) {
  const articleList = getSortedPostsData()
  const categoryList = getCategoryList(articleList)
  return (
    <div className={styles.header}>
      <ClientHeader
        mainStyles={mainStyles}
        categoryList={categoryList}
        title={title}
      />
      {/* <div className={mainStyles}>
        <div className="flex justify-between items-center">
          <Link href="/" className="text-4xl font-bold">
            {title}
          </Link>
          <MenuBtn />
        </div>
        <div className="flex mt-4 justify-end">
          <ul className="space-y-4 > li + li sm:flex sm:space-x-6 > li + li sm:space-y-0">
            {categoryList.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </div>
      </div> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
        className={styles.headerBgIcon}
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          ></path>
        </defs>
        <g>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(255,255,255,0.7)"
          ></use>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(255,255,255,0.5)"
          ></use>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(255,255,255,0.3)"
          ></use>
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff"></use>
        </g>
      </svg>
    </div>
  )
}
