import app from './server';
import config from './config';

const { PORT } = config;

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
