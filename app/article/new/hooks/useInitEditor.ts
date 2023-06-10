import { useEffect, useRef } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";

export function useInitEditor() {
  const editor = useRef<Vditor | undefined>();
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editor.current = new Vditor(editorRef.current, {
        cache: {
          // enable: false,
          id: "editor-id",
        },
        height: "100%",
        mode: "wysiwyg",
        preview: {
          mode: "editor",
          hljs: {
            lineNumber: true,
          },
          markdown: {
            fixTermTypo: true,
            toc: true,
          },
        },
      });
    }
  }, [editorRef]);

  return {
    editor,
    editorRef,
  };
}
