import { useNodeViewContext } from '@prosemirror-adapter/react'
import mermaid from 'mermaid'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export default function Diagram() {
  const { node, setAttrs, selected } = useNodeViewContext()
  const code = useMemo<string>(() => node.attrs.value, [node.attrs.value])
  const id = node.attrs.identity
  const codeInput = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState('preview')
  const codePanel = useRef<HTMLDivElement>(null)
  const rendering = useRef(false)

  const renderMermaid = useCallback(async () => {
    const container = codePanel.current
    if (!container) return

    if (code.length === 0) return
    if (rendering.current) return
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
    })
    rendering.current = true
    const { svg, bindFunctions } = await mermaid.render(id, code)
    rendering.current = false
    container.innerHTML = svg
    bindFunctions?.(container)
  }, [code, id])

  useEffect(() => {
    requestAnimationFrame(() => {
      renderMermaid()
    })
  }, [renderMermaid, value])

  return <div ref={codePanel} className="flex justify-center py-3" />
}
