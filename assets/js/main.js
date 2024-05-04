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

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }

    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className ='skills__content skills__open'
    }
}

skillsHeader.forEach((el)=>{
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target'),
tabContents= document.querySelectorAll('[data-content')   

tabs.forEach(tab => {
    tab.addEventListener('click',()=>{
        const target= document.querySelector(tab.dataset.target)
  
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})





/*==================== TESTIMONIAL ====================*/
fetch('/assets/json/q1.json')
  .then(response => response.json())
  .then(data => {
    const selectCountryElement = document.getElementById('selectCountry');
    selectCountryElement.addEventListener('change', function() {
      const selectedCountry = this.value;
      const processedData = processData(data, selectedCountry);
      createChart(processedData);
      updateScorecard(processedData);
    });

    // Initial chart creation with all data
    const processedData = processData(data, 'All');
    createChart(processedData);
    updateScorecard(processedData);
    createPieChart(processedData);
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
  
    const weekendPieChart = new Chart(weekendCtx, {
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
            // Tambahkan warna tambahan jika diperlukan
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
        }
      }
    });
  
    const weekdayPieChart = new Chart(weekdayCtx, {
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
            // Tambahkan warna tambahan jika diperlukan
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
        }
      }
    });
  }
  

function processData(data, selectedCountry) {
  const filteredData = data.filter(item => {
    return selectedCountry === 'All' || item.Country === selectedCountry;
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

    // Process data only if the selected country is "All" or matches the current data's country
    if (selectedCountry === 'All' || item.Country === selectedCountry) {
      groupedData[item.Sub_Category].weekendTotal += parseFloat(item.Weekend_Average);
      groupedData[item.Sub_Category].weekdayTotal += parseFloat(item.Weekday_Average);
      groupedData[item.Sub_Category].count++;
    }
  });

  const processedData = {
    subCategories: Object.keys(groupedData),
    weekendAverages: Object.values(groupedData).map(group => Math.ceil((group.weekendTotal / group.count) * 2)),
    weekdayAverages: Object.values(groupedData).map(group => Math.ceil((group.weekdayTotal / group.count) * 2))
  };

  return processedData;
}
let salesChart; // Global variable to store the chart

function createChart(data) {
    if (salesChart) {
      salesChart.destroy(); // Menghancurkan chart yang sudah ada jika ada
    }
    
    const ctx = document.getElementById('salesChart').getContext('2d');
    salesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.subCategories,
        datasets: [{
          label: 'Weekend Sales Average',
          data: data.weekendAverages,
          backgroundColor: '#6A1B9A',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 1
        }, {
          label: 'Weekday Sales Average',
          data: data.weekdayAverages,
          backgroundColor: 'rgb(225,190,231)',
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
                return Math.floor(value); // Menampilkan bilangan bulat tanpa desimal
              }
            }
          }]
        }
      }
    });
  }
  
  
  

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

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

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})