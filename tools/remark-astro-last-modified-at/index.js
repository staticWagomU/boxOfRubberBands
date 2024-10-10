import { execSync } from 'child_process';

export default function astroLastModifiedAt() {
  return  function (_, file) {
		const filePath = file.history[0];
		const result = execSync(`git log -1 --pretty="%cs" "${filePath}"`);
		file.data.astro.frontmatter.updatedDate = new Date(result.toString().trim());
  }
}
