import { type SchemaTypeDefinition } from 'sanity'

// ✅ Importación de esquemas personalizados
import producto from './producto'
import categoria from './categoria'
import subcategoria from './subcategoria'

// ✅ Exportación del esquema principal
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoria, subcategoria, producto],
}
