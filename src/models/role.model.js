const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        enum: ['user', 'teacher', 'admin'],
        required: true
    }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;