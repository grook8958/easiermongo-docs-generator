const { FOUR_SPACE } = require("../utils/Constants");
const { replaceAll } = require("../utils/Util");

exports.template = `<warn><p class="title">WARNING</p><p class="body">[warn-text]</p></warn>`;

exports.parseVars = (text) => {
    return replaceAll(this.template, '[warn-text]', text);
}