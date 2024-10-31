import express, { Application } from 'express';
import routes from './routes/products.routes';

class App {
    public app: Application;
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.routes();
    }

    private routes(): void {
        this.app.use('/api', routes);
    }

    public start(PORT: number): void {
        this.app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
}

export default App;
