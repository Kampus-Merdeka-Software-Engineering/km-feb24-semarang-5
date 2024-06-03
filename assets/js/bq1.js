
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
  
// let revenueChart;