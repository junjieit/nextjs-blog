'use client'

import { useEffect, useState } from 'react'
import { Milkdown, MilkdownProvider } from '@milkdown/react'
import { useInitEditor } from './hooks/prim/useInitEditor'
import type { MatterArticle } from '@/lib/posts'

const MilkdownEditor = ({ defaultValue }: { defaultValue?: string }) => {
  useInitEditor({
    defaultValue,
  })

  return <Milkdown />
}

export default function ArticleEditor({
  matterArticle,
}: {
  matterArticle?: MatterArticle
}) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  // const { editorRef, editor } = useInitEditor({
  //   markdown,
  // })
  // const { saveDraft, savePublish } = useOperateArticle({
  //   title,
  //   editor,
  //   category,
  // })
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  return (
    <div className="flex flex-col w-screen h-screen p-8">
      <div className="mb-4 flex justify-between">
        <div>
          <input
            className="input-default"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
          <input
            className="input-default"
            value={category}
            onChange={(evt) => setCategory(evt.target.value)}
          />
        </div>
        {/* <div className="ml-4">
          <button className="btn-secondary mr-4" onClick={savePublish}>
            发布
          </button>
          <button className="btn-primary w-28" onClick={saveDraft}>
            保存
          </button>
        </div> */}
      </div>
      <div className="h-full w-full">
        {/* <div ref={editorRef}></div> */}
        <MilkdownProvider>
          {showChild ? (
            <MilkdownEditor defaultValue={matterArticle?.content} />
          ) : (
            ''
          )}
        </MilkdownProvider>
      </div>
    </div>
  )
}
