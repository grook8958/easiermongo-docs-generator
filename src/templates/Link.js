const { EXTERNAL_URL_MAPPER, LESS_THAN, GREATER_THAN } = require("../utils/Constants");
const DocumentURLMapper = require("../utils/DocumentURLMapper");
const { replaceAll } = require("../utils/Util");

exports.template = `<a href="[link-href]">[link-name]</a>`;
exports.template__external = `<a target="_blank" rel="noopener" href="[link-href]">[link-name] <svg preserveAspectRatio="xMidYMid meet" class="mb-1 weight-500" viewBox="0 0 24 24" width="1.3em" height="1.3em"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>`;

exports.generateURL = (name) => {
    if (DocumentURLMapper.getDoc(name)) {
        return DocumentURLMapper.getDoc(name).href;
    } else if (Object.keys(EXTERNAL_URL_MAPPER).includes(name.toLowerCase())) {
        return EXTERNAL_URL_MAPPER[name];
    } else throw new TypeError('[INVALID_TYPE] URL Type is invalid.')
}

exports.parseVars = (linkHref, linkName) => {
    let parsed = this.template;
    parsed = replaceAll(parsed, '[link-href]', linkHref);
    parsed = replaceAll(parsed, '[link-name]', linkName);
    return parsed;
}

exports.parseVars__external = (linkHref, linkName) => {
    let parsed = this.template__external;
    parsed = replaceAll(parsed, '[link-href]', linkHref);
    parsed = replaceAll(parsed, '[link-name]', linkName); 
    return parsed;
}

/**
 * 
 * @param {string} name 
 * @returns 
 */
exports.new = (name) => {
    if (name.includes('|')) {
        const names = name.split('|');
        const html = [];
        for (const itemName of names) {
            html.push(this.new(itemName))
        }
        return html.join('|');
    } else if (name.includes('<')) {
        const names = name.replace(/>/gm, '')
        const arrNames = names.split('<');
                
        const html = [];
        for (const itemName of arrNames) {
            const link = this.generateURL(itemName.toLowerCase());
            if (Object.keys(EXTERNAL_URL_MAPPER).includes(itemName.toLowerCase())) {
                html.push(this.parseVars__external(link, itemName));
            } else {
                html.push(this.parseVars(link, itemName));
            }
        }
        let strGreaterThans = ''
        for (let i = 1; i < arrNames.length; i++) strGreaterThans += GREATER_THAN
        let str = html.join(LESS_THAN);
        const regex = new RegExp('(<\/a>)$', 'gm');
        str = str.replace(regex, '');
        str += `${strGreaterThans}</a>`
        return str;
    } else {
        const link = this.generateURL(name)
        if (Object.keys(EXTERNAL_URL_MAPPER).includes(name.toLowerCase())) {
            return this.parseVars__external(link, name);
        } else {
            return this.parseVars(link, name);
        }
    }
}