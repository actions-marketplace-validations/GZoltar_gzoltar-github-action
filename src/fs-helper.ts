const fs = require('fs')
const path = require('path')

export function readFile(path: string): string[] {
  if (!path) {
    throw new Error("Arg 'path' must not be empty")
  }

  try {
    const data = fs.readFileSync(path, 'UTF-8')
    return data.split(/\r?\n/)
  } catch (error) {
    throw new Error(
      `Encountered an error when reading file path '${path}': ${
        (error as any)?.message ?? error
      }`
    )
  }
}

export function searchFile(dir: string, fileName: string): string | undefined {
  try {
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const filePath = path.join(dir, file)

      const fileStat = fs.statSync(filePath)

      if (fileStat.isDirectory()) {
        searchFile(filePath, fileName)
      } else if (file.endsWith(fileName)) {
        return filePath
      }
    }
  } catch (error) {
    throw new Error(
      `Encountered an error when searching file '${fileName}' in directory '${dir}': ${
        (error as any)?.message ?? error
      }`
    )
  }
}

export function directoryExists(path: string): boolean {
  if (!path) {
    throw new Error("Arg 'path' must not be empty")
  }

  try {
    if (fs.existsSync(path)) {
      return true
    }
  } catch (error) {
    throw new Error(
      `Encountered an error when checking whether path '${path}' exists: ${
        (error as any)?.message ?? error
      }`
    )
  }

  return false
}

export function fileExists(path: string): boolean {
  if (!path) {
    throw new Error("Arg 'path' must not be empty")
  }

  try {
    fs.statSync(path)
  } catch (error) {
    if ((error as any)?.code === 'ENOENT') {
      return false
    }

    throw new Error(
      `Encountered an error when checking whether file '${path}' exists: ${
        (error as any)?.message ?? error
      }`
    )
  }

  return true
}