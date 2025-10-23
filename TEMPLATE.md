# Using This Template

This repository is a **template** for creating logo animations with GSAP. Follow the instructions below to create new projects and maintain them with template updates.

## Quick Start: Creating a New Project

### Method 1: GitHub Template (Recommended)

1. **On GitHub**, click the **"Use this template"** button at the top of this repository
2. Choose **"Create a new repository"**
3. Name your new project (e.g., `pol-mare-logo-animation`)
4. Choose public or private visibility
5. Click **"Create repository"**

6. **Clone your new project:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_PROJECT_NAME.git
   cd YOUR_PROJECT_NAME
   ```

7. **Add this template as upstream remote** (for future updates):
   ```bash
   git remote add template https://github.com/YOUR_USERNAME/gsap-logo-animation-template.git
   git remote -v  # Verify it was added
   ```

8. **Install dependencies:**
   ```bash
   npm install
   ```

9. **Customize your project** (see "Customization Checklist" below)

### Method 2: Manual Clone

If you prefer not to use GitHub's template feature:

```bash
# 1. Clone this template
git clone https://github.com/YOUR_USERNAME/gsap-logo-animation-template.git YOUR_PROJECT_NAME
cd YOUR_PROJECT_NAME

# 2. Rename origin to template, create new origin
git remote rename origin template
# Create new repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_PROJECT_NAME.git

# 3. Push to your new repo
git push -u origin main

# 4. Install dependencies
npm install

# 5. Customize (see "Customization Checklist" below)
```

## Customization Checklist

After creating your project from the template, customize these files:

### Required Changes

- [ ] **Replace `public/logo.svg`** with your client's logo
- [ ] **Update animation in `src/main.js`:**
  - Change mask selectors if your logo has different IDs
  - Adjust animation timing and duration
  - Customize easing and effects
- [ ] **Update `package.json`:**
  - Change project name
  - Update version to 0.0.1
  - Update license if needed
- [ ] **Test the animation:**
  ```bash
  npm run dev
  # Open http://localhost:5000
  ```

### Optional Changes

- [ ] Update README.md with project-specific information
- [ ] Modify colors/styling in `src/index.scss` if needed
- [ ] Adjust export resolution in package.json scripts
- [ ] Update CLAUDE.md with project context (optional)

## Project Structure

Understanding which files are template-managed vs project-specific:

### Template-Managed Files (Accept updates from template)
These files contain generic, reusable code that should be updated when template improves:

- `vite.config.js` - Build configuration
- `tailwind.config.js` - Tailwind setup
- `postcss.config.js` - PostCSS configuration
- `prepare.js` - Export mode setup
- `package.json` - Scripts and dependencies (merge carefully)
- `EXPORT.md` - Export documentation
- `TEMPLATE.md` - This file
- Core structure in `src/main.js` - GSAP setup and plugin registration

### Project-Specific Files (Keep your changes)
These files are unique to each project and should not be overwritten:

- `public/logo.svg` - Your logo
- Animation details in `src/main.js` - Timeline, timing, custom effects
- `README.md` - Project documentation (after customization)
- `CLAUDE.md` - Project context (after customization)
- Git history and project name

## Pulling Template Updates

When the template repository gets improvements (better export scripts, new features, bug fixes), you can pull those into your project:

### Step 1: Fetch Template Changes

```bash
# Make sure you're in your project directory
cd YOUR_PROJECT_NAME

# Fetch latest changes from template
git fetch template
```

### Step 2: Review Changes

```bash
# See what changed in template
git log template/main --oneline -10

# See detailed diff of changes
git diff template/main
```

### Step 3: Merge Updates

**Option A: Merge all changes**
```bash
git merge template/main
```

**Option B: Cherry-pick specific commits**
```bash
# If you only want specific improvements
git cherry-pick <commit-hash>
```

### Step 4: Resolve Conflicts

If Git reports conflicts (common in package.json, README.md, main.js):

1. **Open conflicted files** and look for conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)

2. **Decision guide:**
   - `package.json`: Accept template scripts, keep your project name
   - `README.md`: Keep your project-specific content
   - `main.js`: Accept template structure, preserve your animation timing
   - `logo.svg`: Always keep your version
   - Config files: Usually accept template version

3. **Resolve each conflict** by editing the file and removing conflict markers

4. **Mark as resolved:**
   ```bash
   git add <resolved-file>
   ```

5. **Complete the merge:**
   ```bash
   git commit
   ```

### Step 5: Test & Push

```bash
# Test that everything still works
npm install  # If dependencies changed
npm run dev

