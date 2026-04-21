import 'dotenv/config'

function getEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value
}

export const env = {
  get PRODUCT_TABLE() {
    return getEnv('TABLE_NAME')
  },
}