const API_URL = 'http://localhost:7070/?method=';

async function request(method, options = {}) {
  const response = await fetch(`${API_URL}${method}`, options);

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getAllTickets() {
  return request('allTickets');
}

export function getTicketById(id) {
  return request(`ticketById&id=${encodeURIComponent(id)}`);
}

export function createTicket(ticket) {
  return request('createTicket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: ticket.name,
      description: ticket.description,
      status: ticket.status,
    }),
  });
}

export function updateTicket(id, ticket) {
  return request(`updateById&id=${encodeURIComponent(id)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticket),
  });
}

export function deleteTicket(id) {
  return request(`deleteById&id=${encodeURIComponent(id)}`);
}