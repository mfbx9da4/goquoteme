const log = require('log-with-style');

// turn this off to stop poluting window
const KEEP_DATA_IN_WINDOW = true;

const logger = (prefix, color, name, data) => {
  const style = 'color: ' + color + ';' +
              'font-weight: bold;' +
              'background: black;' +
              'padding-left:5px;' +
              'padding-right:5px;';
  const kvps = [];
  if (typeof data !== 'undefined') {
    if (KEEP_DATA_IN_WINDOW) {
      window[name] = data;
    }
    if (typeof data === 'object') {
      Object.keys(data).forEach((k) => {
        const val = data[k];
        let printVal = '';
        if (typeof val === 'string' ||
            typeof val === 'number' ||
            typeof val === 'boolean') {
          printVal = val;
        } else {
          printVal = '\u{2026}';
        }
        // cheeky replacement of underscores to avoid markdown bugs
        const pKey = k.replace(/_/g, '@');
        const pVal = ('' + printVal).replace(/_/g, 'X');
        kvps.push(
          '[c="color:white; background:black; padding-left:5px;"]' +
            pKey +
          '[c]' +
          '[c="color:grey; background:black;"]:[c]' +
          '[c="color:orange; background:black; padding-right:5px;"]' +
            pVal +
          '[c]'
        );
      });
    } else {
      // cheeky replacement of underscores to avoid markdown bugs
      const pKey = 'arg';
      const pVal = ('' + data).replace(/_/g, 'X');
      kvps.push(
        '[c="color:white; background:black; padding-left:5px;"]' +
          pKey +
        '[c]' +
        '[c="color:grey; background:black;"]:[c]' +
        '[c="color:orange; background:black; padding-right:5px;"]' +
          pVal +
        '[c]'
      );
    }
  }
  log(prefix + ': [c="' + style + '"]' + name + '[c]' + kvps.join(''));
};

module.exports = logger;
