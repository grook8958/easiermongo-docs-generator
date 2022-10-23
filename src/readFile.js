const fs = require('fs');
const path = require('path');
const Constants = require('./utils/Constants');
const Util = require('./utils/Util');
const extractComments = require('extract-comments');

exports.readDir = (dirName = Constants.IN_DIR) => {
    return fs.readdirSync(dirName);
}

exports.readFile = (fileName, dirName) => {
    if (!fileName.endsWith('.js')) fileName += Constants.DEFAULT_EXTENSION;
    const data = Util.dataToString(fs.readFileSync(path.join(dirName || Constants.IN_DIR, fileName)));
    return data;
}

exports.linePerLine = (data, callback = (line, lnNumber, lnArray) => {}) => {
    const dataArray = data.split('\r\n');
    for (const line of dataArray) {
        callback(line, dataArray.indexOf(line), dataArray);
    }
    return dataArray;
}

exports.returnComments = (data) => {
    const comments = extractComments(data).filter(comment => comment.type === "BlockComment");
    const lnArray = this.linePerLine(data);
    for (const comment of comments) {
        const line = lnArray[comment.loc.end.line];
        let parent;
        if (line.includes('constructor')) parent = { type: 'Constructor', name: null }
        else if (Constants.METHOD_REGEX.test(line) && !line.trim().startsWith('get ')) parent = { type: 'Method', name: line.match(Constants.METHOD_REGEX)[0].trim().replace('(', '')}
        else if (Constants.PROPERTY_REGEX.test(line)) parent = { type: 'Property', name: line.match(Constants.PROPERTY_REGEX)[0].trim().replace('this.', '')}
        else if (line.trim().startsWith('get ')) parent = { type: 'Getter', name: line.match(Constants.GETTER_REGEX)[1]}

        comment.parent = parent;
    }
    return comments
}

