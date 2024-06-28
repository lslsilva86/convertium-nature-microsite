import express from 'express';
import headerRoute from './routes/header';
import carouselRoute from './routes/carousel';
import slideOneRoute from './routes/slideOne';
import slideTwoRoute from './routes/slideTwo';

const app = express();

app.use(express.json());

app.use('/api', headerRoute);
app.use('/api', carouselRoute);
app.use('/api', slideOneRoute);
app.use('/api', slideTwoRoute);

export default app;
