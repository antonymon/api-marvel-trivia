export default (sequelize, Sequelize) => {
    const Character = sequelize.define("character", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            notNull: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        thumbnail: {
            type: Sequelize.STRING
        }
    });

    return Character;
};