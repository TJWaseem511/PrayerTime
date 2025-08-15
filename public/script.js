// Toggle timings display, same as before
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


// Function to build the masjid cards dynamically from JSON data
async function loadMasjids() {
  try {
    const response = await fetch('prayer_timings.json');
    const masjids = await response.json();

    const container = document.getElementById('masjidsContainer');
    container.innerHTML = ''; // Clear existing content

    masjids.forEach(masjid => {
      // Create main card div
      const card = document.createElement('div');
      card.className = 'masjid-card';

      // Create header div
      const header = document.createElement('div');
      header.className = 'masjid-header';
      header.textContent = `🕌 ${masjid.name}`;
      header.onclick = () => toggleTimings(header);

      // Create timings div
      const timingsDiv = document.createElement('div');
      timingsDiv.className = 'masjid-timings';

      // Create table
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

        const tdPrayer = document.createElement('td');
        tdPrayer.textContent = prayer.prayer;
        tr.appendChild(tdPrayer);

        const tdAzan = document.createElement('td');
        tdAzan.textContent = prayer.azan;
        tr.appendChild(tdAzan);

        const tdIqamah = document.createElement('td');
        tdIqamah.textContent = prayer.iqamah;
        tr.appendChild(tdIqamah);

        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      timingsDiv.appendChild(table);

      // Append header and timings to card
      card.appendChild(header);
      card.appendChild(timingsDiv);

      // Append card to container
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading masjid timings:', error);
    const container = document.getElementById('masjidsContainer');
    container.textContent = 'Failed to load prayer timings.';
  }
}

// Load masjids on page load
window.addEventListener('DOMContentLoaded', loadMasjids);