// import { saveArticle } from "@/lib/posts";
import Vditor from "vditor";

export default function useOperateArticle({
  title,
  editor,
}: {
  title: string;
  editor: React.MutableRefObject<Vditor | undefined>;
}) {
  const save = (isPublish: boolean) => {
    if (!title) throw new Error("title is undefined");
    if (!editor.current) throw new Error("editor is not ready");
    fetch("/api/article/new", {
      method: "POST",
      body: JSON.stringify({
        title,
        markdown: editor.current.getValue(),
        isPublish,
      }),
    });
    // saveArticle({
    //   title,
    //   markdown: editor.current.getValue(),
    //   isPublish,
    // });
  };

  const saveDraft = () => {
    save(false);
  };

  const savePublish = () => {
    save(true);
  };

  return {
    saveDraft,
    savePublish,
  };
}
