import express from 'express';
import { json } from 'express';
import playersRouter from './routes/players';
import recipesRouter from './routes/recipes';
import locationsRouter from './routes/locations';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(json());

app.use('/players', playersRouter);
app.use('/recipes', recipesRouter);
app.use('/locations', locationsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log();
});

export default app;
