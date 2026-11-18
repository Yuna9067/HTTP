export function renderTickets(tickets, handlers) {
  const list = document.querySelector('#tickets');
  list.innerHTML = '';

  tickets.forEach((ticket) => {
    const item = document.createElement('li');
    item.className = 'ticket';
    item.dataset.id = ticket.id;

    item.innerHTML = `
      <input type="checkbox" class="ticket-status" ${ticket.status ? 'checked' : ''}>
      <span class="ticket-name">${ticket.name}</span>
      <span class="ticket-created">
        ${new Date(ticket.created).toLocaleString()}
      </span>
      <button class="ticket-edit" type="button">✎</button>
      <button class="ticket-delete" type="button">✕</button>
      <div class="ticket-description hidden"></div>
    `;

    list.append(item);
  });

  list.onclick = handlers.onTicketClick;
}

export function showLoader() {
  document.querySelector('#loader').classList.remove('hidden');
}

export function hideLoader() {
  document.querySelector('#loader').classList.add('hidden');
}