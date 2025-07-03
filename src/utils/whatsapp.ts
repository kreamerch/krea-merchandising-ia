export function generarTextoWhatsApp({
  title,
  cantidad,
  precio,
  color,
  mensaje,
}: {
  title: string
  cantidad: number
  precio: number
  color?: string
  mensaje?: string
}): string {
  const resumen = `• ${title} x${cantidad} - S/ ${(precio * cantidad).toFixed(2)}`
  const notaExtra = [
    color ? `Color: ${color}` : null,
    mensaje ? `Nota: ${mensaje}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const total = (precio * cantidad).toFixed(2)

  return `¡Hola! Me gustaría cotizar el siguiente producto:\n\n${resumen}${
    notaExtra ? `\n${notaExtra}\n` : ''
  }Total: S/ ${total}`
}
