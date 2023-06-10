'use client'
import kute, { Tween } from 'kute.js'
import MenuIcon from '@/assets//icons/menu.svg'
import React from 'react'

// arrow-down
const targetPath =
  'M480-160 160-480l42-42 248 248v-526h60v526l248-248 42 42-320 320Z'

export default function MenuBtn({
  onClick,
}: {
  onClick?: (isOpen: boolean) => void
}) {
  const menuKuteRef = React.useRef<SVGAElement>(null)
  const nextPath = React.useRef(targetPath)
  const handleClick = () => {
    if (menuKuteRef.current) {
      const kuteTween: Tween = kute
        .to(
          menuKuteRef.current.querySelector('path'),
          {
            path: nextPath.current,
          },
          {
            duration: 150,
          },
        )
        .start()
      nextPath.current = kuteTween.valuesStart.path.original
      if (onClick) {
        const isOpen = nextPath.current !== targetPath
        onClick(isOpen)
      }
    }
  }
  return (
    <MenuIcon
      ref={menuKuteRef}
      onClick={handleClick}
      className="text-white sm:hidden cursor-pointer"
      width={28}
      height={28}
    />
  )
}
