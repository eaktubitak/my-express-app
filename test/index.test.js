const request = require('supertest');
const express = require('express');
const { expect } = require('chai');
const app = require('../index'); // Ana uygulama dosyasını CommonJS ile import edin

describe('GET /', function() {
  it('should return Hello World!', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /text/)
      .expect(200, 'Hello World!', done);
  });
});
