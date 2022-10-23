/**
 * SomeClass of random
 */
class someClass {
    /**
     * The constructor of someClass
     * @param {Object} data The data to use
     */
    constructor(data = {}) {
        /**
         * The data
         * * Ohoh! Beware!
         * @type {MongoChange}
         */
        this.data = data;

        /**
         * Whether this class is active
         * @type {boolean}
         */
        this.isActive = false;
    }

    /**
     * The method of name
     * * Oh Oh bEware!!
     * @param {string} name The name
     * @param {number} age The age
     * @returns {string}
     * @example
     * const someClass = new someClass({})
     *     .method()
     */
    static async method(name = 'John', age = 48) {
        return "Name is: " + name + '(' + age + ')'
    }

    /**
     * Get some data
     * @param {string} name The name of this data
     * @param {boolean} force Wether to skip cache
     * @returns {MongoDocument}
     */
    async get(name, force = false) {
        return undefined;
    }

    /**
     * Returns an JSON representation of this class 
     * @returns {Object}
     */
    toJSON() {
        return {
            data: this.data,
            someProp: this.someProp,
        }
    }

    /**
     * A prop
     * @type {string}
     */
    get someProp() {
        return 'hi'
    }
}