import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { conciertoType } from './conciertoType'
import { concertType } from './concertType'
import { vehiculoType } from './vehiculoType'
import { comunaType } from './comunaType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, conciertoType, concertType, vehiculoType, comunaType],
}
