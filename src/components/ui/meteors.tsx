"use client"

import React, { useMemo, useState } from "react"

import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const [windowWidth, setWindowWidth] = useState(0)

  React.useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  const meteorStyles = useMemo<Array<React.CSSProperties>>(
    () =>
      [...new Array(number)].map(() => ({
        "--angle": -angle + "deg",
        top: "-5%",
        left:
          windowWidth > 0
            ? `calc(0% + ${Math.floor(Math.random() * windowWidth)}px)`
            : `${Math.floor(Math.random() * 100)}%`,
        animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
        animationDuration:
          Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
          "s",
      })),
    [number, minDelay, maxDelay, minDuration, maxDuration, angle, windowWidth]
  )

  return (
    <>
      {meteorStyles.map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            "animate-meteor pointer-events-none absolute size-0.5 rotate-(--angle) rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]",
            className
          )}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-zinc-500 to-transparent" />
        </span>
      ))}
    </>
  )
}
