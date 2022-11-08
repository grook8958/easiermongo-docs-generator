const fs = require('fs');
const path = require('path');
const indent = require('indent.js');
const { Class: ClassTemplate, Property: PropertyTemplate, Link, Warn, Method: MethodTemplate, ParamTable, Getter, Constructor, MiniCodeBlock } = require('./templates');
const { OUT_DIR, FOUR_SPACE, MINI_CODE_BLOCK_TEXT_REGEX } = require('./utils/Constants');
const { highlight } = require('./utils/Util');

/**
 * Output a file
 * @param {string} fileName 
 * @param {string} data 
 * @returns 
 */
exports.writeFile = (fileName, data, outDir) => {
    const formattedData = indent.html(data, { tabString: FOUR_SPACE})
    return fs.writeFileSync(path.join(outDir || OUT_DIR, fileName + '.html'), formattedData, {
        encoding: 'utf-8',
    });
}

/**
 * @typedef {Object} Param
 * @property {string} name
 * @property {string} description
 * @property {string} type  
 * @property {false} optional 
 */

/**
 * @typedef {Object} Property
 * @property {string} name
 * @property {string} description
 * @property {string} type  
 */

/**
 * @typedef {Object} Getter
 * @property {string} name
 * @property {string} description
 * @property {string} type  
 */

/**
 * @typedef {Object} Method
 * @property {string} name
 * @property {string} description
 * @property {string} returns
 * @property {Array<Param|OptionalParam>} params
 * @property {boolean} isAsync
 * @property {boolean} isStatic
 * @property {string|null} example
 */

/**
 * @typedef {Object} OptionalParam
 * @property {string} name
 * @property {string} description
 * @property {string} type
 * @property {true} optional 
 * @property {DefaultValue} default
 */

/**
 * @typedef {Object} DefaultValue
 * @property {any} value
 * @property {string} type
 */

/**
 * @typedef {Object} Constructor
 * @property {null} name
 * @property {string} description
 * @property {Array<Param|OptionalParam} params 
 */

/**
 * @typedef {Object} DocsData
 * @property {string} class
 * @property {string|undefined} extends
 * @property {string} description 
 * @property {Array<Constructor>} constructor
 * @property {Array<Property} properties
 * @property {Array<Method>} methods
 * @property {Array<Getter>} getters
 */

/**
 * Generate the docs.
 * @param {DocsData} docsData 
 */
exports.generate = (docsData) => {
    //Sort the data into alphebetical order
    docsData.properties.sort((a, b) => a.name.localeCompare(b.name));
    docsData.methods.sort((a, b) => a.name.localeCompare(b.name));
    docsData.getters.sort((a, b) => a.name.localeCompare(b.name));

    //Parse the properties
    const HTMLPropertiesList = [];
    const HTMLProperties = docsData.properties.map(property => {
        HTMLPropertiesList.push(PropertyTemplate.parseVars__list(property.name));
        return PropertyTemplate.parseVars(property.name, this.parseDescription(property.description), new Link(property.type).link)
    });

    //Parse the methods
    const HTMLMethodsList = [];
    const HTMLMethods = docsData.methods.map(method => {
        HTMLMethodsList.push(MethodTemplate.parseVars__list(method.name));
        if (method.params.length > 0) {
            if (method.example) {
                return MethodTemplate.parseVars__example(method.name, MethodTemplate.parseVars__paramListTemplate(this.getParamsName(method.params)), this.parseDescription(method.description), this.createParamTable(method.params), new Link(method.returns).link, highlight(method.example), { static: method.isStatic, readonly: null });
            } else {
                return MethodTemplate.parseVars(method.name, MethodTemplate.parseVars__paramListTemplate(this.getParamsName(method.params)), this.parseDescription(method.description), this.createParamTable(method.params), new Link(method.returns).link, { static: method.isStatic, readonly: null });
            }
        } else {
            if (method.example) {
                return MethodTemplate.parseVars__noparams__example(method.name, this.parseDescription(method.description), new Link(method.returns).link, highlight(method.example), { static: method.isStatic, readonly: null });
            } else {
                return MethodTemplate.parseVars__noparams(method.name, this.parseDescription(method.description), new Link(method.returns).link, { static: method.isStatic, readonly: null });
            }
        }
    });

    //Parse the getters
    docsData.getters.forEach(getter => {
        HTMLProperties.push(Getter.parseVars(getter.name, getter.description, new Link(getter.type)));
        HTMLPropertiesList.push(Getter.parseVars__list(getter.name));
    });

    const HTMLConstructor = docsData.constructor.map(constructor => {
        return Constructor.parseVars(docsData.class, this.getParamsName(constructor.params, true), this.createParamTable(constructor.params));
    })[0];

    return {
        //Properties & Getters Stuff
        HTMLProperties,
        HTMLPropertiesList,

        //Methods Stuff
        HTMLMethods,
        HTMLMethodsList,

        //Constructor
        HTMLConstructor,

        HTMLClassName: docsData.class,
        HTMLClassDescription: docsData.description,
        HTMLClassExtends: docsData.extends ? docsData.extends : '',
    }
}

