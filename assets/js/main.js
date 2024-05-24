/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click',()=>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))



// GOOGLESHEETS
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = [e.parameter.name, e.parameter.email, e.parameter.message];
  sheet.appendRow(row);
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}

// KOTAK SARAN

function submitForm() {
  var nama = document.getElementById('name').value;
  alert(`Terimakasih ${nama}. Pesan Anda berhasil dikirim!`);
}


function toggleRec(element) {
  // Toggle the clicked dropdown
  const content = element.nextElementSibling;
  const arrows = element.querySelectorAll('.arrow');
  content.classList.toggle('show');
  if (content.classList.contains('show')) {
    arrows.forEach(arrow => {
      arrow.classList.remove('down');
      arrow.classList.add('up');
    });
  } else {
    arrows.forEach(arrow => {
      arrow.classList.remove('up');
      arrow.classList.add('down');
    });
  }

  // Menyesuaikan tinggi kedua td agar sejajar
  const tdElements = document.querySelectorAll('td');
  let maxHeight = 0;

  if (content.classList.contains('show')) {
    // Calculate the maximum height only when the content is shown
    tdElements.forEach(td => {
      td.style.height = 'auto'; // Reset height to auto first
      if (td.offsetHeight > maxHeight) {
        maxHeight = td.offsetHeight;
      }
    });
    tdElements.forEach(td => {
      td.style.height = maxHeight + 'px';
    });
  } else {
    // When the content is hidden, reset the heights to auto
    tdElements.forEach(td => {
      td.style.height = 'auto';
    });
  }
}

// chart revenue by years
const revenue_year = async () => {
  try {
      const response = await fetch('/assets/json/revenue_years.json');
      const revenue_year = await response.json();
      return revenue_year;
  } catch (error) {
      console.error('Error fetching the gender_type data:', error);
      throw error;
  }
};

// Fungsi untuk membuat chart
const RevenueYearsBar = async () => {
  const data = await revenue_year();

  const years = data.Bikes.map(entry => entry.year);
  const revenues = data.Bikes.map(entry => entry.revenue);

  const ctx = document.getElementById('revenueChart').getContext('2d');
  const revenueChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [{
        label: 'Revenue by Year',
        data: revenues,
        backgroundColor: '#1155CC',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 5,
        pointStyle: 'circle',
        pointRadius: 7,
        pointHoverRadius: 15
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        datalabels: {
          align: 'start',
          anchor: 'middle',
          color:'black',
          formatter: (value) => `$${value.toLocaleString()}`
        }
        
      }
    },
    plugins: [ChartDataLabels]
  });
};


RevenueYearsBar();



// tooggle DROP Down1
function toggleContent(element) {
  // Close any currently open dropdowns
  const openContents = document.querySelectorAll('.bq-content.show');
  openContents.forEach(openContent => {
    if (openContent !== element.nextElementSibling) {
      openContent.classList.remove('show');
      const openArrow = openContent.previousElementSibling.querySelectorAll('.arrow');
      openArrow.forEach(arrow => {
        arrow.classList.remove('up');
        arrow.classList.add('down');
      });
    }
  });  

  // Toggle the clicked dropdown
  const content = element.nextElementSibling;
  const arrows = element.querySelectorAll('.arrow');
  content.classList.toggle('show');
  if (content.classList.contains('show')) {
    arrows.forEach(arrow => {
      arrow.classList.remove('down');
      arrow.classList.add('up');
    });
  } else {
    arrows.forEach(arrow => {
      arrow.classList.remove('up');
      arrow.classList.add('down');
    });
  }
}

/*==================== form dom ====================*/

function submitForm() {
  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === '') {
      alert("Name cannot be empty");
      return;
  }
  
  if (name.length <= 5) {
      alert("Name must be more than 5 characters");
      return;
  }

  if (email === '') {
      alert("Email cannot be empty");
      return;
  }
  
  if (message === '') {
      alert("Message cannot be empty");
      return;
  }

  if (!emailPattern.test(email)) {
      alert("Email should contain '@' and a domain like '.com'");
      return;
  }

  var messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages.push({ name: name, email: email, message: message });
  localStorage.setItem('messages', JSON.stringify(messages));

  alert("Message has been sent!");

  document.getElementById('recommendation-form').reset();
}

window.onload = function() {
  displayData();
}



function saveData(name, email, message) {
  // Mengambil data lama dari local storage
  var messages = JSON.parse(localStorage.getItem('messages')) || [];

  // Menambahkan data baru
  messages.push({ name: name, email: email, message: message });

  // Menyimpan kembali ke local storage
  localStorage.setItem('messages', JSON.stringify(messages));
}

