const { readFile, returnComments, readDir } = require('./readFile');
const { resolveCommentData, resolveExtendedClass, resolveClassName, resolveClassDescription } = require('./resolver');
const { writeFile, generate, mergeHTMLData } = require('./docs');

/**
 * Make the docs.
 * @param {string} fileName 
 */
exports.makeDocs = (fileName, dirName, outDir) => {
    //Read the file data
    const data = readFile(fileName, dirName);
    
    //Extract comments
    const comments = returnComments(data);
    
    //Resolve the comments
    const { properties, methods, constructor, getters } = resolveCommentData(comments, data);
    
    //Resolve className, description and extendedClass
    const extendedClass = resolveExtendedClass(data);
    const className = resolveClassName(data);
    const classDescription = resolveClassDescription(comments);
    
    const docData = {
        class: className,
        extends: extendedClass,
        description: classDescription,
        constructor: constructor,
        properties: properties,
        methods: methods,
        getters: getters
    }
    writeFile(fileName.replace('.js', ''), mergeHTMLData(generate(docData)), outDir);
}

exports.docGen = (dir, outDir) => {
    for (const file of readDir(dir)) {
        const startTime = Date.now();
        this.makeDocs(file, dir, outDir);
        const endTime = Date.now();
        console.log(`Generated docs for ${file} in ${endTime - startTime}ms`);
    }
}
