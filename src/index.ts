import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

import healthRoute from './routes/health.route';
import authRoute from './routes/auth.router';
import adminRoute from './routes/admin.route';
import bookRoute from './routes/book.route';
import orderRoute from './routes/order.route';
import customerRoute from './routes/customer.route';
import authorRoute from './routes/author.route';
import publisherRoute from './routes/publisher.route';

import { connect } from './utils/connect.util';

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
	origin: "*",
	credentials : true
}))

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.use('/api/', healthRoute);
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/book', bookRoute);
app.use('/api/order', orderRoute);
app.use('/api/customer', customerRoute);
app.use('/api/author', authorRoute);
app.use('/api/publisher', publisherRoute);

app.use((req: Request, res: Response) => {
    // Invalid request
    res.status(404).json({
        ok: false,
        message: "Sorry, We can't find that route",
    })
});    

app.listen(port, async () => {
    console.log(`App is running at http://localhost:${port}`);

    await connect();
});

