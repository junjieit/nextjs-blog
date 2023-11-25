import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core'
import { useEditor } from '@milkdown/react'
import { commonmark } from '@milkdown/preset-commonmark'
import { clipboard } from '@milkdown/plugin-clipboard'
import { history } from '@milkdown/plugin-history'
import { cursor } from '@milkdown/plugin-cursor'
import {
  diagram,
  diagramSchema,
  mermaidConfigCtx,
} from '@milkdown/plugin-diagram'
import { useNodeViewFactory } from '@prosemirror-adapter/react'
import { $view } from '@milkdown/utils'
import './theme'

import { milkShiki } from './shiki'
import Diagram from 'components/milkdown/Diagram'

// https://milkdown.dev/docs/api/plugin-slash
// import { SlashProvider } from '@milkdown/plugin-slash'

export function useInitEditor({ defaultValue }: { defaultValue?: string }) {
  const nodeViewFactory = useNodeViewFactory()
  useEditor((root) =>
    Editor.make()
      .enableInspector()
      .config((ctx) => {
        console.log('jie', root)
        ctx.set(rootCtx, root)

        if (defaultValue) {
          ctx.set(defaultValueCtx, defaultValue)
        }

        ctx.set(mermaidConfigCtx.key, {
          startOnLoad: true,
        })
      })
      .use(milkShiki)
      .use(commonmark)
      .use(
        [
          diagram,
          $view(diagramSchema.node, () =>
            nodeViewFactory({
              component: Diagram,
              stopEvent: () => true,
            }),
          ),
        ].flat(),
      )
      .use(diagram)
      .use(clipboard)
      .use(history)
      .use(cursor),
  )
}
