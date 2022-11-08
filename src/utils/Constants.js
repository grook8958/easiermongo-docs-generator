

exports.IN_DIR = './js';
exports.OUT_DIR = './out';

exports.DEFAULT_EXTENSION = '.js';
exports.TYPED_COMMENT_START = '/**';
exports.TYPED_COMMENT_END = '*/';
exports.METHOD_REGEX = /(.+\()/gm;
exports.PROPERTY_REGEX = /this\.\w+/gm;
exports.GETTER_REGEX= /get\ (\w+)/m;
exports.PROPERTY_TYPE_REGEX = /@type {.+}/gm;
exports.METHOD_PARAM_REGEX = /@param {(.+)}(.+)/gm;
exports.METHOD_PARAM_REGEX_2 = /@param {(.+)} (\w*) (.+)/m;
exports.METHOD_RETURN_REGEX = /@returns {(.+)}/m;
exports.EXTEND_CLASS_REGEX = /extends\ (\w+)/m;
exports.CLASS_NAME_REGEX = /class\ (\w+)/m;
exports.DESCRIPTION_WARN_MARKER = '{!}';
exports.METHOD_EXAMPLE_REGEX = /(@example)/gm;
exports.MINI_CODE_BLOCK_TEXT_REGEX = /\`(?<text>.*?)\`/gm;

exports.CHECKMARK_SVG_HTML = '<svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em" class="h-5 w-5 mx-auto" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 13l4 4L19 7"></path></svg>';

exports.FOUR_SPACE = '    ';

exports.LESS_THAN = '&lt;';
exports.GREATER_THAN = '&gt;';

exports.EXTERNAL_URL_MAPPER = {
    array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
    promise: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
    string: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String',
    number: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number',
    boolean: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean',
    object: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object',
    undefined: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined',
    null: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null',
    void: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void',

    eventemitter: 'https://nodejs.org/dist/latest/docs/api/events.html#events_class_eventemitter',
    model: 'https://mongoosejs.com/docs/api/model.html',
    collection: 'https://discord.js.org/#/docs/collection/main/class/Collection',
};

exports.baseURL__v2 = 'https://easiermongo.js.org/docs/v2';

exports.HTMLBadges = {
    static: '<span class="static"><strong>STATIC</strong></span>',
    readonly: '<span class="read-only"><strong>READ-ONLY</strong></span>'
};

