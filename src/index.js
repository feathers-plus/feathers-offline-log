// import errors from 'feathers-errors';
import makeDebug from 'debug';

const debug = makeDebug('feathers-offline-log');

export default function init () {
  debug('Initializing feathers-offline-log plugin');
  return 'feathers-offline-log';
}