function displayData() {
  // Mengambil nilai dari local storage
  var messages = JSON.parse(localStorage.getItem('messages')) || [];

  // Mengambil elemen message-section
  var messageSection = document.getElementById('message-section');

  // Mengosongkan konten message-section
  messageSection.innerHTML = '';

  // Menambahkan setiap pesan sebagai div baru
  messages.forEach(function(data, index) {
      var messageDiv = document.createElement('div');
      messageDiv.className = 'form';

      var nameLabel = document.createElement('label');
      nameLabel.innerText = "Nama:";
      var nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = data.name;
      nameInput.readOnly = true;

      var emailLabel = document.createElement('label');
      emailLabel.innerText = "Email:";
      var emailInput = document.createElement('input');
      emailInput.type = 'email';
      emailInput.value = data.email;
      emailInput.readOnly = true;

      var messageLabel = document.createElement('label');
      messageLabel.innerText = "Pesan:";
      var messageTextarea = document.createElement('textarea');
      messageTextarea.value = data.message;
      messageTextarea.readOnly = true;

      // Tombol Edit
      var editButton = document.createElement('button');
      var editIcon = document.createElement('i');
      editIcon.className = 'uil uil-edit-alt';
      editButton.appendChild(editIcon);
      editButton.appendChild(document.createTextNode(' Edit'));
      editButton.onclick = function() {
          editMessage(index);
      };

      // Tombol Hapus
      var deleteButton = document.createElement('button');
      var deleteIcon = document.createElement('i');
      deleteIcon.className = 'uil uil-trash-alt';
      deleteButton.appendChild(deleteIcon);
      deleteButton.appendChild(document.createTextNode(' Delete'));
      deleteButton.onclick = function() {
          deleteMessage(index);
      };

      messageDiv.appendChild(nameLabel);
      messageDiv.appendChild(nameInput);
      messageDiv.appendChild(emailLabel);
      messageDiv.appendChild(emailInput);
      messageDiv.appendChild(messageLabel);
      messageDiv.appendChild(messageTextarea);
      messageDiv.appendChild(editButton);
      messageDiv.appendChild(deleteButton);

      messageSection.appendChild(messageDiv);
  });
}

function deleteMessage(index) {
  if (confirm("Are you sure want to delete this?")) {
      var messages = JSON.parse(localStorage.getItem('messages')) || [];
      messages.splice(index, 1);
      localStorage.setItem('messages', JSON.stringify(messages));
      displayData();
  }
}

function editMessage(index) {
  var messages = JSON.parse(localStorage.getItem('messages')) || [];
  var message = messages[index];

  var newName = prompt("Edit Name:", message.name);
  var newEmail = prompt("Edit E-Mail:", message.email);
  var newMessage = prompt("Edit Message:", message.message);

  if (newName !== null && newEmail !== null && newMessage !== null) {
      messages[index] = { name: newName, email: newEmail, message: newMessage };
      localStorage.setItem('messages', JSON.stringify(messages));
      displayData();
  }
}

// Memastikan data ditampilkan saat halaman dimuat
window.onload = function() {
  displayData();
}


/*==================== TESTIMONIAL ====================*/
fetch('/assets/json/q1.json')
  .then(response => response.json())
  .then(data => {

    const selectCountryElement = document.getElementById('selectCountry');
    const selectYearElement = document.getElementById('selectYear');

    selectYearElement.addEventListener('change', function() {
      const selectedCountry = selectCountryElement.value;
      const selectedYear = this.value;
      const processedData = processData(data, selectedCountry, selectedYear);
      createChart(processedData);
      updateScorecard(processedData);
      createPieChart(processedData);
      updateLabels(selectedCountry, selectedYear);
    });

    selectCountryElement.addEventListener('change', function() {
      const selectedCountry = this.value;
      const selectedYear = selectYearElement.value;
      const processedData = processData(data, selectedCountry, selectedYear);
      createChart(processedData);
      updateScorecard(processedData);
      createPieChart(processedData);
      updateLabels(selectedCountry, selectedYear);
    });

    // Initial chart creation with all data
    const processedData = processData(data, 'All', 'All');
    createChart(processedData);
    updateScorecard(processedData);
    createPieChart(processedData);
    updateLabels('All', 'All');

  })
  .catch(error => console.error('Error fetching data:', error));

function updateScorecard(data) {
  const weekendAverage = calculateAverage(data.weekendAverages);
  const weekdayAverage = calculateAverage(data.weekdayAverages);

  const weekendAverageElement = document.getElementById('weekendAverage');
  weekendAverageElement.textContent = weekendAverage;

  const weekdayAverageElement = document.getElementById('weekdayAverage');
  weekdayAverageElement.textContent = weekdayAverage;
}

function calculateAverage(values) {
  if (values.length === 0) return 0; // Prevent division by zero
  const sum = values.reduce((acc, val) => acc + val, 0);
  const average = sum / values.length;
  return Math.ceil(average);
}

