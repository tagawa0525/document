
  function axios() {
    const axiosBase = require('axios');
    return axiosBase.create({
      baseURL: "http://192.168.1.108:8000",
      // baseURL: "http://localhost:8000",
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      responseType: 'json'
    });
  }

export default axios;
