
class Category {
    /**
     * Constructor functio for Category.
     * @param {Object} obj Values of the category.
     * @param {Number} obj.id Category id.
     * @param {String} obj.name Category name.
     * @param {String} obj.color Category color.
     * @param {String} obj.icon Category icon.
     */
    constructor({
        id, name, color, icon,
    }) {
        this.setId(id);
        this.setName(name);
        this.setColor(color);
        this.setIcon(icon);
    }

    /**
     * This function returns the category id.
     * @returns {Number} Category id.
     */
    getId() {
        return this.id;
    }

    /**
     * This function return the name of the category.
     * @returns {String} Category name.
     */
    getName() {
        return this.name;
    }

    /**
     * This function return the color of the category.
     * @returns {String} Category color.
     */
    getColor() {
        return this.color;
    }

    /**
     * This function return the icon of the category.
     * @returns {String} Category icon.
     */
    getIcon() {
        return this.icon;
    }

    /**
     * This function set the id of the category
     * if the id is not undefined.
     * @param {Number} id Category id.
     */
    setId(id) {
        if (id !== undefined) this.id = id;
    }

    /**
     * This function set the name of the category
     * if the name is not undefined.
     * @param {String} name Category name.
     */
    setName(name) {
        if (name !== undefined) this.name = name;
    }

    /**
     * This function set the category color
     * if the color is not undefined.
     * @param {String} color Category color.
     */
    setColor(color) {
        if (color !== undefined) this.color = color;
    }

    /**
     * This function set the category icon
     * if the icon is not undefined.
     * @param {String} icon Category icon.
     */
    setIcon(icon) {
        if (icon !== undefined) this.icon = icon;
    }
}

module.exports = Category;