function createPieChart(data) {
    const weekendCanvas = document.getElementById('weekendPieChart');
    const weekdayCanvas = document.getElementById('weekdayPieChart');
  
    if (!weekendCanvas || !weekdayCanvas) {
      console.error('Canvas element not found');
      return;
    }
  
    const weekendCtx = weekendCanvas.getContext('2d');
    const weekdayCtx = weekdayCanvas.getContext('2d');
  
    if (!weekendCtx || !weekdayCtx) {
      console.error('Canvas context not supported');
      return;
    }

    if (weekendCtx.pieChart) {
      weekendCtx.pieChart.destroy();
    }
  
    if (weekdayCtx.pieChart) {
      weekdayCtx.pieChart.destroy();
    }

    weekendCtx.pieChart = new Chart(weekendCtx, {
      type: 'pie',
      data: {
        labels: data.subCategories.map((category, index) => {
          const weekendPercentage = Math.round((data.weekendAverages[index] / (data.weekendAverages[index] + data.weekdayAverages[index])) * 100);
          return `${category}: ${weekendPercentage}%`;
        }),
        datasets: [{
          label: 'Weekend Sales Average',
          data: data.weekendAverages,
          backgroundColor: [
            '#f10096',
            '#0072f0',
            '#ffa800',
            // Add more colors if needed
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontSize: 12
          }
        },
        plugins: {
          datalabels: {
            align: 'end',
            color: 'black'
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  
    weekdayCtx.pieChart = new Chart(weekdayCtx, {
      type: 'pie',
      data: {
        labels: data.subCategories.map((category, index) => {
          const weekdayPercentage = Math.round((data.weekdayAverages[index] / (data.weekendAverages[index] + data.weekdayAverages[index])) * 100);
          return `${category}: ${weekdayPercentage}%`;
        }),
        datasets: [{
          label: 'Weekday Sales Average',
          data: data.weekdayAverages,
          backgroundColor: [
            '#f10096',
            '#0072f0',
            '#ffa800',
            // Add more colors if needed
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontSize: 12
          }
        },
        plugins: {
          datalabels: {
            align: 'end',
            color: 'black'
          }
        }
      },
      plugins: [ChartDataLabels]
    });
}

function updateLabels(selectedCountry, selectedYear) {
  let countryText, yearText, filterText;

  if (selectedCountry !== 'All' && selectedYear !== 'All') {
    countryText = selectedCountry;
    yearText = selectedYear;
    filterText = `${countryText} ${yearText}`.trim();
  } else if (selectedCountry !== 'All') {
    countryText = selectedCountry;
    filterText = `${countryText}`.trim();
  } else if (selectedYear !== 'All') {
    yearText = selectedYear;
    filterText = `${yearText}`.trim();
  } else {
    filterText = '';
  }

  document.getElementById('chart-label-scorecard-weekend').innerHTML = filterText ? `Weekend Summary Sales <br> in ${filterText}` : `Weekend Summary Sales`;
  document.getElementById('chart-label-scorecard-weekday').innerHTML = filterText ? `Weekday Summary Sales <br> in ${filterText}` : `Weekday Summary Sales`;
  document.getElementById('chart-label-pie-weekend').innerHTML = filterText ? `Weekend Sub Category <br> in ${filterText}` : `Weekend Sub Category`;
  document.getElementById('chart-label-pie-weekday').innerHTML = filterText ? `Weekday Sub Category <br> in ${filterText}` : `Weekday Sub Category`;
  document.getElementById('chart-label-bar').innerHTML = filterText ? `Average Sales <br> in ${filterText}` : `Average Sales`;
}


function processData(data, selectedCountry, selectedYear) {
  const filteredData = data.filter(item => {
    const yearMatch = selectedYear === 'All' || item.Sales_Year.toString() === selectedYear;
    const countryMatch = selectedCountry === 'All' || item.Country === selectedCountry;
    return yearMatch && countryMatch;
  });

  const groupedData = {};

  filteredData.forEach(item => {
    if (!groupedData[item.Sub_Category]) {
      groupedData[item.Sub_Category] = {
        weekendTotal: 0,
        weekdayTotal: 0,
        count: 0
      };
    }

    groupedData[item.Sub_Category].weekendTotal += parseFloat(item.Weekend_Average);
    groupedData[item.Sub_Category].weekdayTotal += parseFloat(item.Weekday_Average);
    groupedData[item.Sub_Category].count++;
  });

  const processedData = {
    subCategories: Object.keys(groupedData),
    weekendAverages: Object.values(groupedData).map(group => Math.ceil(group.weekendTotal / group.count)),
    weekdayAverages: Object.values(groupedData).map(group => Math.ceil(group.weekdayTotal / group.count))
  };

  return processedData;
}

let salesChart; // Global variable to store the chart

function createChart(data) {
    if (salesChart) {
      salesChart.destroy(); // Destroy the existing chart if it exists
    }
    
    const ctx = document.getElementById('salesChart').getContext('2d');
    salesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.subCategories,
        datasets: [{
          label: 'Weekend Sales Average',
          data: data.weekendAverages,
          backgroundColor: '#68D2E8',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 1
        }, {
          label: 'Weekday Sales Average',
          data: data.weekdayAverages,
          backgroundColor: '#8DECB4',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false, // Set to false to start from a non-zero value
              callback: function(value, index, values) {
                return Math.floor(value); // Display integers without decimal
              }
            }
          }]
        },
        plugins: {
          datalabels: {
            align: 'end',
            color: 'black'
          }
        }
      },
      plugins: [ChartDataLabels]
    });
}



/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