/**
 * @typedef {Object} HTMLData
 * @property {Array<string>} HTMLProperties 
 * @property {Array<string>} HTMLPropertiesList
 * @property {Array<string>} HTMLMethods
 * @property {Array<string>} HTMLMethodsList
 * @property {string} HTMLConstructor
 * @property {string} HTMLClassName
 * @property {string} HTMLClassDescription
 * @property {string} HTMLClassExtends
 */

/**
 * Merge the HTMLData into a single string.
 * @param {HTMLData} HTMLData 
 * @returns {string}
 */
exports.mergeHTMLData = (HTMLData) => {
    return ClassTemplate.parseVars(
        HTMLData.HTMLClassName,
        HTMLData.HTMLClassDescription,
        HTMLData.HTMLClassExtends,
        HTMLData.HTMLConstructor,
        ClassTemplate.parseVars__propertyListTemplate(HTMLData.HTMLPropertiesList),
        ClassTemplate.parseVars__methodListTemplate(HTMLData.HTMLMethodsList),
        HTMLData.HTMLProperties,
        HTMLData.HTMLMethods,
    );
}

/**
 * Parse description
 * @param {string} description
 */
exports.parseDescription = (description) => {
    if (!description.includes('{!}' || !description.includes('`'))) return description;
    const split = description.split('\n');
    for (const item of split) {
        if (item.startsWith('{!}')) {
            description = description.replace(item, `${FOUR_SPACE}${Warn.parseVars(item.replace('{!} ', ''))}`);
        }
    }
    const matches = [...description.matchAll(MINI_CODE_BLOCK_TEXT_REGEX)];
    for (const match of matches) {
        description = description.replace(match[0], MiniCodeBlock.parseVars(match[1]));
    }

    return description
}

/**
 * Return the params name into an array
 * @param {Array<Param|OptionalParam>} params 
 * @returns {Array<string>}
 */
exports.getParamsName = (params, noOptional = false) => {
    const paramNames = [];
    for (const param of params) {
        if (param.optional && noOptional === false) {
            paramNames.push(`[${param.name}]`);
        } else {
            paramNames.push(param.name);
        }
    }
    return paramNames;
}

/**
 * Create a param table
 * @param {Array<Param|OptionalParam>} params 
 */
exports.createParamTable = (params) => {
    const paramList = [];
    let isOptional = false;
    if (params.find(item => item.optional === true)) isOptional = true;
    for (const param of params) {
        if (isOptional) {
            paramList.push(ParamTable.parseVars__paramListTemplate__optional(param.name, new Link(param.type).link, param.description, param.optional, param.default));
        } else {
            paramList.push(ParamTable.parseVars__paramListTemplate(param.name, new Link(param.type).link, param.description));
        }
    }
    if (isOptional) {
        return ParamTable.parseVars__optional(paramList.join(`\n${FOUR_SPACE}${FOUR_SPACE}`))
    } else {
        return ParamTable.parseVars(paramList.join(`\n${FOUR_SPACE}${FOUR_SPACE}`))
    }
}