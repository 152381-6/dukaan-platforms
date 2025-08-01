const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
      type: String,
          required: true
            },
              email: {
                  type: String,
                      required: true,
                          unique: true
                            },
                              password: {
                                  type: String,
                                      required: true
                                        },
                                          role: {
                                              type: String,
                                                  enum: ['admin', 'store_owner', 'delivery_company', 'customer'],
                                                      default: 'customer'
                                                        },
                                                          store: {
                                                              type: mongoose.Schema.Types.ObjectId,
                                                                  ref: 'Store'
                                                                    },
                                                                      company: {
                                                                          type: mongoose.Schema.Types.ObjectId,
                                                                              ref: 'DeliveryCompany'
                                                                                },
                                                                                  createdAt: {
                                                                                      type: Date,
                                                                                          default: Date.now
                                                                                            }
                                                                                            });

                                                                                            // تشفير كلمة المرور قبل الحفظ
                                                                                            userSchema.pre('save', async function(next) {
                                                                                              if (!this.isModified('password')) {
                                                                                                  next();
                                                                                                    }
                                                                                                      
                                                                                                        const salt = await bcrypt.genSalt(10);
                                                                                                          this.password = await bcrypt.hash(this.password, salt);
                                                                                                          });

                                                                                                          // مقارنة كلمات المرور
                                                                                                          userSchema.methods.matchPassword = async function(enteredPassword) {
                                                                                                            return await bcrypt.compare(enteredPassword, this.password);
                                                                                                            };

                                                                                                            module.exports = mongoose.model('User', userSchema);