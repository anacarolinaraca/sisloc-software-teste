// Exercicio 01
/* A função calculateTicketPrice realiza o calculo do total dos ingressos com base na quantidade comprada, sendo aplicado diferentes valores de acordo com a faixa.
*/
export default function calculateTicketPrice(quantity: number): number {
  let sumTicket = 0;
  const RANGE_1 = 5;
  const RANGE_2 = 15;
  const VALUE_RANGE_1 = 50;
  const VALUE_RANGE_2 = 45;
  const VALUE_RANGE_3 = 40;

  if (quantity <= RANGE_1) {
    sumTicket = quantity * VALUE_RANGE_1;
  } else if (quantity > RANGE_1 && quantity <= RANGE_2) {
    sumTicket = RANGE_1 * VALUE_RANGE_1 + (quantity - RANGE_1) * VALUE_RANGE_2;
  } else {
    sumTicket = (RANGE_1 * VALUE_RANGE_1) + 10 * VALUE_RANGE_2 + (quantity - RANGE_2) * VALUE_RANGE_3;
  }
  return sumTicket;
}

/* Foi utilizada a estrutura condicional, por ser de fácil manutenção. Também optei organizar esta função na pasta utils, pois facilita sua reutilização em outros locais do projeto. 
A organização das pastas segue um padrão estabelecido em projetos realizados no curso da trybe.
*/
