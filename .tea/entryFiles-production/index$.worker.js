
require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../pages/home/home');
require('../../pages/message/message');
require('../../pages/mine/mine');
require('../../pages/list/list');
require('../../pages/detail/detail');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
