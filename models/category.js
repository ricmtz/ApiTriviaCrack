class Category {
    constructor({
        id, name, color, icon,
    }) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.icon = icon;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getColor() {
        return this.color;
    }

    getIcon() {
        return this.icon;
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setColor(color) {
        this.color = color;
    }

    setIcon(icon) {
        this.icon = icon;
    }
}

module.exports = Category;
