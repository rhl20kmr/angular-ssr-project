import { Express, Request, Response, NextFunction } from 'express';
//const jwt = require('jsonwebtoken');
import jwt, { JwtPayload } from 'jsonwebtoken';
import { mockUsers } from './mock/users.mock';

// Load secret key from environment
const SECRET_KEY = 'your-secret-key'; 
if (!SECRET_KEY) throw new Error('JWT_SECRET is not defined in the environment');

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

export function registerAuthApi(app: Express): void {
  /**
   * POST /api/login
   * Authenticates the user and returns a JWT token
   */
  app.post('/api/login', (req: Request, res: Response): Response => {
    const { username, password } = req.body;

    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const payload = { id: user.id, username: user.username };
    console.log(`Authenticating user ${user.username}`); // Debugging log
    const token = jwt.sign(payload, SECRET_KEY as string, { expiresIn: '1h' });
    console.log(`Generated token for user ${user.username}: ${token}`); // Debugging log
    return res.json({ token });
  });

  /**
   * GET /api/profile
   * Returns the current user's profile (requires JWT)
   */
  app.get('/api/profile', verifyToken, (req: AuthenticatedRequest, res: Response): Response => {
    const decoded = req.user as JwtPayload;
    const userId = typeof decoded === 'string' ? null : decoded?.['id'];

    const user = mockUsers.find(u => u.id === userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.json({ id: user.id, name: user.name, email: user.email });
  });
}

/**
 * Middleware to verify JWT token and attach decoded user to request
 */
function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, SECRET_KEY as string, (err, decoded) => {
    if (err || !decoded) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    return next();
  });
}
