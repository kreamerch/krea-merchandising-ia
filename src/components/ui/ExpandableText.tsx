'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

type Props = {
  text: string
  maxChars?: number
}

export default function ExpandableText({ text, maxChars = 180 }: Props) {
  const [expanded, setExpanded] = useState(false)

  const isLong = text.length > maxChars
  const visibleText = expanded ? text : text.slice(0, maxChars)

  return (
    <div className="text-base text-muted-foreground leading-relaxed space-y-4">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={expanded ? 'expanded' : 'collapsed'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="whitespace-pre-line"
        >
          {visibleText}
          {!expanded && isLong && '...'}
        </motion.div>
      </AnimatePresence>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/90 transition-colors mx-auto sm:mx-0"
        >
          <span>{expanded ? 'Ver menos' : 'Ver más'}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      )}
    </div>
  )
}
