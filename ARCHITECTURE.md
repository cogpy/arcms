# System Architecture

## Archivarix Deployment Automation Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERACTION                            │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  1. Edit .github/archivarix_sites.json                              │
│     • Add restoration code (XXXX-XXXX-XXXX-XXXX)                    │
│     • Set site metadata (url, description, etc.)                    │
│     • Enable/disable sites                                          │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  2. Git Commit & Push                                               │
│     • Triggers GitHub Actions on main branch                        │
│     • Watches for changes to config file                            │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  3. GitHub Actions Workflow: restore-archivarix.yml                 │
│                                                                     │
│     ┌─────────────────────────────────────────────────────┐        │
│     │ Setup Environment                                   │        │
│     │ • Checkout repo                                     │        │
│     │ • Setup PHP 8.2 with extensions                     │        │
│     │ • Validate JSON configuration                       │        │
│     └─────────────────────────────────────────────────────┘        │
│                         │                                           │
│                         ▼                                           │
│     ┌─────────────────────────────────────────────────────┐        │
│     │ Parse Configuration                                 │        │
│     │ • Read archivarix_sites.json                        │        │
│     │ • Extract site codes and metadata                   │        │
│     │ • Filter enabled sites                              │        │
│     └─────────────────────────────────────────────────────┘        │
│                         │                                           │
│                         ▼                                           │
│     ┌─────────────────────────────────────────────────────┐        │
│     │ Download Archives (for each site)                   │        │
│     │ • Fetch from archivarix.com/get/{code}/             │        │
│     │ • Retry up to 3 times on failure                    │        │
│     │ • Create placeholder if download fails              │        │
│     └─────────────────────────────────────────────────────┘        │
│                         │                                           │
│                         ▼                                           │
│     ┌─────────────────────────────────────────────────────┐        │
│     │ Extract & Organize                                  │        │
│     │ • Unzip archives to deployment/sites/{url}/         │        │
│     │ • Copy archivarix.cms.php to each site              │        │
│     │ • Create site metadata JSON                         │        │
│     └─────────────────────────────────────────────────────┘        │
│                         │                                           │
│                         ▼                                           │
│     ┌─────────────────────────────────────────────────────┐        │
│     │ Generate Navigation Index                           │        │
│     │ • Create beautiful HTML portal                      │        │
│     │ • List all restored sites                           │        │
│     │ • Add links and metadata                            │        │
│     │ • Inject site data via JavaScript                   │        │
│     └─────────────────────────────────────────────────────┘        │
│                         │                                           │
│                         ▼                                           │
│     ┌─────────────────────────────────────────────────────┐        │
│     │ Deploy to GitHub Pages                              │        │
│     │ • Push to gh-pages branch                           │        │
│     │ • Force orphan commit (clean history)               │        │
│     │ • Disable Jekyll processing                         │        │
│     └─────────────────────────────────────────────────────┘        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  4. GitHub Pages Serves Content                                     │
│                                                                     │
│     https://[user].github.io/[repo]/                                │
│     ├── index.html (Navigation Portal)                              │
│     └── sites/                                                      │
│         ├── livingneighborhoods.org/                                │
│         │   ├── index.html                                          │
│         │   ├── archivarix.cms.php                                  │
│         │   └── [restored content]                                  │
│         ├── patternlanguage.com/                                    │
│         └── iwritewordsgood.com/                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  5. USER ACCESS                                                     │
│     • Visit navigation portal                                       │
│     • Browse restored sites                                         │
│     • Access Archivarix CMS for editing                             │
└─────────────────────────────────────────────────────────────────────┘

## Data Flow

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Developer   │────▶│    GitHub    │────▶│  Archivarix  │
│  (Git Push)  │     │   Actions    │     │    API       │
└──────────────┘     └──────────────┘     └──────────────┘
                             │                     │
                             │                     ▼
                             │            ┌──────────────┐
                             │            │   Archive    │
                             │            │  Download    │
                             │            └──────────────┘
                             │                     │
                             ▼                     │
                     ┌──────────────┐             │
                     │  Deployment  │◀────────────┘
                     │  Processing  │
                     └──────────────┘
                             │
                             ▼
                     ┌──────────────┐
                     │ GitHub Pages │
                     │  (gh-pages)  │
                     └──────────────┘
                             │
                             ▼
                     ┌──────────────┐
                     │   End User   │
                     │  (Browser)   │
                     └──────────────┘

## Configuration Schema

```json
{
  "sites": [                          // Array of sites to restore
    {
      "url": "string",                // Domain name
      "code": "XXXX-XXXX-XXXX-XXXX",  // Archivarix restoration code
      "status_url": "string",         // Archivarix status page URL
      "enabled": boolean,             // Enable/disable this site
      "description": "string"         // Human-readable description
    }
  ],
  "config": {                         // Global configuration
    "deployment_branch": "string",    // Target branch (default: gh-pages)
    "sites_directory": "string",      // Directory for sites (default: sites)
    "archivarix_api_base": "string",  // API endpoint
    "optimization": {                 // Post-processing options
      "convert_utf8": boolean,
      "fix_broken_links": boolean,
      "remove_broken_images": boolean,
      "update_viewport": boolean
    }
  }
}
```

## Error Handling

```
Download Failed?
     │
     ├─ Retry 1 (after 5s delay)
     │      │
     │      └─ Success? → Extract
     │
     ├─ Retry 2 (after 5s delay)
     │      │
     │      └─ Success? → Extract
     │
     └─ Retry 3 (after 5s delay)
            │
            ├─ Success? → Extract
            │
            └─ Failed → Create Placeholder Page
                        (with status link)
```

## Security Model

- **No Credentials in Code**: All Archivarix codes in config file
- **Public Read-Only Access**: GitHub Pages serves static content
- **Optional CMS Protection**: Set password in archivarix.cms.php
- **IP Restrictions**: Configure in CMS constants
- **GitHub Secrets**: Use for sensitive API keys (not needed for public archives)

## Performance Characteristics

- **Workflow Duration**: 2-5 minutes per site (network dependent)
- **Concurrent Processing**: Serial (one site at a time)
- **Retry Logic**: 3 attempts with 5s delays
- **Memory**: 512MB PHP limit
- **File Size**: Unlimited (GitHub Pages: 1GB per site, 100GB per repo)

## Extensibility Points

1. **Custom Post-Processing**: Add steps after extraction
2. **Multiple Workflows**: Create variant workflows for different site groups
3. **Custom Index**: Modify HTML template generation
4. **Notification Hooks**: Add Discord/Slack notifications on completion
5. **Analytics Integration**: Inject tracking codes during deployment
