import { Request, Response, Router } from "express";
import TicketController from "../controllers/ticketController";

const ticketController = new TicketController();
const router = Router();

router.get('/', (req: Request, res: Response) => {
  ticketController.ticket(req, res)
});


export default router;