# Troubleshooting Guide

This guide helps you diagnose and fix common issues with the Archivarix deployment system.

## Common Issues

### 1. Workflow Not Triggering

**Symptom**: After pushing changes, no workflow runs appear in Actions tab.

**Possible Causes**:
- Changes were not to the config file or workflow file
- Branch protection rules preventing Actions
- GitHub Actions disabled in repository settings

**Solutions**:
```bash
# Verify you're on the correct branch
git branch

# Verify the workflow file exists and is correct
cat .github/workflows/restore-archivarix.yml

# Check if Actions are enabled
# Go to Settings → Actions → General → Allow all actions

# Manually trigger the workflow
# Go to Actions → Restore and Deploy Archivarix Sites → Run workflow
```

### 2. Download Failed

**Symptom**: Workflow logs show "ERROR: Failed to download after 3 attempts"

**Possible Causes**:
- Invalid restoration code
- Archivarix restoration not yet complete
- Network connectivity issues
- Archive too large for timeout

**Solutions**:

1. **Verify the restoration code**:
   ```bash
   # Check the code format (should be XXXX-XXXX-XXXX-XXXX)
   cat .github/archivarix_sites.json | jq '.sites[].code'
   ```

2. **Check Archivarix status**:
   - Visit the status URL from your config
   - Ensure restoration shows "Completed" status
   - Wait if still in progress

3. **Re-run the workflow**:
   - Go to Actions tab
   - Click on the failed run
   - Click "Re-run all jobs"

4. **Test download manually**:
   ```bash
   # Remove hyphens from code
   CODE="R6IO2MK4OEI0WO26"
   curl -L -I "https://archivarix.com/get/$CODE/"
   ```

### 3. Site Shows Placeholder Page

**Symptom**: Visiting the site URL shows "Site Restoration Pending" message

**Cause**: The archive download failed during workflow execution

**Solution**:
1. Check the workflow logs for specific error messages
2. Verify the restoration is complete on Archivarix
3. Check the restoration code is correct
4. Re-run the workflow manually

### 4. GitHub Pages Not Updating

**Symptom**: Workflow succeeds but old content still displays

**Possible Causes**:
- Browser caching
- GitHub Pages deployment delay
- GitHub Pages not enabled

**Solutions**:

