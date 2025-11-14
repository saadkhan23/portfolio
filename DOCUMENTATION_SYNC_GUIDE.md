# Documentation Sync Guide

**Complete reference for keeping PORTFOLIO_CONTEXT.md and design system docs in sync with code changes.**

---

## Quick Reference: The Rule

**Rule:** Keep `PORTFOLIO_CONTEXT.md` continuously aligned with actual code.

**When to update:** Every time you commit code changes to `app/`, `components/`, or `lib/`

**How to update:** Use minimal diffs—only change what actually changed in the code

---

## The Three Ways to Keep Docs Updated

### 1. Pre-Commit Hook (Automatic Reminder)
**What it does:** Reminds you when staging code changes

**How it works:**
- Every time you run `git commit`, a hook checks if code files (`app/`, `components/`, `lib/`) are being committed
- If yes, it displays a reminder with available commands
- The hook does NOT block commits—it's just a reminder

**Available commands** (run before committing):
```bash
npm run docs:files      # See what code files are staged
npm run docs:check      # Check for pending TODO/FIXME in docs
npm run docs:update     # Display the update checklist
```

**Example output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 DOCUMENTATION UPDATE CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  Code files detected in staging area.

✓ Have you updated PORTFOLIO_CONTEXT.md with:
  • New/modified components or pages
  • Design system changes
  • Typography or color updates
  • New precinct naming conventions or patterns

Run: npm run docs:files       (see what code changed)
     npm run docs:check      (check for pending TODOs)
     npm run docs:update     (view update checklist)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2. Manual Checklist (Guided Updates)
**What it does:** Provides step-by-step guidance for what to document

**File:** `DOCS_UPDATE_CHECKLIST.md` in the portfolio root

**Use it:** Before committing, open this file and work through the relevant sections:
- Component/Page Changes
- Design System Changes
- Naming Convention Changes
- Typography/Color Updates
- Zameen-Specific Changes
- Final Verification

**Example:** If you modified `SizeVsPriceSummary.tsx`:
1. Go to "Component/Page Changes" in the checklist
2. Verify component name is in PORTFOLIO_CONTEXT.md
3. Document the change (e.g., "Changed X-axis from P5 to Precinct 5")
4. Verify it's accurate
5. Commit

### 3. Global Context Sync (Batch Updates)
**What it does:** Updates all project context files at once

**How to use:**
```bash
# Update all project contexts minimally (no export)
"update all project contexts"

# Update active project AND export for ChatGPT
"sync context for ChatGPT"
```

**When to use:**
- After multiple commits with scattered changes
- Before sharing context with ChatGPT
- Periodically (weekly/monthly) to catch any drifts

---

## Documentation Update Workflow

### Workflow 1: Single File Change (Most Common)

**Scenario:** You modified `ConstructionCostChartFromData.tsx`

**Steps:**
```
1. Make code changes ✓
2. Run: npm run docs:files
   (confirms ConstructionCostChartFromData.tsx is listed)
3. Open DOCS_UPDATE_CHECKLIST.md
4. Go to "Component/Page Changes" section
5. Find the component in PORTFOLIO_CONTEXT.md
6. Update the entry with your changes
7. Review your edit (is it accurate? clear?)
8. Stage files: git add .
9. Commit: git commit -m "Update: [description]"
10. Pre-commit hook reminds you (already done!)
```

### Workflow 2: Multiple Related Changes

**Scenario:** You changed colors, typography, and chart styling all at once

**Steps:**
```
1. Make all code changes ✓
2. Run: npm run docs:files
   (see all files changed)
3. Open DOCS_UPDATE_CHECKLIST.md
4. Work through relevant sections:
   - Typography/Color Updates
   - Chart Components
   - Design System Changes
5. For each section, update PORTFOLIO_CONTEXT.md
6. Review all changes together
7. Stage and commit
8. Pre-commit hook reminds you (already done!)
```

### Workflow 3: Large Refactor (Multiple Projects)

**Scenario:** You refactored naming conventions across multiple pages

**Steps:**
```
1. Make all code changes ✓
2. Run: "update all project contexts"
   (Claude Code will scan and show diffs)
3. Review the diffs shown
4. Approve or request changes
5. Claude Code applies updates
6. Commit all updated context files
```

---

## What Should Be Documented

### Always Document:
✓ New components or pages
✓ Deleted or renamed files
✓ Major functionality changes
✓ New naming conventions
✓ Design system updates
✓ Breaking changes to data structures

