"use client"

import { useState } from "react"
import { toast } from "./ui/toast"
import { Button } from "./ui/button"
import { Check, Copy } from "lucide-react"

interface CopyButtonProps {
  value: string
}

const CopyButton = ({ value }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.add({ type: "error", description: "No se pudo copiar el enlace." })
    }
  }

  return (
    <Button type="button" size="icon" onClick={handleCopy}>
      {copied ? <Check /> : <Copy />}
    </Button>
  )
}

export default CopyButton
