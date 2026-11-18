import './style.css';

import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from './api.js';

import {
  renderTickets,
  showLoader,
  hideLoader,
  showError,
} from './ui.js';

import {
  openCreateModal,
  openEditModal,
  openDeleteModal,
  closeModals,
} from './modal.js';

const addButton = document.querySelector('#add-ticket');

let tickets = [];

async function loadTickets() {
  showLoader();

  try {
    tickets = await getAllTickets();
    renderTickets(tickets, {
      onTicketClick,
    });
  } catch (error) {
    console.error(error);
    showError('Не удалось загрузить тикеты');
  } finally {
    hideLoader();
  }
}

async function createNewTicket(data) {
  try {
    await createTicket({
      id: null,
      ...data,
    });

    closeModals();
    await loadTickets();
  } catch (error) {
    console.error('Ошибка при создании тикета:', error);
    showError('Не удалось сохранить тикет');
  }
}

async function editTicket(id, data) {
  try {
    const ticket = await getTicketById(id);

    await updateTicket(id, {
      ...ticket,
      ...data,
    });

    closeModals();
    await loadTickets();
  } catch (error) {
    console.error('Ошибка при редактировании тикета:', error);
    showError('Не удалось сохранить изменения');
  }
}

async function removeTicket(id) {
  try {
    await deleteTicket(id);

    closeModals();
    await loadTickets();
  } catch (error) {
    console.error('Ошибка при удалении тикета:', error);
    showError('Не удалось удалить тикет');
  }
}

async function toggleTicketStatus(id) {
  try {
    const ticket = await getTicketById(id);

    await updateTicket(id, {
      ...ticket,
      status: !ticket.status,
    });

    await loadTickets();
  } catch (error) {
    console.error('Ошибка при изменении статуса:', error);
    showError('Не удалось изменить статус тикета');
  }
}

async function showTicketDescription(id) {
  try {
    const ticket = await getTicketById(id);
    const ticketElement = document.querySelector(`[data-id="${id}"]`);
    const description = ticketElement.querySelector('.ticket-description');

    description.textContent = ticket.description;
    description.classList.toggle('hidden');
  } catch (error) {
    console.error('Ошибка при загрузке описания:', error);
    showError('Не удалось загрузить описание тикета');
  }
}

async function onTicketClick(event) {
  const ticketElement = event.target.closest('.ticket');

  if (!ticketElement) {
    return;
  }

  const id = ticketElement.dataset.id;

  if (event.target.closest('.ticket-status')) {
    await toggleTicketStatus(id);
    return;
  }

  if (event.target.closest('.ticket-edit')) {
    try {
      const ticket = await getTicketById(id);
      openEditModal(ticket, (data) => editTicket(id, data));
    } catch (error) {
      console.error(error);
      showError('Не удалось загрузить тикет');
    }

    return;
  }

  if (event.target.closest('.ticket-delete')) {
    openDeleteModal(() => removeTicket(id));
    return;
  }

  await showTicketDescription(id);
}

addButton.addEventListener('click', () => {
  openCreateModal(createNewTicket);
});

document.addEventListener('DOMContentLoaded', loadTickets);