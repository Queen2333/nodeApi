const app = require('../../app')
const supertest = require('supertest')
const request = supertest(app)
const connection = require('../models/db')

describe('test api', () => {
  it('no data with the key', async () => {
    const res = await request.get('/object/pear')
    expect(res.status).toBe(500)
    expect(res.body.message).toBe('Error retrieving Tutorial with key pear')
  })
  it('only one data with the key & no timestamp', async () => {
    const res = await request.get('/object/apple')
    expect(res.status).toBe(200)
    expect(res.body.value).toBe('20')
  })
  it('more than one data with the key & no timestamp', async () => {
    const res = await request.get('/object/orange')
    expect(res.status).toBe(200)
    expect(res.body.value).toBe('44')
  })
  it('more than one data with the key & have a valid timestamp', async () => {
    const res = await request.get('/object/orange?timestamp=1654079483113')
    expect(res.status).toBe(200)
    expect(res.body.value).toBe('16')
  })
  it('more than one data with the key & have a invalid timestamp', async () => {
    const res = await request.get('/object/orange?timestamp=1654062624100')
    expect(res.status).toBe(200)
    expect(res.body.value).toBe(undefined)
    expect(res.body.message).toBe('There are no data')
  })

  it('have params to create', async () => {
    const res = await request.post('/object').type('form').send('mengo=15')
    expect(res.status).toBe(200)
    expect(res.body.key).toBe('mengo')
    expect(res.body.value).toBe('15')
  })
  it('have no params to create', async () => {
    const res = await request.post('/object').type('form').send('')
    expect(res.status).toBe(400)
    expect(res.body.message).toBe('content can not be empty!')
  })
});
afterAll(async () => {
  connection.end();
});