
const configration =
              {
                "db":{
                    host: 'localhost',
                    database:"tododb",
                    user: 'autoreplyadmin',
                    password:"#waheguru#",
                    port:  5432,
                    // maximum number of clients the pool should contain
                    // by default this is set to 10.
                    max: 20,
                    // number of milliseconds a client must sit idle in the pool and not be checked out
                    // before it is disconnected from the backend and discarded
                    // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
                    idleTimeoutMillis: 30000,
                    // number of milliseconds to wait before timing out when connecting a new client
                    // by default this is 0 which means no timeout
                    connectionTimeoutMillis: 2000,
                  },
                  port:3000,
                  auth0 :{
                        jwt :{
                          cache: true,
                          rateLimit: true,
                          jwksRequestsPerMinute: 5,
                          jwksUri: 'https://auth-local.auth0.com/.well-known/jwks.json'
                        },
                        audience: 'http://localhost:3000/todo',
                        issuer: 'https://auth-local.auth0.com/',
                        algorithms: ['RS256']
                  }
              }

module.exports = configration;
