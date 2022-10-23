const { FOUR_SPACE } = require('../utils/Constants');
const { replaceAll } = require('../utils/Util');

exports.template = `<div>\n${FOUR_SPACE}<h3 class="lh-1"><strong><a name=".[getter-name]" href="./#.[getter-name]">.[getter-name]</a><span class="read-only">READ-ONLY</span></strong></h3>\n${FOUR_SPACE}[getter-description]\n${FOUR_SPACE}<br><strong>Type:</strong> [getter-type-link]\n<div class="separator-line"></div>\n<br>\n</div>`;
exports.listTemplate = `<li class="docs-link"><a href="./#.[getter-name]">[getter-name]</a><span class="read-only">READ-ONLY</span></li>`;

exports.parseVars = (getterName, getterDescription, getterTypeLink) => {
    let parsed = this.template;
    parsed = replaceAll(parsed, '[getter-name]', getterName);
    parsed = replaceAll(parsed, '[getter-description]', getterDescription);
    if (getterDescription.includes('<warn>')) parsed = parsed.replace('<br>', '');
    parsed = replaceAll(parsed, '[getter-type-link]', getterTypeLink);
    return parsed;
}

exports.parseVars__list = (getterName) => {
    return replaceAll(this.listTemplate, '[getter-name]', getterName);
}
