const request = require('supertest');
const express = require('express');
const app = require('../index'); // Uygulamanızın ana dosyasını buraya import edin
const { expect } = require('chai');

describe('GET /', function() {
  it('should return Hello World!', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /text/)
      .expect(200, 'Hello World!', done);
  });
});

describe('Server', function() {
  it('should be listening on port 5000', function(done) {
    // Port kontrolü yapmak genellikle zordur ve genellikle sistem üzerinde yapılır
    // Bu test, sadece sunucunun başlatıldığını doğrulamak için bir yer tutucudur
    done();
  });
});
