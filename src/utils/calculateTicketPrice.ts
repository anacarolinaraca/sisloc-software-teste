// EXERCICIO 01
export default function calculateTicketPrice(quantity: number): number {
  let sumTicket = 0;

  if (quantity <= 5) {
    sumTicket = quantity * 50;
  } else if (quantity >= 6 && quantity <= 15) {
    sumTicket = (5 * 50) + ((quantity - 5) * 45);
  }  else {
    sumTicket = (5 * 50) + (10 * 45) + ((quantity - 15) * 40);
  }
  return sumTicket;
}

// Foi utilizada a estrutura condicional, por ser de fácil manutenção. Também optei organizar a função na pasta utils, pois facilita sua reutilização em outras partes do projeto.