"use client";

import { useState } from "react";
import { useInitEditor } from "./hooks/useInitEditor";
import useOperateArticle from "./hooks/useOperateArticle";

export default function ArticleEditor() {
  const [title, setTitle] = useState("");
  const { editorRef, editor } = useInitEditor();
  const { saveDraft, savePublish } = useOperateArticle({
    title,
    editor,
  });

  return (
    <div className="flex flex-col w-screen h-screen p-8">
      <div className="mb-4 flex justify-between">
        <div>
          <input
            className="input-default"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
        </div>
        <div className="ml-4">
          <button className="btn-secondary mr-4" onClick={savePublish}>
            发布
          </button>
          <button className="btn-primary w-28" onClick={saveDraft}>
            保存
          </button>
        </div>
      </div>
      <div className="h-full w-full">
        <div ref={editorRef}></div>
      </div>
    </div>
  );
}