1. **Clear browser cache**:
   - Hard refresh: Ctrl+F5 (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or use incognito/private mode

2. **Wait for GitHub Pages**:
   - GitHub Pages can take 1-5 minutes to update
   - Check Settings → Pages for deployment status

3. **Verify GitHub Pages is enabled**:
   ```
   Go to: Settings → Pages
   Source: Deploy from a branch
   Branch: gh-pages / (root)
   ```

4. **Check deployment status**:
   - Go to Settings → Pages
   - Look for "Your site is live at..." message
   - Click "Visit site" to test

### 5. JSON Configuration Error

**Symptom**: Workflow fails with "Error parsing JSON" or similar

**Cause**: Invalid JSON syntax in archivarix_sites.json

**Solution**:

1. **Validate JSON locally**:
   ```bash
   cd /path/to/arcms
   jq empty .github/archivarix_sites.json
   ```

2. **Common JSON errors**:
   - Missing comma between objects
   - Trailing comma after last item
   - Unescaped quotes in strings
   - Missing closing brace/bracket

3. **Use JSON validator**:
   - Copy content to [jsonlint.com](https://jsonlint.com)
   - Fix reported errors
   - Commit corrected version

### 6. PHP Extension Missing

**Symptom**: Workflow fails with "Extension not available" error

**Cause**: PHP setup step missing required extensions

**Solution**: This should not happen as workflow specifies all extensions. If it does:
1. Check workflow file has correct PHP setup
2. Verify GitHub Actions not cached with old config
3. Add missing extension to `shivammathur/setup-php@v2` step

### 7. Permission Denied

**Symptom**: Workflow fails with "Permission denied" during deployment

**Possible Causes**:
- Insufficient GitHub token permissions
- Protected branch settings

**Solutions**:

1. **Check workflow permissions**:
   ```yaml
   permissions:
     contents: write
     pages: write
     id-token: write
   ```

2. **Verify branch protection**:
   - Go to Settings → Branches
   - Ensure gh-pages is not overly protected
   - Allow GitHub Actions to push

3. **Check repository settings**:
   - Settings → Actions → General
   - Workflow permissions: "Read and write permissions"

### 8. Site Content Not Loading Properly

**Symptom**: Site loads but images/CSS missing or broken links

**Possible Causes**:
- Incorrect base URL in HTML
- Missing .nojekyll file
- Jekyll processing enabled

**Solutions**:

1. **Verify .nojekyll exists**:
   - Workflow should create this automatically
   - Check gh-pages branch has .nojekyll file

2. **Check deployment settings**:
   ```yaml
   enable_jekyll: false  # Should be in workflow
   ```

3. **Inspect browser console**:
   - Open DevTools (F12)
   - Check Console for 404 errors
   - Verify resource URLs are correct

### 9. Archivarix CMS Not Working

**Symptom**: Can't access archivarix.cms.php or it shows errors

**Possible Causes**:
- GitHub Pages doesn't execute PHP
- Need to run locally or on PHP-enabled hosting

**Understanding**:
- GitHub Pages serves **static files only**
- PHP files like archivarix.cms.php won't execute
- They're included for reference and local management

**Solution** (to use Archivarix CMS):
1. Clone the repository locally
2. Run with PHP:
   ```bash
   cd deployment/sites/your-site.com
   php -S localhost:8000
   # Visit http://localhost:8000/archivarix.cms.php
   ```
3. Or deploy to PHP-enabled hosting for live management

### 10. Multiple Sites Not Appearing

**Symptom**: Only one or some sites deployed, others missing

**Possible Causes**:
- Sites marked as `"enabled": false`
- Individual download failures
- Workflow timeout

**Solutions**:

1. **Check enabled status**:
   ```bash
   jq '.sites[] | {url, enabled}' .github/archivarix_sites.json
   ```

2. **Review workflow logs**:
   - Check which sites were processed
   - Look for specific failure messages

3. **Deploy sites individually**:
   - Temporarily disable other sites
   - Run workflow for one site at a time
   - Enable others once first succeeds

## Debugging Workflow

### Enable Debug Logging

Add these secrets to your repository for verbose logs:
1. Go to Settings → Secrets and variables → Actions
2. Add: `ACTIONS_STEP_DEBUG` = `true`
3. Add: `ACTIONS_RUNNER_DEBUG` = `true`
4. Re-run workflow

### View Detailed Logs

1. Go to Actions tab
2. Click on the workflow run
3. Click on the job name
4. Expand each step to see detailed output
5. Look for ERROR or WARNING messages

### Test Configuration Locally

```bash
# Clone your repository
git clone https://github.com/yourusername/arcms.git
cd arcms

# Validate JSON
jq empty .github/archivarix_sites.json && echo "✓ Valid JSON"

# Check YAML syntax
yamllint -d relaxed .github/workflows/restore-archivarix.yml

# Test site code (remove hyphens)
CODE="R6IO2MK4OEI0WO26"
curl -I "https://archivarix.com/get/$CODE/"
```

### Manual Deployment Test

```bash
# Create test directory
mkdir -p test-deployment/sites

# Test download
CODE="R6IO2MK4OEI0WO26"
curl -L -o test-deployment/archive.zip "https://archivarix.com/get/$CODE/"

# Extract
unzip test-deployment/archive.zip -d test-deployment/sites/test-site/

# Check contents
ls -la test-deployment/sites/test-site/
```

## Getting Help

### Before Asking for Help

1. ✅ Check this troubleshooting guide
2. ✅ Review workflow logs in Actions tab
3. ✅ Validate your JSON configuration
4. ✅ Verify Archivarix restoration is complete
5. ✅ Try re-running the workflow

### Where to Get Help

1. **GitHub Issues**:
   - For issues with the deployment system
   - [Create an issue](https://github.com/cogpy/arcms/issues)

2. **Archivarix Support**:
   - For restoration-specific issues
   - Telegram: [@ArchivarixSupport](https://t.me/ArchivarixSupport)
   - Email: hello@archivarix.com

3. **GitHub Pages Support**:
   - For GitHub Pages deployment issues
   - [GitHub Support](https://support.github.com)

### Information to Include

When asking for help, provide:
- Workflow run URL (from Actions tab)
- Relevant log excerpts
- Your configuration (remove sensitive codes)
- Steps you've already tried
- Expected vs actual behavior

## Advanced Diagnostics

### Check GitHub API Rate Limits

```bash
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/rate_limit
```

### Verify Archivarix Status

```bash
# Replace with your code
CODE="R6IO2MK4OEI0WO26"
curl "https://archivarix.com/en/status/$CODE/"
```

### Test Workflow Locally (Act)

```bash
# Install act: https://github.com/nektos/act
act -j restore-and-deploy --secret-file .secrets
```

### Monitor Deployment

```bash
# Watch workflow status
gh run watch

# View latest run logs
gh run view --log

# List recent runs
gh run list --workflow=restore-archivarix.yml
```

## Prevention Tips

1. **Always validate JSON before committing**:
   ```bash
   jq empty .github/archivarix_sites.json
   ```

2. **Test restoration codes first**:
   - Visit status URL before adding to config
   - Ensure restoration shows "Completed"

3. **Start with one site**:
   - Add sites incrementally
   - Verify each works before adding more

4. **Use example config**:
   - Copy from `archivarix_sites.json.example`
   - Ensures proper structure

5. **Monitor Actions tab**:
   - Watch first deployment carefully
   - Check for any warnings

6. **Keep documentation handy**:
   - Bookmark DEPLOYMENT.md
   - Reference QUICKSTART.md for basics

## Still Stuck?

If you've tried everything and still have issues:

1. Disable all sites except one
2. Use a known working restoration code
3. Re-run the workflow
4. If that works, add sites one by one to isolate the problem
5. If that doesn't work, create a GitHub issue with full details

Remember: Most issues are configuration or timing-related. Double-check your JSON and Archivarix status first!
