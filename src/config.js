// const baseUrl = "http://localhost:8000/api/v1";
// const baseUrl = "http://192.168.29.228:8000/api/v1";
// const baseUrl = "http://192.168.29.228:9090";
// const baseUrl = "http://192.168.0.121:9090";
const baseUrl = "http://192.168.29.65:9090";
// const baseUrl = "http://34.125.249.235/"; // AWS  Server
export const APIS = {
  // login: `${baseUrl}/web-master/auth-token/`, // org

  register: `${baseUrl}/encore/api/v1/users/register`,
  getDetails: `${baseUrl}/encore/api/v1/users/getdetails`,
  getAttendance: `${baseUrl}/encore/api/v1/users/getattendance`,
  getAccounts: `${baseUrl}/encore/api/v1/users/getaccounts`,
  setPunchIn: `${baseUrl}/encore/api/v1/users/punchin`,
  setPunchOut: `${baseUrl}/encore/api/v1/users/punchout`,
  newCustomer: `${baseUrl}/encore/api/v1/customervisits/newcustomer`,

  updateCustomer: `${baseUrl}/encore/api/v1/customervisits/updatecustomer`,
  findByUID: `${baseUrl}/encore/api/v1/customervisits/findbyuid`,
  newICToken: `${baseUrl}/encore/api/v1/ictickets/newicticket`,
};

// export const APIS = {
//   login: `${baseUrl}/web-master/auth-token/`,
//   register: `${baseUrl}/web-master/auth-token/`,
//   syllabusList: `https://jsonplaceholder.typicode.com/todos/`,
//   classes: `https://jsonplaceholder.typicode.com/todos/`,
//   subjects: `https://jsonplaceholder.typicode.com/todos/`,
//   topics: `https://jsonplaceholder.typicode.com/todos/`,
//   uploadNewTopic: `https://jsonplaceholder.typicode.com/todos/`,
//   search: `https://jsonplaceholder.typicode.com/todos/`,
// };

const Config = {
  apis: { ...APIS },
};

export default Config;
