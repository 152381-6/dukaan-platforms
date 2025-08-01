require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
      useCreateIndex: true
      })
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.log(err));

      // مسار اختباري
      app.get('/', (req, res) => {
        res.send('Dukaan API is running...');
        });

        // المسارات الرئيسية
        const authRoutes = require('./routes/authRoutes');
        const userRoutes = require('./routes/userRoutes');
        const storeRoutes = require('./routes/storeRoutes');

        app.use('/api/auth', authRoutes);
        app.use('/api/users', userRoutes);
        app.use('/api/stores', storeRoutes);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));