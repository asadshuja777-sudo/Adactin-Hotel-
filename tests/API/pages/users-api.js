import { attachApiLog } from './apiLogger.js';
import { API_BASE_URL } from './api-config.js';

export class UsersApi {
  constructor(request, testInfo) {
    this.request = request;
    this.testInfo = testInfo;
    this.usersUrl = `${API_BASE_URL}/users`;
  }

  getAllUsers(options) {
    return this.get('/all-users', options);
  }

  register(data) {
    return this.post('/register', data);
  }

  login(data) {
    return this.post('/login', data);
  }

  replaceAccount(data) {
    return this.put('/replace-account', data);
  }

  updateAccount(data) {
    return this.patch('/update-account', data);
  }

  deleteAccount() {
    return this.delete('/delete-account');
  }

  async get(endpoint, options = {}) {
    const response = await this.request.get(`${this.usersUrl}${endpoint}`, options);
    return this.attachResponse('GET', endpoint, response);
  }

  async post(endpoint, data, options = {}) {
    const response = await this.request.post(`${this.usersUrl}${endpoint}`, { ...options, data });
    return this.attachResponse('POST', endpoint, response);
  }

  async put(endpoint, data, options = {}) {
    const response = await this.request.put(`${this.usersUrl}${endpoint}`, { ...options, data });
    return this.attachResponse('PUT', endpoint, response);
  }

  async patch(endpoint, data, options = {}) {
    const response = await this.request.patch(`${this.usersUrl}${endpoint}`, { ...options, data });
    return this.attachResponse('PATCH', endpoint, response);
  }

  async delete(endpoint, options = {}) {
    const response = await this.request.delete(`${this.usersUrl}${endpoint}`, options);
    return this.attachResponse('DELETE', endpoint, response);
  }

  async attachResponse(method, endpoint, response) {
    await attachApiLog(this.testInfo, `${method} ${endpoint}`, response);
    return response;
  }
}
