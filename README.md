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

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

Archivarix CMS is licensed under GNU GPLv3 - Copyright 2017-2025 Archivarix LLC