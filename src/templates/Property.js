const { FOUR_SPACE } = require('../utils/Constants');
const { replaceAll } = require('../utils/Util');

exports.template = `<div>\n${FOUR_SPACE}<h3 class="lh-1"><strong><a name=".[property-name]" href="./#.[property-name]">.[property-name]</a></strong></h3>\n${FOUR_SPACE}[property-description]\n${FOUR_SPACE}<br><strong>Type:</strong> [property-type-link]\n<br>\n</div>`;
exports.listTemplate = `<li class="docs-link"><a href="./#.[property-name]">[property-name]</a></li>`;

exports.parseVars = (propertyName, propertyDescription, propertyTypeLink) => {
    let parsed = this.template;
    parsed = replaceAll(parsed, '[property-name]', propertyName);
    parsed = replaceAll(parsed, '[property-description]', propertyDescription);
    if (propertyDescription.includes('<warn>')) parsed = parsed.replace('<br>', '');
    parsed = replaceAll(parsed, '[property-type-link]', propertyTypeLink);
    return parsed;
}

exports.parseVars__list = (propertyName) => {
    return replaceAll(this.listTemplate, '[property-name]', propertyName);
}
