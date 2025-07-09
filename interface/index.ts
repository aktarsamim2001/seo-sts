export interface MarkdownData {
  slug: string
  content: string
  [key: string]: any
}

// Move this interface to a shared location for reuse
export interface ServicesType {
  slug: string
  content: string
  title: string
  description: string
  coverImage?: string
  logo?: string
  logoDark?: string
  badgeTitle?: string
  overview?: string
  serviceIncludes?: string[]
  [key: string]: any
}
