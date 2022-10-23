const Constants = require('./utils/Constants');
const { getBetween, getAfter, resolveType } = require('./utils/Util');

exports.resolveCommentData = (comments, data) => {
    const properties = [];
    const methods = [];
    const constructor = [];
    const getters = [];

    for (const comment of comments) {
        if (!comment.parent) continue;
        if (comment.parent.type === 'Property') {
            let description = comment.value.split('\r\n')[1];
            for (let i = 2; i < comment.value.split('\r\n').length; i++) {
                if (!comment.value.split('\r\n')[i].startsWith('@type')) {
                    description += '\n' + comment.value.split('\r\n')[i].replace('*', Constants.DESCRIPTION_WARN_MARKER);
                } else {
                    continue;
                }
            }
            properties.push({
                name: comment.parent.name,
                type: comment.value.match(Constants.PROPERTY_TYPE_REGEX)[0].replace('@type {', '').replace('}', ''),
                description: description
            });
        } else if (comment.parent.type === 'Method') {
            let description = comment.value.split('\r\n')[1];
            for (let i = 2; i < comment.value.split('\r\n').length; i++) {
                if (!comment.value.split('\r\n')[i].startsWith('@') && comment.value.split('\r\n')[i].startsWith('*')) {
                    description += '\n' + comment.value.split('\r\n')[i].replace('*', Constants.DESCRIPTION_WARN_MARKER);
                } else {
                    continue;
                }
            }
            const matches = comment.value.match(Constants.METHOD_PARAM_REGEX);
            const params = [];
            if (matches) {
                for (const match of matches) {
                    const lnData = data.split('\r\n');
                    let isOptional = false;
                    let defaultValue = null;
                    const paramFunc = getBetween(lnData[comment.loc.end.line], '(', ')').split(',')[matches.indexOf(match)].trim()
                        if (paramFunc.includes('=')) {
                            if (getAfter(paramFunc, '=')) {isOptional = true; defaultValue = { value: resolveType(getAfter(paramFunc, '=').trim())}}
                        }   
                        
                    const split = match.split(' ')
                    split.shift();
                    const param = {
                        name: split[1],
                        type: split[0].replace('{', '').replace('}', ''),
                        description: match.match(Constants.METHOD_PARAM_REGEX_2)[3],
                        optional: isOptional,
                    }
                    if (isOptional) {
                        param.default = defaultValue;
                    }
                    params.push(param);
    
                }
            }
            let methodName = comment.parent.name;
            let isAsync = false;
            let isStatic = false;
            if (methodName.startsWith('static async')) {isAsync = true; isStatic = true; methodName = methodName.replace('static async ', '')}
            else if (methodName.startsWith('async')) {isAsync = true; methodName = methodName.replace('async ', '')}
            else if (methodName.startsWith('static')) {isStatic = true; methodName = methodName.replace('static ', '')}

            let example = null;
            const split = comment.value.split('\r\n');
            split.forEach(element => {
                const match = element.match(Constants.METHOD_EXAMPLE_REGEX);
                if (match) {
                    return example =  split.slice(split.indexOf(match[0]) + 1).join('\n')
                }
            });

            methods.push({
                name: methodName,
                description: description,
                returns : comment.value.match(Constants.METHOD_RETURN_REGEX)[1],
                params: params,
                isAsync,
                isStatic,
                example: example,
            })
        } else if (comment.parent.type === 'Constructor') {
            const matches = comment.value.match(Constants.METHOD_PARAM_REGEX);
            const params = [];
            for (const match of matches) {
                const lnData = data.split('\r\n');
                    let isOptional = false;
                    for (const param of getBetween(lnData[comment.loc.end.line], '(', ')').split(',')) {
                        if (param.includes('=')) {
                            if (getAfter(param, '=')) isOptional = true;
                        }   
                    }
                const split = match.split(' ')
                split.shift();
                params.push({
                    name: split[1],
                    type: split[0].replace('{', '').replace('}', ''),
                    description: split.slice(2).join(' '),
                    optional: isOptional,
                });
            }

            constructor.push({
                name: null,
                description: comment.value.split('\r\n')[1],
                params: params,
            })
        } else if (comment.parent.type === 'Getter') {
            let description = comment.value.split('\r\n')[1];
            for (let i = 2; i < comment.value.split('\r\n').length; i++) {
                if (!comment.value.split('\r\n')[i].startsWith('@type')) {
                    description += '\n' + comment.value.split('\r\n')[i].replace('*', Constants.DESCRIPTION_WARN_MARKER);
                } else {
                    continue;
                }
            }
            let getterName = comment.parent.name;
            getters.push({
                name: getterName,
                type: comment.value.match(Constants.PROPERTY_TYPE_REGEX)[0].replace('@type {', '').replace('}', ''),
                description: description,
            });
        }
    }
    return { methods, properties, constructor, getters }
}

exports.resolveExtendedClass = (data) => {
    /* Returns undefined if none as null could be used for extending classes */
    if (data.match(Constants.EXTEND_CLASS_REGEX)) return data.match(Constants.EXTEND_CLASS_REGEX)[1];
    else return undefined;
}

exports.resolveClassName = (data) => {
    if (data.match(Constants.CLASS_NAME_REGEX)) return data.match(Constants.CLASS_NAME_REGEX)[1];
    else return null;
}

exports.resolveClassDescription = (comments) => {
    return comments[0].value.replace('\n', '').trim()
}