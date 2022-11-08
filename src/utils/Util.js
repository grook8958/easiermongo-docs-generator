const hljs = require('highlight.js');
const { HTMLBadges } = require('./Constants');

/**
 * Resolves the Buffer into a string
 * @param {Buffer} data 
 * @returns 
 */
exports.dataToString = (data) => {
    return data.toString();
}

/**
 * Matches a substring bewteen two characters.
 * @param {string} string 
 * @param {string} char1 
 * @param {string} char2 
 * @returns 
 */
exports.getBetween = (string, char1, char2) => {
    return string.substring(
        string.indexOf(char1) + 1, 
        string.lastIndexOf(char2)
    );    
}

exports.getAfter = (string, char) => {
    return string.substring(string.indexOf(char) + 1);
}

/**
 * Replace all the content of a string (using [])
 * @param {string} string 
 * @param {string} search 
 * @param {string} replace 
 * @returns 
 */
exports.replaceAll = (string, search, replace) => {
    if (search.includes('[')) {
        search = search.replace('[', '').replace(']', '')
        const regex = new RegExp(`\\[${search}\\]`, 'gm');
        return string = string.replace(regex, replace);
    }
}

/**
 * 
 * @param {string} string 
 */
exports.highlight = (string) => {
   const code = hljs.default.highlight(string, { language: 'javascript' }).value;
   return code.split('\n').join('<br>');
}

/**
 * @typedef {Object} Badges
 * @property {boolean|null} static
 * @property {boolean|null} readonly
 */

/**
 * Resolved a Badge into a HTLMBadge
 * @param {Badges} badges
 * @returns {string}
 */
exports.resolveBadges = (badges = {}) => {
    const resolved = [];
    for (const key of Object.keys(badges)) {
        if (badges[key] === true) {
            resolved.push(HTMLBadges[key]);
        }
    }
    return resolved.join('');
}

exports.resolveType = (string) => {
    string = string.trim();
    const boolConvert = {
        'true': true,
        'false': false,
    }
    if (string.startsWith('\'')) return string;
    if (Number(string) && !Number.isNaN(Number(string))) {
        return Number(string);
    } else if (string === {}) {
        return String({});
    } else if (boolConvert[string]) {
        return boolConvert[string];
    } else {
        return string
    }
} 