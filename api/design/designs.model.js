'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var designsSchema = new Schema({
  companyName: String,
  person: String,
  successNum: Number,
  phone: String,
  meta: {
      createAt: {
          type: Date,
          default: Date.now()
      },
      updateAt: {
          type: Date,
          default: Date.now()
      }
  }

});
designsSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});


module.exports = mongoose.model('designs', designsSchema);
