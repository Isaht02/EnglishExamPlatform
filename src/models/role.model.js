const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        required: true,
        default: 'student'
    }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;