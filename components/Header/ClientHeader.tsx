'use client'
import Link from 'next/link'
import { useRef } from 'react'
import MenuBtn from './MenuBtn'
import GoBackIcon from '@/assets/icons/arrow-back.svg'
import kute from 'kute.js'
import { useRouter } from 'next/navigation'

const HOME_TITLE = 'JunJie'

export default function ClientHeader({
  mainStyles,
  title = HOME_TITLE,
  categoryList,
}: {
  mainStyles?: string
  title?: string
  categoryList: string[]
}) {
  const showBack = title !== HOME_TITLE
  const categoryRef = useRef<HTMLDivElement>(null)
  const len = categoryList.length
  const showHeight = len * 24 + (len - 1) * 16
  const router = useRouter()

  const onClickMenu = (isOpen: boolean) => {
    const height = isOpen ? showHeight : 0
    kute
      .to(
        categoryRef.current,
        { height },
        {
          duration: 150,
        },
      )
      .start()
  }

  return (
    <div className={mainStyles}>
      {showBack ? (
        <div className="flex justify-between items-center mb-4 sm:hidden">
          <GoBackIcon
            width={28}
            height={28}
            className="cursor-pointer"
            onClick={() => {
              router.back()
            }}
          />
          <MenuBtn onClick={onClickMenu} />
        </div>
      ) : (
        ''
      )}
      <div className="flex justify-between items-center pt-4">
        <Link href="/" className="text-4xl font-bold">
          {title}
        </Link>
        {process.env.NODE_ENV === 'development' ? (
          <Link href="/admin">管理</Link>
        ) : (
          ''
        )}
        {showBack ? '' : <MenuBtn onClick={onClickMenu} />}
      </div>
      <div
        className="h-0 overflow-hidden flex mt-4 justify-end sm:h-max"
        ref={categoryRef}
      >
        <ul className="space-y-4 > li + li sm:flex sm:space-x-6 > li + li sm:space-y-0">
          {categoryList.map((category) => (
            <li key={category}>
              <Link href={`/category/${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
