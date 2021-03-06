/**
 * Represents a plugin warning. It can be created using Node#warn().
 */
export default class Warning {

    /**
     * @param {string} warning message
     * @param {Object} warning options
     * @param {number}
     */
    constructor(text, opts = { }) {
        this.type = 'warning';
        this.text = text;

        if ( opts.node && opts.node.source ) {
            let pos     = opts.node.positionBy(opts);
            this.line   = pos.line;
            this.column = pos.column;
        }

        for ( let opt in opts ) this[opt] = opts[opt];
    }

    toString() {
        if ( this.node ) {
            return this.node.error(this.text, {
                plugin: this.plugin,
                index:  this.index,
                word:   this.word
            }).message;
        } else if ( this.plugin ) {
            return this.plugin + ': ' + this.text;
        } else {
            return this.text;
        }
    }

}
