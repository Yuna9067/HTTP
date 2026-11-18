export function renderTickets(tickets, handlers) {
  const list = document.querySelector('#tickets');
  list.innerHTML = '';

  tickets.forEach((ticket) => {
    const item = document.createElement('li');
    item.className = 'ticket';
    item.dataset.id = ticket.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'ticket-status';
    checkbox.checked = Boolean(ticket.status);

    const name = document.createElement('span');
    name.className = 'ticket-name';
    name.textContent = ticket.name;

    const created = document.createElement('time');
    created.className = 'ticket-created';

    const createdDate = new Date(ticket.created);

    created.dateTime = createdDate.toISOString();
    created.textContent = createdDate.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'ticket-edit';
    editButton.textContent = '✎';

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'ticket-delete';
    deleteButton.textContent = '✕';

    const description = document.createElement('div');
    description.className = 'ticket-description hidden';

    item.append(
      checkbox,
      name,
      created,
      editButton,
      deleteButton,
      description,
    );

    list.append(item);
  });

  list.onclick = handlers.onTicketClick;
}