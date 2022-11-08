const { EXTERNAL_URL_MAPPER, LESS_THAN, GREATER_THAN } = require("../utils/Constants");
const DocumentURLMapper = require("../utils/DocumentURLMapper");
const { replaceAll } = require("../utils/Util");

exports = module.exports = class Link {
    constructor(baseTypes) {
        /**
         * @type {string}
         */
        this.baseTypes = baseTypes;

        /**
         * @type {{types: Array<string|Array<string>>, subSeparator: string}}
         */
        this.__resolvedTypes = this.resolveBaseTypes();

        /**
         * @type {{types: Array<string|Array<string>>, subSeparator: string}}
         */
        this.__resolvedURLTypes = this.parseURL();

        this.link = this.toHTMLLink();
    }

    /**
     * 
     * @param {string} baseTypes 
     * @returns {{types: Array<string|Array<string>>, subSeparator: string}}
     */
    resolveBaseTypes(baseTypes = this.baseTypes) {
        //Collection<number,string>
        //Array<number|boolean>
        //Promise<Array<string>>
        //number|string
        let subSeparator = null;
        //[Array, number|boolean]
        //[Promise, Array, string|number]
        const split = baseTypes.split('<').map(item => item.replace(/>/gm, ''));
        for (const item of split) {
            //[Promise, Array, [string, number]]
            if (item.includes('|')) {
                split.splice(split.indexOf(item), 1, item.split('|'));
                subSeparator = '|';
            } else if (item.includes(',')) {
                split.splice(split.indexOf(item), 1, item.split(','));
                subSeparator = ',';
            }
        }
        return {
            types: split,
            subSeparator
        }   
    }

    parseURL(resolvedTypes = this.__resolvedTypes) {
        const types = resolvedTypes.types.map(item => {
            if (Array.isArray(item)) {
                return item.map(i => { 
                    const url = Link.generateURL(i)
                    if (Object.keys(EXTERNAL_URL_MAPPER).includes(i.toLowerCase())) {
                        return Link.parseVars__external(url, i);
                    } else {
                        return Link.parseVars(url, i);
                    }
                });
            } else {
                const url = Link.generateURL(item)
                if (Object.keys(EXTERNAL_URL_MAPPER).includes(item.toLowerCase())) {
                    return Link.parseVars__external(url, item);
                } else {
                    return Link.parseVars(url, item);
                }
            }
        });
        return {
            types,
            subSeparator: resolvedTypes.subSeparator,
        }
    }

    toHTMLLink(resolvedURLTypes = this.__resolvedURLTypes) {
        let str = '';
        for (const item of resolvedURLTypes.types) {
            if (Array.isArray(item)) {
                str += `${LESS_THAN}${item.join(resolvedURLTypes.subSeparator)}`;
            } else {
                if (resolvedURLTypes.types.indexOf(item) === 0) {
                    str += item;
                } else {
                    str += `${LESS_THAN}${item}`;
                }
            }
        }
        for (let i = 0; i < resolvedURLTypes.types.length - 1; i++) {
            str += GREATER_THAN;
        }
        
        return str;
    }

    static parseVars (linkHref, linkName) {
        let parsed = Link.template;
        parsed = replaceAll(parsed, '[link-href]', linkHref);
        parsed = replaceAll(parsed, '[link-name]', linkName);
        return parsed;
    }
    
    static parseVars__external (linkHref, linkName) {
        let parsed = Link.template__external;
        parsed = replaceAll(parsed, '[link-href]', linkHref);
        parsed = replaceAll(parsed, '[link-name]', linkName); 
        return parsed;
    }

    static generateURL = (name) => {
        if (DocumentURLMapper.getDoc(name)) {
            return DocumentURLMapper.getDoc(name).href;
        } else if (Object.keys(EXTERNAL_URL_MAPPER).includes(name.toLowerCase())) {
            return EXTERNAL_URL_MAPPER[name.toLowerCase()];
        } else {
            console.log(Object.keys(EXTERNAL_URL_MAPPER))
            console.log(name.toLowerCase())
            throw new TypeError('[INVALID_TYPE] URL Type is invalid.: ' + name)
        }
    }

    static get template() {
        return `<a href="[link-href]">[link-name]</a>`;
    }

    static get template__external() {
        return `<a target="_blank" rel="noopener" href="[link-href]">[link-name] <svg preserveAspectRatio="xMidYMid meet" class="mb-1 weight-500" viewBox="0 0 24 24" width="1.3em" height="1.3em"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>`;        
    }
}

/**
 * 
 * @param {string} name 
 * @returns 
 */
exports.new = (name) => {
    
    ['Array', '<', 'number', '|', 'boolean', '>']
    if (name.includes('|')) {
        const names = name.split('|');
        const html = [];
        for (const itemName of names) {
            html.push(this.new(itemName.replace(/>/gm, '')))
        }
        return html.join('|');
    } else if (name.includes(',')) {
        const names = name.split(',');
        const html = [];
        for (const itemName of names) {
            console.log(itemName)
            html.push(this.new(itemName.replace(/>/gm, '')))
        }
        return html.join(',');
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
