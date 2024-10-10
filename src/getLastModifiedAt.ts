import { execSync } from "child_process";

export function getLastModifiedAt(filePath: string): string {
  const result = execSync(`git log -1 --format=%cs ${filePath}`);
  return result.toString().trim();
}
