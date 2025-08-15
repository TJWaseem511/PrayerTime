// Toggle visibility of timings and toggle active class for arrow
function toggleTimings(header) {
  const timings = header.nextElementSibling;

  document.querySelectorAll('.masjid-timings').forEach(section => {
    if (section !== timings) {
      section.style.display = 'none';
      section.previousElementSibling.classList.remove('active');
    }
  });

  if (timings.style.display === 'block') {
    timings.style.display = 'none';
    header.classList.remove('active');
  } else {
    timings.style.display = 'block';
    header.classList.add('active');
  }
}

// Load masjids and prayer timings from JSON and create UI
async function loadMasjids() {
  try {
    const response = await fetch('prayer_timings.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const masjids = await response.json();

    const container = document.getElementById('masjidsContainer');
    container.innerHTML = '';

    masjids.forEach(masjid => {
      const card = document.createElement('div');
      card.className = 'masjid-card';

      const header = document.createElement('div');
      header.className = 'masjid-header';
      header.textContent = `🕌 ${masjid.name}`;
      header.addEventListener('click', () => toggleTimings(header));

      const timingsDiv = document.createElement('div');
      timingsDiv.className = 'masjid-timings';

      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const trHead = document.createElement('tr');
      ['Prayer', 'Azan', 'Iqamah'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        trHead.appendChild(th);
      });
      thead.appendChild(trHead);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      masjid.timings.forEach(prayer => {
        const tr = document.createElement('tr');

        ['prayer', 'azan', 'iqamah'].forEach(key => {
          const td = document.createElement('td');
          td.textContent = prayer[key];
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      timingsDiv.appendChild(table);

      card.appendChild(header);
      card.appendChild(timingsDiv);

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading prayer timings:', error);
    const container = document.getElementById('masjidsContainer');
    container.textContent = 'Failed to load prayer timings.';
  }
}

// Run loadMasjids on page load
window.addEventListener('DOMContentLoaded', loadMasjids);
