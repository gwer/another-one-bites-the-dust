const groups = document.querySelector('.groups');

const onGroupHeaderClick = (e) => {
  const header = e.target.closest('.group_header');

  if (!header) {
    return;
  }

  const group = header.closest('.group');

  group.classList.toggle('hidden');
};

groups.addEventListener('click', onGroupHeaderClick);
