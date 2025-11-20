# Archivarix Sites Deployment System

This system automates the restoration and deployment of archived websites using Archivarix restoration codes.

## Overview

The deployment system enables automated restoration and hosting of multiple archived sites on GitHub Pages through a simple configuration file and GitHub Actions workflow.

## Architecture

```
[Configuration File] → [GitHub Action] → [Site Restoration] → [GitHub Pages]
         ↓                    ↓                  ↓                    ↓
  archivarix_sites.json   Workflow       Download & Extract    Multi-site Hosting
                         Orchestration    Archivarix Archives   with Navigation
```

## Components

### 1. Configuration File (`.github/archivarix_sites.json`)

The central configuration file that defines which sites to restore and deploy:

```json
{
  "sites": [
    {
      "url": "example.org",
      "code": "XXXX-XXXX-XXXX-XXXX",
      "status_url": "https://archivarix.com/en/status/XXXXXXXXXXXXXXXX/",
      "enabled": true,
      "description": "Description of the archived site"
    }
  ],
  "config": {
    "deployment_branch": "gh-pages",
    "sites_directory": "sites",
    "optimization": {
      "convert_utf8": true,
      "fix_broken_links": true,
      "remove_broken_images": true
    }
  }
}
```

### 2. Restoration Workflow (`.github/workflows/restore-archivarix.yml`)

GitHub Action that:
- Monitors changes to the configuration file
- Downloads Archivarix archives using the restoration codes
- Extracts and organizes site content
- Generates a navigation index
- Deploys everything to GitHub Pages

### 3. Site Navigation Index (`deployment/index.html`)

A dynamically-generated portal page that:
- Lists all restored sites
- Provides direct links to each site
- Shows site metadata and descriptions
- Links to Archivarix status pages

## How to Add a New Site

1. **Get your Archivarix restoration code**
   - Visit [Archivarix](https://archivarix.com)
   - Create a restoration for your archived site
   - Note the restoration code (format: `XXXX-XXXX-XXXX-XXXX`)

2. **Add site to configuration**
   
   Edit `.github/archivarix_sites.json` and add your site to the `sites` array:
   
   ```json
   {
     "url": "your-site.com",
     "code": "YOUR-REST-ORATION-CODE",
     "status_url": "https://archivarix.com/en/status/YOURRESTORATIONCODE/",
     "enabled": true,
     "description": "Brief description of your site"
   }
   ```

3. **Commit and push**
   
   ```bash
   git add .github/archivarix_sites.json
   git commit -m "Add new archived site: your-site.com"
   git push
   ```

4. **Automatic deployment**
   
   The GitHub Action will automatically:
   - Detect the configuration change
   - Download and restore your site
   - Deploy it to GitHub Pages
   - Update the navigation index

5. **Access your site**
   
   After deployment completes (check the Actions tab), access your site at:
   - Navigation portal: `https://[username].github.io/[repo]/`
   - Direct site access: `https://[username].github.io/[repo]/sites/your-site.com/`

## Manual Deployment

You can manually trigger the restoration workflow:

1. Go to the **Actions** tab in your GitHub repository
2. Select "Restore and Deploy Archivarix Sites"
3. Click "Run workflow"
4. Optionally check "Force restoration of all sites" to re-download everything

## Site Management

### Disabling a Site

Set `"enabled": false` in the configuration for any site you want to temporarily disable without removing it.

### Removing a Site

Simply remove the site entry from the `sites` array in `.github/archivarix_sites.json`.

### Updating a Site

The workflow checks Archivarix for updates. To force an update:
1. Run the workflow manually with "Force restoration" enabled, or
2. Make any change to the configuration file and push

## Directory Structure

After deployment, your GitHub Pages will have this structure:

```
gh-pages branch:
├── index.html              # Navigation portal
├── sites/
│   ├── site1.com/
│   │   ├── index.html
│   │   ├── archivarix.cms.php
│   │   └── [site content]
│   ├── site2.org/
│   │   └── [site content]
│   └── site3.net/
│       └── [site content]
└── .nojekyll              # Disables Jekyll processing
```

## Configuration Options

### Global Configuration

- `deployment_branch`: Branch to deploy to (default: `gh-pages`)
- `sites_directory`: Directory name for sites (default: `sites`)
- `archivarix_api_base`: Archivarix API endpoint

### Optimization Options

- `convert_utf8`: Convert all content to UTF-8 encoding
- `fix_broken_links`: Attempt to fix broken internal links
- `remove_broken_images`: Remove references to missing images
- `update_viewport`: Add responsive viewport meta tags

## Troubleshooting

### Site Not Deploying

1. Check the Actions tab for error messages
2. Verify your Archivarix restoration code is correct
3. Ensure the restoration is complete on Archivarix's side
4. Check that `enabled` is set to `true`

### Download Failures

If a site fails to download:
- The workflow will create a placeholder page
- Check the Archivarix status URL for the restoration status
- Verify the restoration code is valid
- Try running the workflow again (downloads are retried 3 times)

### Pages Not Updating

1. Clear your browser cache
2. Wait a few minutes for GitHub Pages to update
3. Check that the workflow completed successfully
4. Verify you're accessing the correct URL

## Advanced Usage

### Custom Domain

To use a custom domain:

1. Uncomment the CNAME creation in the workflow:
   ```yaml
   echo "your-domain.com" > deployment/CNAME
   ```

2. Configure your DNS provider:
   - Add a CNAME record pointing to `[username].github.io`
   - Or add A records for GitHub Pages IPs

3. Configure custom domain in repository Settings → Pages

### Post-Processing

The workflow includes `archivarix.cms.php` in each site directory for advanced management. You can:

- Edit content through the Archivarix CMS interface
- Run CLI commands for bulk operations
- Apply additional optimizations

### Selective Deployment

To deploy only specific sites, you can:

1. Set `"enabled": false` for sites you don't want to deploy
2. Create separate workflows for different site groups
3. Use workflow dispatch inputs to control which sites to process

## Security Considerations

- **Restoration codes**: Treat as sensitive; they provide access to your archived sites
- **Archivarix CMS**: Set passwords in `archivarix.cms.php` if you expose it
- **Repository secrets**: Store sensitive data in GitHub Secrets, not in config files
- **Public access**: Remember that GitHub Pages sites are publicly accessible

## Resources

- [Archivarix Documentation](https://archivarix.com/en/cms/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Archivarix Support](https://t.me/ArchivarixSupport)

## License

This deployment system is part of the Archivarix CMS project and follows the same license terms.

## Support

For issues specific to:
- **Archivarix CMS**: Contact Archivarix support
- **This deployment system**: Open an issue in this repository
- **GitHub Pages**: Consult GitHub documentation
