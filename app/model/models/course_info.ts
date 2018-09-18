/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('course', {
    cid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cname: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0'
    },
    ccredit: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    semester: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    period: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'course'
  });
};
