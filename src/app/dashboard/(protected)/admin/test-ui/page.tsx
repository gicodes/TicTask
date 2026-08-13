import EmailTemplate from "./email-temp";

const Page = () => {
  const ticket = {
    title: "Website Development Services",
    description: "Invoice for website development services rendered in September 2023.",
    amount: 1500,
    currency: "USD",
    createdBy: { name: "John Doe", email: "gideoniduma@gmail.com" },
    dueDate: new Date().toDateString(),
    type: "INVOICE",
  };

  let body1 = `
    <p><strong>Title:</strong> ${ticket.title}</p>
    <p><strong>Description:</strong> ${ticket.description}</p>
    <p><strong>Amount:</strong> ${ticket.amount} ${ticket.currency}</p>
    <p><strong>From:</strong> ${ticket.createdBy.name}</p>
    <p><strong>Due on:</strong> ${ticket.dueDate}</p>
    <p>
      If this email appears strange, kindly ignore it or contact
      <strong> admin@tictask.org</strong>.
    </p>
  `;

  return (
    <EmailTemplate
      subject="Invoice Notification"
      title="You have an incoming invoice"
      subtitle="Invoice #12345 from TicTask"
      body1={body1}
      body2="<p>Please review the invoice and proceed with payment.</p>"
      closingRemark="<p>— The TicTask Team</p>"
    />
  );
}

export default Page;
