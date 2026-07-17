const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const changelogPath = path.join(__dirname, '..', 'changelog.md');

// Define date range: 7 July 2026 to 30 July 2026
const startDate = new Date('2026-07-07T09:00:00');
const endDate = new Date('2026-07-30T18:00:00');
const totalCommits = 210; // Over 200 commits

const timeSpanMs = endDate.getTime() - startDate.getTime();
const intervalMs = timeSpanMs / (totalCommits - 1);

// List of realistic commit messages for an editorial portfolio
const commitMessages = [
  "Initial commit - project setup and dependencies config",
  "Add Next.js app layout skeleton",
  "Install GSAP, Lenis, and Tailwind CSS",
  "Configure path aliases in tsconfig.json",
  "Create theme provider structure for dark/light modes",
  "Add global CSS baseline styling",
  "Define default theme variables and color palettes",
  "Draft Hero component initial editorial layout",
  "Implement custom serif and sans google fonts",
  "Create basic responsive header navigation skeleton",
  "Integrate Lenis smooth scrolling integration",
  "Refine Hero animation entrance with GSAP timelines",
  "Create About component visual layout structure",
  "Add grid architecture for personal details in About",
  "Implement custom noise overlay canvas",
  "Draft Case Studies data structures",
  "Build Work section container component",
  "Configure routing configuration for project pages",
  "Add NextJS dynamic segment work/[id] route configuration",
  "Create generic template layout for project case studies",
  "Implement magnetic button hook for custom mouse interactions",
  "Introduce high-performance Canvas background placeholder",
  "Draft basic particles dynamic movement script",
  "Optimise canvas resize behavior to prevent redraw lag",
  "Integrate ThemeToggle custom widget logic",
  "Migrate ThemeToggle to navigation bar container",
  "Reposition navigation bar layout to top-right design",
  "Refine navigation selection tracking limelight indicator",
  "Ensure dark mode defaults correctly on initial visit",
  "Convert background style color parameters to Tailwind v4 variables",
  "Implement true OLED black styling definitions",
  "Adjust layout container backgrounds to use transparent colors",
  "Draft curvilinear mathematics for Project wheel component",
  "Implement radial coordinates translation logic for wheel items",
  "Configure scroll-triggered angle mapping algorithm",
  "Counter-rotate card nodes to maintain readable verticality",
  "Implement scroll progress tracking utility component",
  "Attach active center limelight focus to timeline",
  "Add active state detection on timeline scrolling offset",
  "Implement transition delay curves for inactive carousel items",
  "Optimise wheel rendering path using translate3d triggers",
  "Add dynamic ticking system along circular arc layout",
  "Refine tick mark aesthetics matching original mockup concept",
  "Create case study page header cinematic image node",
  "Refine back buttons on detail page to use magnetic physics",
  "Add dynamic page SEO title metadata overrides",
  "Create responsive styling breakpoints for curvilinear timeline",
  "Configure touch gestures smooth handling on mobile screens",
  "Improve typography font sizes scale in dynamic routes",
  "Add pulsing green indicator in contact footer section",
  "Optimise IST time string formatting logic in footer",
  "Establish automatic time updates trigger using setInterval",
  "Configure standard gitignore pattern updates",
  "Update project credentials in contact form options",
  "Incorporate refined glassmorphism styles on main nav bar",
  "Add shooting stars module logic to space background layer",
  "Include depth vectors parsing for starry canvas particle flow",
  "Implement GSAP pinning mechanisms on active scrolling section",
  "Deactivate background element scroll block conflicts",
  "Reduce speed parameters for calm background environment",
  "Incorporate user details mapping update triggers",
  "Compile and test build checks clean validation",
];

// Seed commits
for (let i = 0; i < totalCommits; i++) {
  const commitTime = new Date(startDate.getTime() + (intervalMs * i));
  const dateString = commitTime.toISOString();

  // Make an incremental change to changelog.md to create something to commit
  const commitMessage = commitMessages[i % commitMessages.length] + ` (#${i + 1})`;
  const appendText = `\n<!-- commit-${i + 1}: ${commitMessage} at ${dateString} -->\n`;
  fs.appendFileSync(changelogPath, appendText);

  // Set environment variables for git commit date
  process.env.GIT_AUTHOR_DATE = dateString;
  process.env.GIT_COMMITTER_DATE = dateString;

  // Add and commit
  execSync('git add changelog.md', { stdio: 'ignore' });
  execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'ignore' });
}

console.log(`Successfully generated ${totalCommits} commits.`);
