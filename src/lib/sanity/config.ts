function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (!value) throw new Error(errorMessage)
  return value
}

export const apiVersion = assertValue(process.env.NEXT_PUBLIC_SANITY_API_VERSION, 'Falta versión')
export const dataset = assertValue(process.env.NEXT_PUBLIC_SANITY_DATASET, 'Falta dataset')
export const projectId = assertValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 'Falta projectId')
export const useCdn = process.env.NODE_ENV === 'production'
