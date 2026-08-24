import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

export function readProjectFile(relativePath: string): string {
  return readFileSync(path.join(projectRoot, relativePath), "utf8");
}

export function readSourceFiles(extension: RegExp): string {
  return collectFiles(path.join(projectRoot, "src"))
    .filter(
      (filePath) =>
        extension.test(filePath) && !/\.test\.[cm]?[jt]sx?$/.test(filePath),
    )
    .map((filePath) => readFileSync(filePath, "utf8"))
    .join("\n");
}

export function requireGrade(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) throw new Error(message);
}

function collectFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
  });
}
