// Controls with origins are allowed to access the server
const allowedOrigins = [
  'http://localhost:3000',       // Local backend
  'http://localhost:5173',       // Local frontend
  'https://budget-tracker-six-silk.vercel.app/',  // Vercel domain
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || process.env.NODE_ENV === 'development') {
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

export default corsOptions;