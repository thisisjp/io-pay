import { initMultiplePayment } from './multiplepayment';

// eslint-disable-next-line sonarjs/cognitive-complexity
export function initHeader() {
  const enteBeneficiario = document.querySelectorAll("[data-sessiondata='enteBeneficiario']") || null;
  const subject = document.querySelectorAll("[data-sessiondata='subject']") || null;
  const importo = document.querySelectorAll("[data-sessiondata='importo']") || null;
  const dataStored: string | null = sessionStorage.getItem('checkData');
  const data = dataStored ? JSON.parse(dataStored) : null;
  const multiplePayment = data?.detailsList.length > 1 ? true : false;
  const multiplePaymentString = 'Pagamento multiplo';

  if (multiplePayment && data) {
    initMultiplePayment(data);
  }

  if (enteBeneficiario && !multiplePayment && data) {
    for (const el of Array.from(enteBeneficiario)) {
      // eslint-disable-next-line functional/immutable-data
      (el as HTMLElement).innerText = data?.detailsList[0].enteBeneficiario;
    }
  }
  if (subject && data) {
    for (const el of Array.from(subject)) {
      // eslint-disable-next-line functional/immutable-data
      (el as HTMLElement).innerText = multiplePayment ? multiplePaymentString : data.subject;
    }
  }
  if (importo && data) {
    const prettifiedAmount = parseInt(data?.amount.amount.toString(), 10) / 100;
    for (const el of Array.from(importo)) {
      // eslint-disable-next-line functional/immutable-data
      (el as HTMLElement).innerText = prettifiedAmount
        ? `€ ${Intl.NumberFormat('it-IT').format(prettifiedAmount)}`
        : '';
    }
  }
}
