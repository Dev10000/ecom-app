import app from './server';
import config from './config';

const { PORT } = config;

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

export default app;
