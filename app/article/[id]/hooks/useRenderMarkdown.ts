import { useEffect, useRef, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";

export interface TocItem {
  name: string;
  level: number;
  children?: TocItem[];
}

function addTocItem(tocList: TocItem[], tocItem: TocItem) {
  const tocListLen = tocList.length;
  const { level } = tocItem;
  if (!tocListLen || level <= tocList[tocListLen - 1].level) {
    tocList.push(tocItem);
    return;
  }
  if (!tocList[tocListLen - 1].children) {
    tocList[tocListLen - 1].children = [tocItem];
  } else {
    addTocItem(tocList[tocListLen - 1].children as TocItem[], tocItem);
  }
}

export function useRenderMarkdown(markdown: string) {
  const renderDom = useRef<HTMLDivElement>(null);
  const [tocList, setTocList] = useState<TocItem[]>([]);

  useEffect(() => {
    if (markdown && renderDom.current) {
      const newTocList: TocItem[] = [];
      Vditor.preview(renderDom.current, markdown, {
        mode: "light",
        markdown: {
          toc: true,
        },
        // 对选中后的内容进行阅读
        speech: {
          enable: true,
        },
        // // 为标题添加锚点 0：不渲染；1：渲染于标题前；2：渲染于标题后，默认 0
        anchor: 1,
        after() {
          setTocList(newTocList);
        },
        lazyLoadImage: "https://unpkg.com/vditor/dist/images/img-loading.svg",
        renderers: {
          renderHeading: (node, entering) => {
            const id = Lute.GetHeadingID(node);
            const level = Number(node.__internal_object__.HeadingLevel);
            if (entering) {
              addTocItem(newTocList, {
                name: id,
                level,
              });
              return [
                `<h${level} id="${id}" class="vditor__heading"><span class="prefix"></span><span>`,
                Lute.WalkContinue,
              ];
            } else {
              return [
                `</span><a id="vditorAnchor-${id}" class="vditor-anchor" href="#${id}"><svg viewBox="0 0 16 16" version="1.1" width="16" height="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a></h${level}>`,
                Lute.WalkContinue,
              ];
            }
          },
        },
      });
    }
  }, [markdown, renderDom]);

  return {
    tocList,
    renderDom,
  };
}
