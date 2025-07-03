'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send } from 'lucide-react'
import { toast } from 'sonner'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

export default function ContactForm() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombre || !email || !mensaje) {
      toast.error('Por favor, completa todos los campos')
      return
    }

    setEnviando(true)

    // Simula envío
    await new Promise((r) => setTimeout(r, 1500))

    toast.success('Mensaje enviado correctamente', {
      description: 'Gracias por contactarnos. Te responderemos pronto.',
      icon: <Send className="w-5 h-5 text-primary" />,
    })

    setNombre('')
    setEmail('')
    setMensaje('')
    setEnviando(false)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-xl space-y-6 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <label className="text-sm font-medium text-foreground">Nombre</label>
        <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Correo electrónico</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Mensaje</label>
        <Textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Escribe tu mensaje aquí..." className="min-h-[100px]" />
      </div>

      <div className="pt-4">
        <Button type="submit" disabled={enviando} className="w-full sm:w-auto">
          {enviando ? 'Enviando...' : 'Enviar mensaje'}
        </Button>
      </div>
    </motion.form>
  )
}
