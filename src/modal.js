const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modal-title');
const ticketForm = document.querySelector('#ticket-form');
const ticketName = document.querySelector('#ticket-name');
const ticketDescription = document.querySelector('#ticket-description');
const modalCancel = document.querySelector('#modal-cancel');

const confirmModal = document.querySelector('#confirm-modal');
const confirmCancel = document.querySelector('#confirm-cancel');
const confirmDelete = document.querySelector('#confirm-delete');

function getTicketData(defaultStatus) {
  const name = ticketName.value.trim();
  const description = ticketDescription.value.trim();

  if (!name) {
    ticketName.setCustomValidity('Введите краткое описание тикета');
    ticketName.reportValidity();
    ticketName.focus();
    return null;
  }

  ticketName.setCustomValidity('');

  return {
    name,
    description,
    status: defaultStatus,
  };
}

export function openCreateModal(onSubmit) {
  modalTitle.textContent = 'Добавить тикет';
  ticketName.value = '';
  ticketDescription.value = '';
  ticketName.setCustomValidity('');

  ticketForm.onsubmit = (event) => {
    event.preventDefault();

    const data = getTicketData(false);

    if (data) {
      onSubmit(data);
    }
  };

  modal.classList.remove('hidden');
  ticketName.focus();
}

export function openEditModal(ticket, onSubmit) {
  modalTitle.textContent = 'Редактировать тикет';
  ticketName.value = ticket.name;
  ticketDescription.value = ticket.description;
  ticketName.setCustomValidity('');

  ticketForm.onsubmit = (event) => {
    event.preventDefault();

    const data = getTicketData(ticket.status);

    if (data) {
      onSubmit(data);
    }
  };

  modal.classList.remove('hidden');
  ticketName.focus();
}

export function openDeleteModal(onConfirm) {
  confirmDelete.onclick = () => {
    onConfirm();
  };

  confirmModal.classList.remove('hidden');
}

export function closeModals() {
  confirmDelete.onclick = null;
  modal.classList.add('hidden');
  confirmModal.classList.add('hidden');
}

modalCancel.addEventListener('click', closeModals);
confirmCancel.addEventListener('click', closeModals);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModals();
  }
});

confirmModal.addEventListener('click', (event) => {
  if (event.target === confirmModal) {
    closeModals();
  }
});