import { Express } from 'express';
import { mockUsers } from '../mock/users.mock';

export function registerUserApi(app: Express) {
  // GET /api/users/:id
   app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = mockUsers.find(u => u.id === id);
    console.log(`Fetching user with ID: ${id}`); // Debugging log
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }); 

  // Optional: GET /api/users (all)
  app.get('/api/users', (req, res) => {
    res.json(mockUsers);
  });
}
