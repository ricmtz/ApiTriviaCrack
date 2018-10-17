// FIXME Todos los métodos deben estar documentados

class Category {
    constructor({
        id, name, color, icon,
    }) {
        this.setId(id);
        this.setName(name);
        this.setColor(color);
        this.setIcon(icon);
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
        if (id !== undefined) this.id = id;
    }

    setName(name) {
        if (name !== undefined) this.name = name;
    }

    setColor(color) {
        if (color !== undefined) this.color = color;
    }

    setIcon(icon) {
        if (icon !== undefined) this.icon = icon;
    }
}

module.exports = Category;
