# Quick Start Guide: Deploying Archived Sites

This guide will help you deploy your first archived site using Archivarix codes in under 5 minutes.

## Prerequisites

- A GitHub account
- An Archivarix restoration code for your archived site
- This repository forked or cloned to your account

## Step 1: Get Your Archivarix Code

If you already have a restoration code, skip to Step 2.

1. Visit [Archivarix](https://archivarix.com)
2. Create a restoration for your archived website
3. Copy the restoration code (format: `XXXX-XXXX-XXXX-XXXX`)
4. Note the status URL for tracking

## Step 2: Add Your Site

Edit `.github/archivarix_sites.json` and add your site:

```json
{
  "sites": [
    {
      "url": "example.com",
      "code": "ABCD-1234-EFGH-5678",
      "status_url": "https://archivarix.com/en/status/ABCD1234EFGH5678/",
      "enabled": true,
      "description": "My archived website"
    }
  ],
  "config": {
    "deployment_branch": "gh-pages",
    "sites_directory": "sites"
  }
}
```

Replace:
- `example.com` with your site's domain
- `ABCD-1234-EFGH-5678` with your actual restoration code
- Update the status URL with your code (remove hyphens)
- Write a brief description

## Step 3: Commit and Push

```bash
git add .github/archivarix_sites.json
git commit -m "Add my archived site"
git push
```

## Step 4: Watch the Magic

1. Go to the **Actions** tab in your GitHub repository
2. You'll see "Restore and Deploy Archivarix Sites" running
3. Wait for it to complete (usually 2-5 minutes)

## Step 5: Access Your Site

Once the workflow completes:

- **Navigation Portal**: `https://[your-username].github.io/arcms/`
- **Your Site**: `https://[your-username].github.io/arcms/sites/example.com/`

## Adding More Sites

Just add more entries to the `sites` array:

```json
{
  "sites": [
    {
      "url": "site1.com",
      "code": "CODE-1",
      ...
    },
    {
      "url": "site2.org",
      "code": "CODE-2",
      ...
    }
  ],
  ...
}
```

Commit and push - the workflow will automatically deploy all enabled sites!

## Troubleshooting

### Workflow Failed?

Check the Actions tab for error logs. Common issues:
- Invalid restoration code
- Archivarix restoration not completed yet
- Network timeout (re-run the workflow)

### Site Not Loading?

1. Verify the workflow completed successfully
2. Clear your browser cache
3. Wait a few minutes for GitHub Pages to update
4. Check you're using the correct URL

### Need Help?

- Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed documentation
- Review the workflow logs in the Actions tab
- Contact [Archivarix Support](https://t.me/ArchivarixSupport) for restoration issues

## What's Next?

- Customize the site index appearance
- Add more archived sites
- Explore Archivarix CMS features for site editing
- Set up a custom domain for your pages

Happy archiving! 🎉
