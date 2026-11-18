import './style.css';

import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from './api.js';

import { renderTickets, showLoader, hideLoader } from './ui.js';
import {
  openCreateModal,
  openEditModal,
  openDeleteModal,
  closeModals,
} from './modal.js';

const ticketsList = document.querySelector('#tickets');
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
  } finally {
    hideLoader();
  }
}

async function createNewTicket(data) {
  await createTicket({
    id: null,
    ...data,
  });

  closeModals();
  await loadTickets();
}

async function editTicket(id, data) {
  const ticket = await getTicketById(id);

  await updateTicket(id, {
    ...ticket,
    ...data,
  });

  closeModals();
  await loadTickets();
}

async function removeTicket(id) {
  await deleteTicket(id);

  closeModals();
  await loadTickets();
}

async function toggleTicketStatus(id) {
  const ticket = await getTicketById(id);

  await updateTicket(id, {
    ...ticket,
    status: !ticket.status,
  });

  await loadTickets();
}

async function showTicketDescription(id) {
  const ticket = await getTicketById(id);
  const ticketElement = document.querySelector(`[data-id="${id}"]`);
  const description = ticketElement.querySelector('.ticket-description');

  description.textContent = ticket.description;
  description.classList.toggle('hidden');
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
    const ticket = await getTicketById(id);
    openEditModal(ticket, (data) => editTicket(id, data));
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