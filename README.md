# Archivarix CMS

Editor for restored websites

## What is Archivarix CMS

Archivarix CMS is a free compact open source flat-file CMS specially made for Wayback Machine Downloader and Website Downloader tools. The system works on SQLite and contains only one small PHP file. You do not need to create SQL database or configure something for it. Just upload the file and start working.

## Features

- **Flat-file architecture**: Single PHP file with SQLite database
- **No SQL setup required**: Works out of the box with PHP and SQLite
- **WYSIWYG Editor**: Visual editor for easy content editing
- **Search & Replace**: Advanced search with regex support
- **Import & Export**: Combine multiple restored sites
- **Rollbacks & History**: Track changes and revert modifications
- **File Management**: Add, remove, or reorganize pages and assets
- **CLI & API Support**: Command-line editing and HTTP API
- **Works alongside other CMSs**: Compatible with WordPress, Drupal, etc.

## Installation

1. Upload `archivarix.cms.php` to your web server
2. Ensure PHP has SQLite support enabled
3. Navigate to the file in your browser
4. Start editing your restored website

## Requirements

- PHP 5.6 or newer
- Required extensions: pdo_sqlite, json, pcre
- Recommended extensions: curl, dom, fileinfo, iconv, intl, libxml, zip, openssl

## Automated Deployment System

This repository includes an automated system for deploying archived sites to GitHub Pages using Archivarix restoration codes. 

### Quick Start

1. Add your Archivarix restoration codes to `.github/archivarix_sites.json`
2. Push your changes to trigger automatic deployment
3. Access your restored sites at `https://[username].github.io/arcms/`

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Features

- **Automated Restoration**: Automatically downloads and deploys sites from Archivarix codes
- **Multi-Site Support**: Host multiple archived sites in one repository
- **Navigation Portal**: Automatically generated index page for all sites
- **Zero Configuration**: Just add codes and push
- **GitHub Actions**: Fully automated deployment pipeline

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

Archivarix CMS is licensed under GNU GPLv3 - Copyright 2017-2025 Archivarix LLC