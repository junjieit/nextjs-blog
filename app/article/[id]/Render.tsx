'use client'
import styles from './render.module.css'

import { TocItem, useRenderMarkdown } from './hooks/useRenderMarkdown'
import { Fragment } from 'react'
import { useTocScrollActive } from './hooks/useTocScrollActive'
import classNames from 'classnames'

function TocList({
  tocList,
  activeId,
  isChildren,
}: {
  tocList: TocItem[]
  activeId: string | null
  isChildren?: boolean
}) {
  return (
    <ul className={isChildren ? 'ml-4' : ''}>
      {tocList.map((toc, index) => (
        <Fragment key={toc.name + toc.level}>
          <li
            className={classNames('leading-7', {
              'text-orange-700': activeId ? activeId === toc.name : index === 0,
            })}
          >
            <a href={`#${toc.name}`}>{toc.name}</a>
          </li>
          {toc.children ? (
            <TocList tocList={toc.children} activeId={activeId} isChildren />
          ) : (
            ''
          )}
        </Fragment>
      ))}
    </ul>
  )
}

export default function Render({ markdown }: { markdown: string }) {
  const { renderDom, tocList } = useRenderMarkdown(markdown)
  const { activeId } = useTocScrollActive({
    titleClassName: 'vditor__heading',
  })

  return (
    <div className="flex">
      <div className={styles.renderWrapper} ref={renderDom} />
      <div className="sticky top-2 h-max pl-12 hidden sm:block">
        <TocList tocList={tocList} activeId={activeId} />
      </div>
    </div>
  )
}
