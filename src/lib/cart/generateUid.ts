export function generateUid(id: string, color?: string, mensaje?: string): string {
  return `${id}-${color?.trim() || 'default'}-${mensaje?.trim() || 'default'}`
}
