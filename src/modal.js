const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modal-title');
const ticketForm = document.querySelector('#ticket-form');
const ticketName = document.querySelector('#ticket-name');
const ticketDescription = document.querySelector('#ticket-description');
const modalCancel = document.querySelector('#modal-cancel');

const confirmModal = document.querySelector('#confirm-modal');
const confirmCancel = document.querySelector('#confirm-cancel');
const confirmDelete = document.querySelector('#confirm-delete');

export function openCreateModal(onSubmit) {
  modalTitle.textContent = 'Добавить тикет';
  ticketName.value = '';
  ticketDescription.value = '';

  ticketForm.onsubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name: ticketName.value,
      description: ticketDescription.value,
      status: false,
    });
  };

  modal.classList.remove('hidden');
}

export function openEditModal(ticket, onSubmit) {
  modalTitle.textContent = 'Редактировать тикет';
  ticketName.value = ticket.name;
  ticketDescription.value = ticket.description;

  ticketForm.onsubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name: ticketName.value,
      description: ticketDescription.value,
      status: ticket.status,
    });
  };

  modal.classList.remove('hidden');
}

export function openDeleteModal(onConfirm) {
  confirmDelete.onclick = onConfirm;
  confirmModal.classList.remove('hidden');
}

export function closeModals() {
  modal.classList.add('hidden');
  confirmModal.classList.add('hidden');
}

modalCancel.addEventListener('click', closeModals);
confirmCancel.addEventListener('click', closeModals);