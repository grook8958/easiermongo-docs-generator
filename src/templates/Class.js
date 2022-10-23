const fs = require('fs');
const path = require('path');
const { FOUR_SPACE } = require('../utils/Constants');
const { replaceAll } = require('../utils/Util');

exports.template = fs.readFileSync(path.join(__dirname, 'Class.html'), { encoding: 'utf-8'}).toString();

//List Templates
exports.methodListTemplate = `<ul id="methods-dropdown-list" hide="true" class="no-dot pis-25 mt-0_5">${FOUR_SPACE}\n<!--METHODS LIST-->${FOUR_SPACE}\n[methods-list-items]\n${FOUR_SPACE}</ul>`;
exports.propertyListTemplate = `<ul id="properties-dropdown-list" hide="true" class="no-dot pis-25 mt-0_5">${FOUR_SPACE}\n<!--PROPERTIES LIST-->${FOUR_SPACE}\n[properties-list-items]\n${FOUR_SPACE}</ul>`;

/**
 * 
 * @param {string} className 
 * @param {string} classDescription 
 * @param {string} classExtends
 * @param {string} constructor 
 * @param {string} propertiesList 
 * @param {string} methodsList 
 * @param {Array<string>} properties 
 * @param {Array<string>} methods 
 * @returns {string}
 */
exports.parseVars = (className, classDescription, classExtends, constructor, propertiesList, methodsList, properties, methods) => {
    let parsed = this.template;
    parsed = replaceAll(parsed, '[class-name]', className);
    parsed = replaceAll(parsed, '[class-description]', classDescription);
    parsed = replaceAll(parsed, '[class-extends]', classExtends);
    parsed = replaceAll(parsed, '[constructor]', constructor);
    parsed = replaceAll(parsed, '[properties-list]', propertiesList);
    parsed = replaceAll(parsed, '[methods-list]', methodsList);
    parsed = replaceAll(parsed, '[properties]', properties.join('\n<div class="separator-line"></div>\n'));
    parsed = replaceAll(parsed, '[methods]', methods.join('\n'));
    return parsed;
}


/**
 * Parse the vars
 * @param {Array<string>|string} propertyListItems 
 */
 exports.parseVars__propertyListTemplate = (propertyListItems) => {
    if (Array.isArray(propertyListItems)) propertyListItems = propertyListItems.join('\n');
    return replaceAll(this.propertyListTemplate, '[properties-list-items]', propertyListItems);
}

/**
 * Parse the vars
 * @param {Array<string>|string} methodListItems 
 */
exports.parseVars__methodListTemplate = (methodListItems) => {
    if (Array.isArray(methodListItems)) methodListItems = methodListItems.join('\n');
    return replaceAll(this.methodListTemplate, '[methods-list-items]', methodListItems);
}