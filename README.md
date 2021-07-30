# Taskana
## Asana Official Version
There is now an official Asana for Desktop app available for MacOS & Windows... but this version is still actively maintained.

The new [official version](https://forum.asana.com/t/asana-for-desktop-now-available-for-early-access/120008) also runs inside Election. Some of the difference are:
- Taskana handles file downloads better
- Asana for Desktop has Native OS notifications
- Asana for Desktop has a Windows executable
- Asana for Desktop uses "In-browser authentication" every session (you need to bounce between the app and your default browser) - Taskana logs you in directly

![Taskana Tasks sample image](https://raw.githubusercontent.com/mountainash/taskana/develop/build/screenshot.png)

See website for tips:
- https://mountainash.github.io/taskana/

## Download

- https://github.com/mountainash/taskana/releases

## Development

Clone the repository into a folder on your system and be sure to have Node.js installed.

```sh
npm install
```

### Run

To run Taskana in development mode run the following command:

```sh
npm start
```

### Build

To build and ship Taskana run the following command:

```sh
npm run build
```

Builds the app for OS X, Linux, and Windows, using [electron-builder](https://github.com/electron-userland/electron-builder).

## License

MIT

## Credits

Originally forked from https://github.com/kreativgebiet/taskana (now archived)