### Sometimes Document:
~ Bug fixes (if they changed architecture)
~ Minor styling tweaks (if pattern wasn't established)
~ Comment-only changes (optional)

### Never Document:
✗ Whitespace changes
✗ Typo fixes (unless they're in error messages users see)
✗ Internal refactors with no behavior change

---

## PORTFOLIO_CONTEXT.md Structure Reference

When updating, remember these sections exist:

| Section | What Goes Here | How Often Updated |
|---------|---|---|
| **Project Overview** | Tech stack, primary purpose | Rarely (architecture changes only) |
| **Design System** | Colors, typography, tokens | When styles change |
| **File Structure** | Directory layout and file purposes | When files added/removed/renamed |
| **Chart Components** | Component logic and data flow | When charts are modified |
| **Zameen Narrative** | Exact narrative copy and sections | When copy changes |
| **Common Tasks** | Recurring patterns and how-tos | When new patterns emerge |
| **Version History / Changelog** | What changed and why, with date | Every meaningful commit |

---

## Example: How to Update PORTFOLIO_CONTEXT.md

### Bad Example (Vague)
```
Modified the chart components to look better
```

### Good Example (Specific)
```
**components/zameen/SizeVsPriceSummary.tsx**
- Changed X-axis labels from "P5" to "Precinct 5" (naming consistency)
- Changed bar colors from R²-based variation to solid sky blue (#0ea5e9)
- Added CustomTooltip to display: precinct name + value with "PKR/sq yd" unit
- Removed redundant text summary section below chart
- Removed text-sm class from narrative paragraph (typography consistency)
```

---

## Using Git Diff to Guide Updates

When in doubt about what changed, use:

```bash
# See staged changes
git diff --cached

# See changes since last commit
git diff HEAD

# See changes to specific file
git diff HEAD components/zameen/SizeVsPriceSummary.tsx

# See which files changed
git diff --name-only HEAD
```

Then, for each changed file, answer:
- **What changed?** (implementation detail)
- **Why?** (reasoning: consistency, feature, bug fix)
- **Does it affect:** architecture? data flow? naming conventions? other components?

If the answer to the last question is "yes," update PORTFOLIO_CONTEXT.md.

---

## Safety: How to Detect If Docs Are Out of Sync

Run:
```bash
npm run docs:check
```

This shows any `TODO`, `FIXME`, or `UPDATE ME` markers in PORTFOLIO_CONTEXT.md

If output shows markers, you have pending documentation tasks.

---

## The Golden Rule

**Before committing code, ask yourself:**

> "Would ChatGPT need to know about this change to understand my codebase?"

- **If YES:** Document it in PORTFOLIO_CONTEXT.md
- **If NO:** You probably don't need to update docs

---

## Commands at a Glance

```bash
# Check for staging code changes
npm run docs:files

# Check for pending doc TODOs
npm run docs:check

# View the full update checklist
npm run docs:update

# Update all project contexts (via Claude Code)
"update all project contexts"

# Sync active project + export for ChatGPT
"sync context for ChatGPT"
```

---

## When Things Get Complicated

### Scenario: I forgot to update docs before committing

**Solution:**
1. Update PORTFOLIO_CONTEXT.md now
2. Run: `git add PORTFOLIO_CONTEXT.md`
3. Run: `git commit --amend` (add changes to the last commit)
4. Alternatively, create a new commit for doc updates

### Scenario: I'm not sure if something needs documenting

**Solution:**
Ask: "Would ChatGPT need to know this?"
- Naming conventions? YES
- Color changes? YES
- File additions? YES
- Typo in a comment? NO
- Internal variable rename? NO

### Scenario: The context doc is completely out of sync

**Solution:**
Ask Claude Code: "Regenerate the PORTFOLIO_CONTEXT.md from scratch"

This is a last resort and should only happen if docs are severely neglected.

---

## Regular Maintenance

**Weekly:**
- Run `npm run docs:check` to catch pending TODOs

**Monthly:**
- Run `"update all project contexts"` to catch any drifts
- Review PORTFOLIO_CONTEXT.md for stale sections

**Per commit:**
- Use pre-commit hook as a reminder
- Follow DOCS_UPDATE_CHECKLIST.md for guided updates

---

## Questions?

If you're unsure what to document:
1. Check DOCS_UPDATE_CHECKLIST.md (Quick Reference table)
2. Look at examples of previous updates in this file
3. Ask: "Would ChatGPT need to know this?"
4. If stuck, ask Claude Code for guidance

---

**Last Updated:** 2025-11-13
**Version:** 1.0
**Maintenance:** Review this guide when adding new projects or major structural changes
