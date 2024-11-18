export const TestData = {
  credentials: {
    valid: {
      username: 'joachim+453459@systima.no',
      password: '123456789',
    },
    invalid: {
      username: 'joachim+453459@systima.no',
      password: '1234',
    },
  },
  messages: {
    invalidLoginError: 'Feil brukernavn / passord',
  },
  urls: {
    loginPage: 'https://app.staging.systima.no/login',
    dashboard: 'https://app.staging.systima.no/systimaas7/dashboard',
  },
  purchase: {
    positive: {
      contact: 'Systima AS',
      totalAmount: '100',
      invoiceDate: '01.01.2024',
      dueDate: '15.01.2024',
      account: '1000 Utvikling, ervervet',
      successMessage: 'Bilag opprettet med bilagsnr. 2024-',
    },
    negative: {
      duplicateInvoiceNumber: {
        contact: 'Systima AS',
        totalAmount: '100',
        invoiceDate: '01.01.2024',
        dueDate: '15.01.2024',
        invoiceNumber: '1',
        account: '1000 Utvikling, ervervet',
        errorMessage: 'Fakturanr. er allerede bokført',
      },
    },
  },
  contact: {
    successMessage: 'Ny kontakt lagret.',
    validationError: 'Navn *Vennligst skriv inn navn',
  },
};