# Export test
npm run export:video

# Push merged changes
git push origin main
```

## Common Scenarios

### Scenario 1: Template adds new export resolution (e.g., 8K)

```bash
git fetch template
git merge template/main
# package.json will show conflict in scripts section
# Accept the new script, keep your project name
npm run dev  # Test
git push origin main
```

### Scenario 2: Template improves GSAP animation structure

```bash
git fetch template
git cherry-pick <commit-hash>  # More control than merge
# main.js may conflict - keep your animation timing but accept structural improvements
npm run dev  # Test
git push origin main
```

### Scenario 3: You want to skip a template update

```bash
# Simply don't merge that commit
# Or cherry-pick only the commits you want
git cherry-pick <commit1> <commit2>
```

## Best Practices

### When Working on Your Project

1. **Keep animation code organized** with clear comments marking customizations
2. **Test frequently** with `npm run dev` and `npm run export:video`
3. **Commit often** with descriptive messages
4. **Document custom GSAP effects** in comments for future reference

### When You Improve the Template

1. **Make changes in template repo**, not project repos
2. **Test template thoroughly** before pushing
3. **Write clear commit messages** explaining what improved
4. **Update template documentation** (TEMPLATE.md, EXPORT.md, README.md)
5. **Consider backward compatibility** - try not to break existing projects

### Merge Strategy

- **Merge frequently** - Smaller, incremental updates are easier to integrate than large changes
- **Test after every merge** - Catch issues early
- **Keep a clean commit history** - Use descriptive merge commit messages
- **Document breaking changes** - If template update requires manual intervention, document it clearly

## Troubleshooting

### "I accidentally merged template changes and broke my animation"

```bash
# Undo the merge
git reset --hard HEAD~1

# Or if you pushed already
git revert -m 1 HEAD
```

### "I can't remember which template version I'm using"

```bash
# See when you last pulled from template
git log --all --grep="template"

# Or check last merge from template
git log --merges --grep="template"
```

### "My logo.svg got overwritten during merge"

```bash
# Restore your logo from last commit
git checkout HEAD -- public/logo.svg
git commit -m "Restore project logo after template merge"
```

### "Template and project diverged too much"

If merging becomes too difficult:

1. **Manual selective update** - Copy only the files you need from template
2. **Document differences** - Note which template features you're not using
3. **Consider rebasing** - Advanced: rebase your changes onto new template base

## Support

- **Template Issues**: Report bugs/improvements in the template repository
- **Project-Specific Issues**: Debug in your project repository
- **GSAP Documentation**: https://greensock.com/docs/
- **Export Documentation**: See EXPORT.md in this repository

## Example Workflow

Here's a complete example of creating and maintaining a project:

```bash
# === CREATE PROJECT ===
# 1. Use GitHub Template button → Create "pol-mare-logo-animation"
git clone https://github.com/yourusername/pol-mare-logo-animation.git
cd pol-mare-logo-animation
git remote add template https://github.com/yourusername/gsap-logo-animation-template.git

# 2. Customize
npm install
# Replace logo, update animation, test
npm run dev
npm run export:video

# 3. Commit customizations
git add .
git commit -m "Customize for Pol Mare logo animation"
git push origin main

# === MONTHS LATER: TEMPLATE IMPROVED ===
# Template repo got better export scripts

# 4. In your project, pull template updates
git fetch template
git merge template/main
# Resolve conflicts (package.json scripts - accept new export scripts)
npm install
npm run dev
npm run export:video:8k  # New 8K export works!

# 5. Push updated project
git commit -m "Merge template updates: 8K export capability"
git push origin main

# === REPEAT FOR OTHER PROJECTS ===
# Apply same update to other logo animation projects
```

---

**Happy animating!** This template workflow scales to unlimited projects while keeping maintenance simple.
