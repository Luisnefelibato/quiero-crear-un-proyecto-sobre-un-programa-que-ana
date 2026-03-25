const express = require('express');
const { log } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  // Log the error to the console or your logging service
  log.error(err.stack);

  // Send a response to the client
  res.status(500).json({
    message: 'Something went wrong',
    error: process.env.NODE_ENV === 'development' ? err.message : null,
  });
};

module.exports = errorHandler;