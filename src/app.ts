import express, { Application } from 'express';
// import routes from './routes/index';

class App {
  public app: Application;
  constructor() {
      this.app = express();
      // this.routes();
  }
  
  // private routes():void {
  //     this.app.use('/api', routes);
  // }

  public start(PORT: number): void {
      this.app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
      });
  }
}

export default App;