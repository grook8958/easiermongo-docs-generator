const { FOUR_SPACE } = require("../utils/Constants");
const { replaceAll, resolveBadges } = require("../utils/Util");

exports.template = `<div>\n${FOUR_SPACE}<h3 class="lh-1"><strong><a name=".[method-name]()" href="./#.[method-name]()">.[method-name]([method-param-list])</a></strong>[method-badge]</h3>\n${FOUR_SPACE}[method-description]\n${FOUR_SPACE}[method-param-table]\n${FOUR_SPACE}<strong>Returns:</strong> [method-return-link]\n${FOUR_SPACE}<div class="separator-line"></div>\n</div>`;

exports.template__example = `<div>\n${FOUR_SPACE}<h3 class="lh-1"><strong><a name=".[method-name]()" href="./#.[method-name]()">.[method-name]([method-param-list])</a></strong>[method-badge]</h3>\n${FOUR_SPACE}[method-description]\n${FOUR_SPACE}[method-param-table]\n${FOUR_SPACE}<strong>Returns:</strong> [method-return-link]\n${FOUR_SPACE}<br><br><strong>Example:</strong>\n${FOUR_SPACE}<pre class="bg-8"><code>[method-example]</code></pre>\n${FOUR_SPACE}<div class="separator-line"></div>\n</div>`;

exports.template__noparams = `<div>\n${FOUR_SPACE}<h3 class="lh-1"><strong><a name=".[method-name]()" href="./#.[method-name]()">.[method-name]()</a></strong>[method-badge]</h3>\n${FOUR_SPACE}[method-description]\n${FOUR_SPACE}<br><strong>Returns:</strong> [method-return-link]\n${FOUR_SPACE}<div class="separator-line"></div>\n</div>`

exports.template__noparams__example = `<div>\n${FOUR_SPACE}<h3 class="lh-1"><strong><a name=".[method-name]()" href="./#.[method-name]()">.[method-name]()</a></strong>[method-badge]</h3>\n${FOUR_SPACE}[method-description]\n${FOUR_SPACE}<br><strong>Returns:</strong> [method-return-link]\n${FOUR_SPACE}<br><br><strong>Example:</strong>\n${FOUR_SPACE}<pre class="bg-8"><code>[method-example]</code></pre>\n${FOUR_SPACE}<div class="separator-line"></div>\n</div>`

exports.paramListTemplate = `<span class="link-lighter">[method-params-names]</span>`;

exports.listTemplate = `<li class="docs-link"><a href="./#.[method-name]()">[method-name] [method-badge]</a></li>`;

/**
 * Parses vars
 * @param {string} methodName 
 * @param {string} methodParamList 
 * @param {string} methodDescription 
 * @param {string} methodParamTable 
 * @param {string} methodReturnLink 
 * @param {import("../utils/Util").Badges} methodBadges 
 * @returns {string}
 */
exports.parseVars = (methodName, methodParamList, methodDescription, methodParamTable, methodReturnLink, methodBadges = {}) => {
    let parsed = this.template;
    parsed = replaceAll(parsed, '[method-name]', methodName);
    parsed = replaceAll(parsed, '[method-param-list]', methodParamList);
    parsed = replaceAll(parsed, '[method-description]', methodDescription);
    parsed = replaceAll(parsed, '[method-param-table]', methodParamTable);
    parsed = replaceAll(parsed, '[method-return-link]', methodReturnLink);
    parsed = replaceAll(parsed, '[method-badge]', resolveBadges(methodBadges));
    return parsed;
}
/**
 * Parses vars
 * @param {string} methodName 
 * @param {string} methodDescription 
 * @param {string} methodReturnLink 
 * @param {import("../utils/Util").Badges} methodBadges 
 * @returns {string}
 */
exports.parseVars__noparams = (methodName, methodDescription, methodReturnLink, methodBadges) => {
    let parsed = this.template__noparams;
    parsed = replaceAll(parsed, '[method-name]', methodName);
    parsed = replaceAll(parsed, '[method-description]', methodDescription);
    parsed = replaceAll(parsed, '[method-return-link]', methodReturnLink);
    parsed = replaceAll(parsed, '[method-badge]', resolveBadges(methodBadges));
    return parsed;
}

/**
 * Parses vars
 * @param {string} methodName 
 * @param {string} methodDescription 
 * @param {string} methodReturnLink 
 * @param {string} methodExample
 * @param {import("../utils/Util").Badges} methodBadges 
 * @returns {string}
 */
exports.parseVars__noparams__example = (methodName, methodDescription, methodReturnLink, methodExample, methodBadges) => {
    let parsed = this.template__noparams__example;
    parsed = replaceAll(parsed, '[method-name]', methodName);
    parsed = replaceAll(parsed, '[method-description]', methodDescription);
    parsed = replaceAll(parsed, '[method-return-link]', methodReturnLink);
    parsed = replaceAll(parsed, '[method-example]', methodExample);
    parsed = replaceAll(parsed, '[method-badge]', resolveBadges(methodBadges));
    return parsed;
}
/**
 * Parses vars
 * @param {string} methodName 
 * @param {string} methodParamList 
 * @param {string} methodDescription 
 * @param {string} methodParamTable 
 * @param {string} methodReturnLink 
 * @param {string} methodExample
 * @param {import("../utils/Util").Badges} methodBadges 
 * @returns {string}
 */
exports.parseVars__example = (methodName, methodParamList, methodDescription, methodParamTable, methodReturnLink, methodExample, methodBadges) => {
    let parsed = this.template__example;
    parsed = replaceAll(parsed, '[method-name]', methodName);
    parsed = replaceAll(parsed, '[method-param-list]', methodParamList);
    parsed = replaceAll(parsed, '[method-description]', methodDescription);
    parsed = replaceAll(parsed, '[method-param-table]', methodParamTable);
    parsed = replaceAll(parsed, '[method-return-link]', methodReturnLink);
    parsed = replaceAll(parsed, '[method-example]', methodExample);
    parsed = replaceAll(parsed, '[method-badge]', resolveBadges(methodBadges));
    return parsed;
}

/**
 * Parses the vars
 * @param {string} methodParamsNames 
 * @returns {string}
 */
exports.parseVars__paramListTemplate = (methodParamsNames) => {
    return replaceAll(this.paramListTemplate, '[method-params-names]', methodParamsNames.join(', '));
}

/**
 * Parses the vars
 * @param {string} methodName Method name
 * @param {import("../utils/Util").Badges} methodBadges 
 * @returns {string}
 */
exports.parseVars__list = (methodName, methodBadges) => {
    let parsed = this.listTemplate;
    parsed = replaceAll(parsed, '[method-name]', methodName);
    parsed = replaceAll(parsed, '[method-badge]', resolveBadges(methodBadges));
    return parsed;
}


