const MiniCodeBlock = require("./MiniCodeBlock");
const { FOUR_SPACE, CHECKMARK_SVG_HTML } = require("../utils/Constants");
const { replaceAll } = require("../utils/Util");

exports.template = `<table class="content-table">\n${FOUR_SPACE}<thead>\n${FOUR_SPACE}${FOUR_SPACE}<tr>\n${FOUR_SPACE}${FOUR_SPACE}${FOUR_SPACE}<th>PARAMETER</th>\n${FOUR_SPACE}${FOUR_SPACE}${FOUR_SPACE}<th>TYPE</th>\n${FOUR_SPACE}${FOUR_SPACE}${FOUR_SPACE}<th>DESCRIPTION</th>\n${FOUR_SPACE}${FOUR_SPACE}</tr>\n${FOUR_SPACE}</thead>\n${FOUR_SPACE}<tbody>\n${FOUR_SPACE}${FOUR_SPACE}[param-table-params-list]\n${FOUR_SPACE}</tbody>\n</table>`;
exports.paramsListTemplate = `<tr>\n${FOUR_SPACE}<td>[param-name]</td>\n${FOUR_SPACE}<td><strong> [param-type-link]</strong></td>\n${FOUR_SPACE}<td>[param-description]</td>\n</tr>`;

exports.template__optional = `<table class="content-table">\n${FOUR_SPACE}<thead>\n${FOUR_SPACE}${FOUR_SPACE}<tr>\n${FOUR_SPACE}${FOUR_SPACE}${FOUR_SPACE}<th>PARAMETER</th>\n${FOUR_SPACE}${FOUR_SPACE}${FOUR_SPACE}<th>TYPE</th>\n${FOUR_SPACE
}${FOUR_SPACE}${FOUR_SPACE}<th>OPTIONAL</th>\n${FOUR_SPACE}${FOUR_SPACE}${FOUR_SPACE}<th>DEFAULT</th>\n${FOUR_SPACE}${FOUR_SPACE}${FOUR_SPACE}<th>DESCRIPTION</th>\n${FOUR_SPACE}${FOUR_SPACE}</tr>\n${FOUR_SPACE}</thead>\n${FOUR_SPACE}<tbody>\n${FOUR_SPACE}${FOUR_SPACE}[param-table-params-list]\n${FOUR_SPACE}</tbody>\n</table>`;
exports.paramsListTemplate__optional = `<tr>\n${FOUR_SPACE}<td>[param-name]</td>\n${FOUR_SPACE}<td><strong> [param-type-link]</strong></td>\n${FOUR_SPACE}<td>[param-is-optional]</td>\n${FOUR_SPACE}<td>[param-default]</td>\n${FOUR_SPACE}<td>[param-description]</td>\n</tr>`;

exports.parseVars = (paramTableParamsList) => {
    return replaceAll(this.template, '[param-table-params-list]', paramTableParamsList);
}

exports.parseVars__optional = (paramTableParamsList) => {
    return replaceAll(this.template__optional, '[param-table-params-list]', paramTableParamsList);
}

exports.parseVars__paramListTemplate = (paramName, paramTypeLink, paramDescription) => {
    let parsed = this.paramsListTemplate;
    parsed = replaceAll(parsed, '[param-name]', paramName);
    parsed = replaceAll(parsed, '[param-type-link]', paramTypeLink);
    parsed = replaceAll(parsed, '[param-description]', paramDescription);
    return parsed;
}

/**
 * 
 * @param {string} paramName 
 * @param {string} paramTypeLink 
 * @param {string} paramDescription 
 * @param {string} paramIsOptional 
 * @param {import("../docs").DefaultValue} paramDefault 
 * @returns {string}
 */
exports.parseVars__paramListTemplate__optional = (paramName, paramTypeLink, paramDescription, paramIsOptional, paramDefault) => {
    let parsed = this.paramsListTemplate__optional;
    parsed = replaceAll(parsed, '[param-name]', paramName);
    parsed = replaceAll(parsed, '[param-type-link]', paramTypeLink);
    parsed = replaceAll(parsed, '[param-description]', paramDescription);
    parsed = replaceAll(parsed, '[param-is-optional]', paramIsOptional ? CHECKMARK_SVG_HTML : '');
    parsed = replaceAll(parsed, '[param-default]', paramDefault ? MiniCodeBlock.parseVars(`${paramDefault.value}`) : '');
    return parsed;
}

/**<table class="content-table">
                  <thead>
                    <tr>
                      <th>PARAMETER</th>
                      <th>TYPE</th>
                      <th>DESCRIPTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>port</td>
                      <td><strong> <a target="_blank" rel="noopener" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number">number <svg preserveAspectRatio="xMidYMid meet" class="mb-1 weight-500" viewBox="0 0 24 24" width="1.3em" height="1.3em"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a></td>
                      <td>The port number.</td>
                    </tr>
                  </tbody>
                </table>*/