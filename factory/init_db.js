const Factory = require('./factory');
const { Category } = require('../models');

const categories = [
    new Category({ name: 'Web', color: 'Blue', icon: 'web.jpg' }),
    new Category({ name: 'DB', color: 'Red', icon: 'db.jpg' }),
    new Category({ name: 'History', color: 'Yellow', icon: 'history.jpg' }),
    new Category({ name: 'Programming', color: 'Green', icon: 'programming.jpg' }),
    new Category({ name: 'IA', color: 'Purple', icon: 'ia.jpg' }),
    new Category({ name: 'Algorithmics', color: 'Orange', icon: 'algorithm.jpg' }),
];

console.log(categories);
