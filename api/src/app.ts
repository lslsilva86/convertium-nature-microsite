import express from 'express';
import cors from 'cors';
import path from 'path';
import headerRoute from './routes/header';
import carouselRoute from './routes/carousel';
import slideOneRoute from './routes/slideOne';
import slideTwoRoute from './routes/slideTwo';

const app = express();

app.use(cors());

app.use(express.json());

// Serve static files
app.use('/assets/images', express.static(path.join(__dirname, '../assets/images')));

app.use('/api', headerRoute);
app.use('/api', carouselRoute);
app.use('/api', slideOneRoute);
app.use('/api', slideTwoRoute);

export default app;
