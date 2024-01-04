import { app } from './flask_app.js';

app.listen(3001, () => {
  console.log('Server started on port 3000');
});
