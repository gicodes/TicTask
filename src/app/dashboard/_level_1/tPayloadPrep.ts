import { Create_Ticket, Data, Ticket } from "@/types/ticket";

export function prepareTicketPayload(
  formValues: Create_Ticket
): Partial<Ticket> {
  const { 
    type, 
    title, 
    description, 
    priority, 
    tags, 
    dueDate, 
    startTime, 
    endTime, 
    amount, 
    currency, 
    createdById,
    assignTo,
    ...extras 
  } = formValues;

  return {
    type,
    title,
    description,
    priority,
    tags,
    dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    startTime: startTime ? new Date(startTime).toISOString() : undefined,
    endTime: endTime ? new Date(endTime).toISOString() : undefined,
    amount,
    currency,
    createdById,
    data: extras as Data, 
  };
}