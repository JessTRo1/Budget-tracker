// Controls with origins are allowed to access the server
const allowedOrigins = [
  'http://localhost:3000',       // React dev server
  'http://localhost:5173',       // Vite dev server
];

const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    
    return callback(null, true);
  },
  credentials: true,               
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = corsOptions;