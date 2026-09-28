// js/vehicle.js
document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.vehicle-page');
  if (!page) return;

  const vehicleId = page.getAttribute('data-vehicle');
  if (!vehicleId || typeof vehiclesData === 'undefined') return;

  const vData = vehiclesData[vehicleId];
  if (!vData) return;

  // 1. Render Hero Spec Bar
  const heroSpecsMount = document.getElementById('hero-specs-mount');
  if (heroSpecsMount && vData.heroSpecs) {
    vData.heroSpecs.forEach(specKey => {
      const specValue = vData.specs[specKey];
      if (specValue) {
        const item = document.createElement('div');
        item.className = 'hero-spec-item';
        item.innerHTML = `<span>${specKey}</span><strong>${specValue}</strong>`;
        heroSpecsMount.appendChild(item);
      }
    });
  }

  // 2. Render Spec Tables
  const specsMount = document.getElementById('specs-mount');
  if (specsMount && vData.specs) {
    const table = document.createElement('table');
    table.className = 'specs-table';
    const tbody = document.createElement('tbody');
    
    Object.keys(vData.specs).forEach(key => {
      if (key === 'Colours') return;
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      th.textContent = key;
      const td = document.createElement('td');
      td.textContent = vData.specs[key];
      tr.appendChild(th);
      tr.appendChild(td);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    specsMount.appendChild(table);
  }

  // 3. Render Colours
  const coloursMount = document.getElementById('colours-mount');
  if (coloursMount && vData.colours) {
    const coloursSection = document.createElement('div');
    coloursSection.className = 'colours-section';
    
    const h3 = document.createElement('h3');
    h3.className = 'colours-title';
    h3.textContent = 'Available Colours';
    coloursSection.appendChild(h3);

    const colourList = document.createElement('div');
    colourList.className = 'colour-list';
    vData.colours.forEach(col => {
      const colDot = document.createElement('div');
      colDot.className = 'colour-item';
      
      const dot = document.createElement('span');
      dot.className = 'colour-dot';
      const colourMap = {
        'Black': '#000000',
        'Blue': '#1e3a8a',
        'Dark Blue': '#172554',
        'Grey': '#6b7280',
        'Peach': '#ffedd5',
        'Red': '#dc2626',
        'White': '#ffffff',
        'Yellow': '#facc15'
      };
      dot.style.backgroundColor = colourMap[col] || '#ccc';
      
      const label = document.createElement('span');
      label.textContent = col;
      
      colDot.appendChild(dot);
      colDot.appendChild(label);
      colourList.appendChild(colDot);
    });
    coloursSection.appendChild(colourList);
    coloursMount.appendChild(coloursSection);
  }

  // 4. Render Specification Matrix (on vehicles.html)
  const matrixTable = document.getElementById('matrix-table');
  if (matrixTable && typeof vehiclesData !== 'undefined') {
    const allKeys = new Set();
    const vehicleKeys = Object.keys(vehiclesData);
    
    vehicleKeys.forEach(vKey => {
      Object.keys(vehiclesData[vKey].specs).forEach(k => {
        if (k !== 'Colours') allKeys.add(k);
      });
    });
    
    let thead = '<thead><tr><th>Specification</th>';
    vehicleKeys.forEach(vKey => {
      thead += `<th>${vehiclesData[vKey].name}</th>`;
    });
    thead += '</tr></thead>';
    
    let tbody = '<tbody>';
    allKeys.forEach(specKey => {
      tbody += `<tr><th>${specKey}</th>`;
      vehicleKeys.forEach(vKey => {
        const val = vehiclesData[vKey].specs[specKey] || '—';
        tbody += `<td>${val}</td>`;
      });
      tbody += '</tr>';
    });
    tbody += '</tbody>';
    
    matrixTable.innerHTML = thead + tbody;
  }
});
