// src/types/next-sanity.d.ts
declare module 'next-sanity' {
  export function groq(strings: TemplateStringsArray): string
  export const createClient: (config: any) => any
  export const createImageUrlBuilder: (config: any) => any
  export const usePreviewSubscription: any
  export const PortableText: any
}
