const { replaceAll } = require("../utils/Util")

exports.template = `<pre class="fs-08em"><code><span class="hljs-keyword">new</span> <span class="hljs-name">[class-name]</span>([constructor-params-list]);</code></pre>\n[constructor-params-table]`

/**
 * Parse the vars
 * @param {string} className 
 * @param {string} constructorParamsList 
 * @param {string} constructorParamTable 
 * @returns 
 */
exports.parseVars = (className, constructorParamsList, constructorParamTable) => {
    let parsed = this.template;
    parsed = replaceAll(parsed, '[class-name]', className);
    parsed = replaceAll(parsed, '[constructor-params-list]', constructorParamsList);
    parsed = replaceAll(parsed, '[constructor-params-table]', constructorParamTable);
    return parsed;
}