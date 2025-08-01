const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
      type: String,
          required: true,
              unique: true
                },
                  owner: {
                      type: mongoose.Schema.Types.ObjectId,
                          ref: 'User',
                              required: true
                                },
                                  description: {
                                      type: String
                                        },
                                          location: {
                                              type: String
                                                },
                                                  commissionRate: {
                                                      type: Number,
                                                          default: 5
                                                            },
                                                              isApproved: {
                                                                  type: Boolean,
                                                                      default: false
                                                                        },
                                                                          createdAt: {
                                                                              type: Date,
                                                                                  default: Date.now
                                                                                    }
                                                                                    });

                                                                                    module.exports = mongoose.model('Store', storeSchema);