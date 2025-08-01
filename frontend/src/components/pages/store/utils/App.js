import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// المكونات
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
      <Provider store={store}>
            <Router>
                    <Header />
                            <main className="container py-4">
                                      <Routes>
                                                  <Route path="/" element={<HomePage />} />
                                                              <Route path="/register" element={<RegisterPage />} />
                                                                          <Route path="/login" element={<LoginPage />} />
                                                                                      <Route path="/dashboard" element={<DashboardPage />} />
                                                                                                </Routes>
                                                                                                        </main>
                                                                                                              </Router>
                                                                                                                  </Provider>
                                                                                                                    );
                                                                                                                    }

                                                                                                                    export default App;