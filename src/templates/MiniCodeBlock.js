const { replaceAll } = require("../utils/Util");

exports.template = `<span class="mini-code-block">[text]</span>`;

/**
 * 
 * @param {string} text 
 * @returns {string}
 */
exports.parseVars = (text) => {
    return replaceAll(this.template, '[text]', text.trim());
}