'use client'

import type { ArticleItem } from '@/lib/posts'
import { formatDate } from '@/utils/date'
import Link from 'next/link'
import { Fragment, useState } from 'react'

function filterArticleList(articleList: ArticleItem[], searchLowText: string) {
  if (!searchLowText) return articleList
  return articleList.filter((item) => {
    return (
      item.title.toLocaleLowerCase().includes(searchLowText) ||
      item.categories.includes(searchLowText) ||
      item.tags.includes(searchLowText)
    )
  })
}

export default function ArticleList({
  articleList,
  articleListDraft,
}: {
  articleList: ArticleItem[]
  articleListDraft: ArticleItem[]
}) {
  const [search, setSearch] = useState('')
  const searchLowText = search.toLocaleLowerCase()
  const showPublishList = filterArticleList(articleList, searchLowText)
  const showDraftList = filterArticleList(articleListDraft, searchLowText)
  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(evt) => setSearch(evt.currentTarget.value)}
        className="input-default mb-2"
        placeholder="搜索文章"
      />
      {showDraftList.length ? (
        <div className="my-4">
          <div className="text-3xl font-bold text-slate-500 mb-2">草稿</div>
          {showDraftList.map((item) => (
            <div
              className="mt-4 flex justify-between items-center"
              key={item.title + item.year}
            >
              <Link
                href={`/article/new/${item.id}`}
                key={item.id}
                className="font-medium"
              >
                {item.title}
              </Link>
              <div className="text-slate-500 ml-4 whitespace-nowrap	">
                <button className="btn-secondary btn-small mr-2">丢弃</button>
                <button className="btn-primary btn-small mr-2">发布</button>
                {formatDate(item.date)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
      {showPublishList.map((item, index) => (
        <Fragment key={item.title + item.year}>
          {index === 0 || item.year !== articleList[index - 1].year ? (
            <div className="text-3xl font-bold text-slate-500 mb-2">
              {item.year}
            </div>
          ) : (
            ''
          )}
          <div className="mt-4 flex justify-between items-center">
            <Link
              href={`/article/new/${item.id}`}
              key={item.id}
              className="font-medium"
            >
              {item.title}
            </Link>
            <div className="text-slate-500 ml-4 whitespace-nowrap	">
              {formatDate(item.date)}
            </div>
          </div>
        </Fragment>
      ))}
    </>
  )
}
