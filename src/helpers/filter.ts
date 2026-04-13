export type FilterOperator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'includes' | 'contains'

export type Filter<T = any> =
  {
    AND?: Filter<T>[]
    OR?: Filter<T>[]
  }
  | {
    field: keyof T
    operator: FilterOperator
    value: unknown
  }

export function filterItems<T = any>(items: T[], filters: Filter<T>[]): T[] {
  return items.filter(item => filters.every(filter => matchItem(item, filter)))
}

function matchItem(item: any, filter: any): boolean {
  if (filter.AND) {
    return filter.AND.every(filter => matchItem(item, filter))
  }

  if (filter.OR) {
    return filter.OR.some(filter => matchItem(item, filter))
  }

  const fieldValue = item[filter.field]

  switch (filter.operator) {
    case 'eq': return fieldValue == filter.value
    case 'neq': return fieldValue != filter.value
    case 'gt': return (fieldValue as number) > (filter.value as number)
    case 'gte': return (fieldValue as number) >= (filter.value as number)
    case 'lt': return (fieldValue as number) < (filter.value as number)
    case 'lte': return (fieldValue as number) <= (filter.value as number)
    case 'includes': return Array.isArray(fieldValue) && fieldValue.includes(filter.value)
    case 'contains': return !Array.isArray(fieldValue)
      ? `${fieldValue}`.toLowerCase().includes(`${filter.value}`.toLowerCase())
      : fieldValue.some(itemValue => `${itemValue}`.toLowerCase().includes(`${filter.value}`.toLowerCase()))
    default: return true
  }
}
