window.onload = function () {
 //manual input
 var revenueChartCanvas = document.getElementById('revenue-chart-canvas').getContext('2d');
 var revenueChart = new Chart(revenueChartCanvas, {
    type: 'line',
    data: {
        labels: ['2015', '2016'],
        datasets: [{
            label: 'Mountain Bikes',
            backgroundColor: '#0072f0',
            borderColor: '#0072f0',
            borderWidth: 1,
            data: [567784, 1852159]
        }, {
            label: 'Touring Bikes',
            backgroundColor: '#f10096',
            borderColor: '#f10096',
            borderWidth: 1,
            data: [0, 926157]
        }, {
            label: 'Road Bikes',
            backgroundColor: '#ffa800',
            borderColor: '#ffa800',
            borderWidth: 1,
            data: [764133, 1486207]
        }]
    },
    options: {
        layout: {
            padding: {
                right: 30 // Add padding to the right
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Revenue (USD)'
                },
                ticks: {
                    beginAtZero: true,
                    color:'black'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Year'
                },
                ticks:{color: 'black'}
            }
        },
        plugins: {
            datalabels: {
                align: 'end', // Align labels to the end of the data point
                anchor: 'end', // Anchor labels to the end of the data point
                clip: false, // Ensure labels are not clipped
                formatter: function(value) {
                    return value.toLocaleString(); // Format number with commas
                },
                color: 'black' // Set label color to black for better visibility
            }
        }
    },
    plugins: [ChartDataLabels]
    });   
        
    var profitChartCanvas = document.getElementById('profit-chart-canvas').getContext('2d');
    var profitChart = new Chart(profitChartCanvas, {
        type: 'bar',
        data: {
            labels: ['2015', '2016'],
            datasets: [{
                label: 'Mountain Bikes',
                backgroundColor: '#0072f0',
                borderColor: '#0072f0',
                borderWidth: 1,
                data: [230467, 747028]
            }, {
                label: 'Touring Bikes',
                backgroundColor: '#f10096',
                borderColor: '#f10096',
                borderWidth: 1,
                data: [0, 309451]
            }, {
                label: 'Road Bikes',
                backgroundColor: '#ffa800',
                borderColor: '#ffa800',
                borderWidth: 1,
                data: [245152, 486196]
            }]
        },
        options: {
            indexAxis: 'y', // Menjadikan sumbu y sebagai sumbu kategori
            scales: {
                y: {
                    beginAtZero: true,
                    title : {
                        display: true,
                        text: 'Year'
                    },ticks:{color: 'black'}
                },
                x :{
                    title : {
                        display: true,
                        text: 'Profit'
                    },ticks:{color: 'black'}
                },
                
            }
            ,plugins: {                        
                datalabels: {
                    align: 'end',
                    color:'black'                            
                }
            }
        },plugins:[ChartDataLabels]
    });


    var costChartCanvas = document.getElementById('cost-chart-canvas').getContext('2d');
    var costChart = new Chart(costChartCanvas, {
        type: 'bar',
        data: {
            labels: ['2015', '2016'],
            datasets: [{
                label: 'Mountain Bikes',
                backgroundColor: '#0072f0',
                borderColor: '#0072f0',
                borderWidth: 1,
                data: [1105, 1040]
            }, {
                label: 'Touring Bikes',
                backgroundColor: '#f10096',
                borderColor: '#f10096',
                borderWidth: 1,
                data: [0, 1139]
            }, {
                label: 'Road Bikes',
                backgroundColor: '#ffa800',
                borderColor: '#ffa800',
                borderWidth: 1,
                data: [1273, 1203]
            }]
        },
        options: {
            indexAxis: 'x', // Menjadikan sumbu y sebagai sumbu kategori
            scales: {
                y: {
                    beginAtZero: true, // Mulai dari nol di sumbu x
                    title :{
                        display: true,
                        text: 'Unit Cost'
                    },ticks:{color: 'black'}
                },
                x :{
                    ticks:{color: 'black'}
                },
            },plugins: {                        
                datalabels: {
                    align: 'end',
                    color:'black'                            
                }
            },
        },plugins:[ChartDataLabels]
        
    });

    var priceChartCanvas = document.getElementById('price-chart-canvas').getContext('2d');
    var priceChart = new Chart(priceChartCanvas, {
        type: 'bar',
        data: {
            labels: ['2015', '2016'],
            datasets: [{
                label: 'Mountain Bikes',
                backgroundColor: '#0072f0',
                borderColor: '#0072f0',
                borderWidth: 1,
                data: [2025, 1903]
            }, {
                label: 'Touring Bikes',
                backgroundColor: '#f10096',
                borderColor: '#f10096',
                borderWidth: 1,
                data: [0, 1833]
            }, {
                label: 'Road Bikes',
                backgroundColor: '#ffa800',
                borderColor: '#ffa800',
                borderWidth: 1,
                data: [2064, 1944]
            }]
        },
        options: {
            scales: {
                y :{
                    title: {
                        display: true,
                        text: 'Unit Price'
                    },ticks:{color: 'black'}
                },
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        color:'black'
                    }
                }]
            }
            ,plugins: {                        
                datalabels: {
                    align: 'end',
                    color:'black'                            
                }
            },
        },
        plugins:[ChartDataLabels]
    });

    // Grafik Produk
    var productChartCanvas = document.getElementById('product-chart-canvas').getContext('2d');
    var productChart = new Chart(productChartCanvas, {
        type: 'bar',
        data: {
            labels: ['2015', '2016'],
            datasets: [{
                label: 'Mountain Bikes',
                backgroundColor: '#0072f0',
                borderColor: '#0072f0',
                borderWidth: 1,
                data: [21, 24]
            }, {
                label: 'Touring Bikes',
                backgroundColor: '#f10096',
                borderColor: '#f10096',
                borderWidth: 1,
                data: [0, 21]
            }, {
                label: 'Road Bikes',
                backgroundColor: '#ffa800',
                borderColor: '#ffa800',
                borderWidth: 1,
                data: [34, 35]
            }]
        },
        options: {
            scales: {
                y :{
                    title: {
                        display: true,
                        text: 'Total Product'
                    },ticks:{color: 'black'}
                },
                x :{
                    title: {
                        display: true,
                        text: 'Year'
                    },ticks:{color: 'black'}
                },
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },plugins: {                        
                datalabels: {
                    align: 'end',
                    color:'black'                            
                }
            },
        },plugins:[ChartDataLabels]
    });
}

// Revenue By Month 
const revenue_month = async () => {
    try {
        const response = await fetch('/assets/json/revenue_month.json');
        const revenue_month = await response.json();
        return revenue_month;
    } catch (error) {
        console.error('Error fetching the gender_type data:', error);
        throw error;
    }
  };
// Fungsi untuk membuat chart
const RevenueMonthBar = async () => {
    
    const data = await revenue_month();

    // Filter data untuk tahun 2015 dan 2016
    const data2015 = data.filter(entry => entry.Sales_Year === "2015");
    const data2016 = data.filter(entry => entry.Sales_Year === "2016");

    // Mendapatkan bulan unik
    const uniqueMonths = [...new Set(data.map(entry => entry.Month))];

    // Mendapatkan pendapatan untuk setiap bulan untuk tahun 2015 dan 2016
    const revenues2015 = uniqueMonths.map(month => {
        const entry = data2015.find(entry => entry.Month === month);
        return entry ? parseInt(entry.Revenue) : 0;
    });

    const revenues2016 = uniqueMonths.map(month => {
        const entry = data2016.find(entry => entry.Month === month);
        return entry ? parseInt(entry.Revenue) : 0;
    });

    // Membuat chart
    const ctx = document.getElementById('revenue-monthly-canvas').getContext('2d');
    const revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: uniqueMonths,
            datasets: [
                {
                    label: 'Revenue 2015',
                    data: revenues2015,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Revenue 2016',
                    data: revenues2016,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value, index, values) {
                            return '$' + value.toLocaleString();
                        },color:'black'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
                
            }
        }
    });
};



  

//fetch semester 

const fetchSemesterData = async () => {
    try {
        const response = await fetch('/assets/json/semester.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching the semester data:', error);
        throw error;
    }
};


const TopProduct = async () => {
    try {
        let chart;
        const originalData = await fetchSemesterData();
        
        // Ambil daftar negara dari data
        const countries = [...new Set(originalData.map(item => item.Country))];

        // Buat dropdown untuk negara
        const countryDropdown = document.getElementById('country-dropdown');
        
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countryDropdown.appendChild(option);
        });

        // Fungsi untuk membuat grafik berdasarkan data yang diberikan
        function createChart(data) {
            if (chart) {
                chart.destroy();
            }

            // Objek untuk menyimpan nilai maksimum untuk setiap kolom
            const maxValues = {
                Order_Quantity: { value: -Infinity, product: null, color: '#C3FF93', label: 'Order Quantity' },
                Unit_Cost: { value: -Infinity, product: null, color: '#F5FAC8', label: 'Unit Cost' },
                Unit_Price: { value: -Infinity, product: null, color: '#EA906C', label: 'Unit Price' },
                Profit: { value: -Infinity, product: null, color: '#82C7EB', label: 'Profit' },
                Revenue: { value: -Infinity, product: null, color: '#8EA1F0', label: 'Revenue' },
            };

            // Iterasi melalui data JSON
            data.forEach(item => {
                // Iterasi melalui setiap kolom
                for (const column in maxValues) {
                    const value = parseInt(item[column]);
                    // Periksa apakah nilai saat ini lebih besar dari nilai maksimum yang ada
                    if (value > maxValues[column].value) {
                        // Jika ya, perbarui nilai maksimum, warna, dan simpan informasi produk yang terkait
                        maxValues[column].value = value;
                        maxValues[column].product = item.Product;
                    }
                }
            });

            // Mengambil label dan data untuk diagram batang
            const labels = Object.values(maxValues).map(item => item.label); // Nama kolom sebagai label sumbu Y
            const dataValues = Object.values(maxValues).map(item => item.value); // Nilai sebagai data sumbu X
            const products = Object.values(maxValues).map(item => item.product); // Produk sebagai label sumbu X
            const colors = Object.values(maxValues).map(item => item.color); // Warna sebagai warna batang

            const ctx = document.getElementById('top-product-chart-canvas').getContext('2d');
            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: products,
                    datasets: [{
                        label: 'Value',
                        data: dataValues,
                        backgroundColor: colors
                    }]
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value, index, values) {
                                    return labels[index];
                                },color:'black'
                            },
                            title: {
                                display: true,
                                text: 'Value'
                            }
                        }
                    },
                    plugins: {                        
                        datalabels: {
                            align: 'end',
                            color:'black'                            
                        }
                    },
                },
                plugins: [ChartDataLabels]
            });
        }

        // Event listener untuk perubahan dropdown negara
        countryDropdown.addEventListener('change', function () {
            const selectedCountry = this.value;

            // Reset dan nonaktifkan dropdown pengurutan ketika negara baru dipilih
            const sortDropdown = document.getElementById('sort-dropdown');
            sortDropdown.value = 'Choose Sort';
            sortDropdown.disabled = false;

            // Filter data berdasarkan negara yang dipilih
            let filteredData = originalData;
            if (selectedCountry !== 'All Countries') {
                filteredData = originalData.filter(item => item.Country === selectedCountry);
                document.getElementById('chart-title').textContent = `Top Products in ${selectedCountry}`;
            } else {
                // Jika negara yang dipilih adalah 'All Countries'
                document.getElementById('chart-title').textContent = 'Top Products';
            }

            // Buat ulang grafik berdasarkan data yang difilter
            createChart(filteredData);

            // Kosongkan chartDataContainer jika dropdown pengurutan tidak dipilih
            document.getElementById('chartDataContainer').innerHTML = 'please choose sorting values, to get summary';
        });
        
        // Event listener untuk perubahan dropdown urutan
        document.getElementById('sort-dropdown').addEventListener('change', function () {
            const selectedSort = this.value;

            if (selectedSort === 'Choose Sort') {
                alert('Please choose a sort option.');
                // Kosongkan chartDataContainer jika dropdown pengurutan tidak dipilih
                document.getElementById('chartDataContainer').innerHTML = 'please choose sorting values, to get summary';
                return;
            }

            // Ambil data yang sudah difilter
            const selectedCountry = document.getElementById('country-dropdown').value;
            let filteredData = originalData;
            if (selectedCountry !== 'All Countries') {
                filteredData = originalData.filter(item => item.Country === selectedCountry);
            }

            // Urutkan data berdasarkan nilai yang dipilih
            filteredData.sort((a, b) => {
                // Mengurutkan secara ascending (menaik)
                if (selectedSort === 'asc') {
                    return a.Order_Quantity - b.Order_Quantity;
                }
                // Mengurutkan secara descending (menurun)
                else if (selectedSort === 'desc') {
                    return b.Order_Quantity - a.Order_Quantity;
                }
            });

            // Objek untuk menyimpan nilai maksimum dan minimum untuk setiap kolom
            const maxValues = {
                Order_Quantity: { value: -Infinity, product: null, color: '#C3FF93', label: 'Order Quantity' },
                Unit_Cost: { value: -Infinity, product: null, color: '#F5FAC8', label: 'Unit Cost' },
                Unit_Price: { value: -Infinity, product: null, color: '#EA906C', label: 'Unit Price' },
                Profit: { value: -Infinity, product: null, color: '#82C7EB', label: 'Profit' },
                Revenue: { value: -Infinity, product: null, color: '#8EA1F0', label: 'Revenue' },
            };

            const minValues = {
                Order_Quantity: { value: Infinity, product: null, color: '#C3FF93', label: 'Order Quantity' },
                Unit_Cost: { value: Infinity, product: null, color: '#F5FAC8', label: 'Unit Cost' },
                Unit_Price: { value: Infinity, product: null, color: '#EA906C', label: 'Unit Price' },
                Profit: { value: Infinity, product: null, color: '#82C7EB', label: 'Profit' },
                Revenue: { value: Infinity, product: null, color: '#8EA1F0', label: 'Revenue' },
            };

            // Iterasi melalui data yang diurutkan untuk memperbarui nilai maksimum dan minimum
            filteredData.forEach(item => {
                for (const column in maxValues) {
                    const value = parseInt(item[column]);
                    if (value > maxValues[column].value) {
                        maxValues[column].value = value;
                        maxValues[column].product = item.Product;
                    }
                    if (value < minValues[column].value) {
                        minValues[column].value = value;
                        minValues[column].product = item.Product;
                    }
                }
            });

            // Mengambil label dan data untuk diagram batang berdasarkan nilai maksimum atau minimum yang baru
            const labels = selectedSort === 'asc' ? Object.values(minValues).map(item => item.label) : Object.values(maxValues).map(item => item.label);
            const dataValues = selectedSort === 'asc' ? Object.values(minValues).map(item => item.value) : Object.values(maxValues).map(item => item.value);
            const products = selectedSort === 'asc' ? Object.values(minValues).map(item => item.product) : Object.values(maxValues).map(item => item.product);
            const colors = selectedSort === 'asc' ? Object.values(minValues).map(item => item.color) : Object.values(maxValues).map(item => item.color);

            // Perbarui grafik dengan data yang diperbarui
            chart.data.labels = products;
            chart.data.datasets[0].data = dataValues;
            chart.data.datasets[0].backgroundColor = colors;
            chart.update();

            // Tampilkan data chart hanya jika dropdown pengurutan dipilih
            const labelsHTML = labels.map((label, index) => `<br> - Top Product by ${label} : ${dataValues[index]}, ${products[index]}`);
            const chartDataHTML = `
                <p style="text-align: left; text-align-last: left ; color: #000000;">
                    Based on the first semester of 2015 and 2016
                    ${labelsHTML.join('')}
                </p>`;
            document.getElementById('chartDataContainer').innerHTML = chartDataHTML;
        });

        // Panggil fungsi untuk membuat grafik berdasarkan semua data saat pertama kali dimuat
        createChart(originalData);
    } catch (error) {
        console.error('Error fetching the semester data:', error);
    }
};


const usiaRevenueScatter = async () => {
    try {
        // Fetch the data from the JSON file
        const data = await fetchSemesterData();

        const selectedCountry = document.getElementById('bq-4-dropdown').value;

        const filteredData = selectedCountry === 'All' ? data : data.filter(item => item.Country === selectedCountry);

        
        // Membuat objek untuk menyimpan total order quantity berdasarkan usia
        const ageOrderMap = {};        

        // Mengisi objek dengan data total order quantity berdasarkan usia
        filteredData.forEach(item => {
            const customerAge = Number(item.Customer_Age);
            const revenue = Number(item.Revenue);

            if (!ageOrderMap[customerAge]) {
                ageOrderMap[customerAge] = 0;
            }
            ageOrderMap[customerAge] += revenue;
        });

        // Menyiapkan data untuk bar chart
        const labels = Object.keys(ageOrderMap).sort((a, b) => a - b); // Sorting the ages
        const orderQuantities = labels.map(age => ageOrderMap[age]);

        // Buat bar chart
        const ctx = document.getElementById('age-revenue-scatter-canvas').getContext('2d');

        if (RevenuAgebar) {
            RevenuAgebar.destroy();
        }


        RevenuAgebar = new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Age vs Order Quantity',
                    data: orderQuantities,
                    backgroundColor: 'rgb(240,98,146)',  
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Customer Age'
                        },
                        type: 'linear', // Ensuring x-axis is treated as categories
                        min: 10, // Mulai dari usia 0
                        max: 80, // Berakhir pada usia 100
                        stepSize: 10, // Langkah interval 10 tahun
                        ticks: {
                            callback: function(value) {
                                return `${value}`; // Label untuk setiap interval
                            },color:'black'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Revenue'
                        },
                        ticks: {
                            stepSize: 1,
                            beginAtZero: true, // Ensuring y-axis starts from zero
                            color:'black'
                        }
                    }
                }
            } 
        });
    } catch (error) {
        console.error('Error processing data:', error);
    }
};

const usiaRevenue = async () => {
    try {
        // Fetch the data from the JSON file
        const data = await fetchSemesterData();

        const selectedCountry = document.getElementById('bq-4-dropdown').value;

        const filteredData = selectedCountry === 'All' ? data : data.filter(item => item.Country === selectedCountry);

        // Membuat objek untuk menyimpan total pendapatan berdasarkan kelompok usia
        const ageRevenueMap = {};

        // Mengisi objek dengan data total pendapatan berdasarkan kelompok usia
        filteredData.forEach(item => {
            const customerAge = Number(item.Customer_Age);
            const revenue = Number(item.Revenue);

            let ageGroup;
            if (customerAge >= 17 && customerAge <= 25) {
                ageGroup = '17-25';
            } else if (customerAge >= 26 && customerAge <= 35) {
                ageGroup = '26-35';
            } else if (customerAge >= 36 && customerAge <= 45) {
                ageGroup = '36-45';
            } else if (customerAge >= 46 && customerAge <= 55) {
                ageGroup = '46-55';
            } else if (customerAge >= 56 && customerAge <= 65) {
                ageGroup = '56-65';
            } else {
                ageGroup = '66+';
            }

            if (!ageRevenueMap[ageGroup]) {
                ageRevenueMap[ageGroup] = 0;
            }
            ageRevenueMap[ageGroup] += revenue;
        });

        // Menyiapkan data untuk bar chart
        const labels = ['17-25', '26-35', '36-45', '46-55','56-65', '66+'];
        const revenues = labels.map(ageGroup => ageRevenueMap[ageGroup] || 0);

        // Format number with thousand separators
        const numberWithThousandSeparators = (number) => {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        // Buat bar chart
        const ctx = document.getElementById('age-revenue-bar-canvas').getContext('2d');
        if (RevenueAge) {
            RevenueAge.destroy();
        }
        RevenueAge = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Revenue',
                    data: revenues,
                    backgroundColor: 'rgb(240,98,146)', // Warna batang
                }]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: $${numberWithThousandSeparators(context.raw)}`;
                            }
                        }
                    },
                    datalabels: {
                        align: 'end',
                        color:'black',
                        formatter: (value, context) => {
                            return `$${numberWithThousandSeparators(value)}`;
                        }
                    }
                },
                indexAxis: 'y',
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Revenue'
                        },
                        beginAtZero: true, // Ensuring x-axis starts from zero
                        ticks: {
                            callback: function(value) {
                                return `$${numberWithThousandSeparators(value)}`;
                            },color:'black'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Age Group'
                        },
                        ticks:{
                            color:'black'
                        },
                        type: 'category', // Ensuring y-axis is treated as categories
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    } catch (error) {
        console.error('Error processing the semester data:', error);
    }
};

const usiaOrder = async () => {
    try {
        // Fetch the data from the JSON file
        const data = await fetchSemesterData();

        const selectedCountry = document.getElementById('bq-4-dropdown').value;
        

        // Update the header with the selected country
        const chartLabelRevenue = document.getElementById('chart-age-order');
        chartLabelRevenue.innerHTML = selectedCountry === 'All' ? 'Customers Age by Order Quanitity' : `Customers Age by Order Quanitity <br> in ${selectedCountry}`;
        const chartLabelorder = document.getElementById('chart-age-revenue');
        chartLabelorder.innerHTML = selectedCountry === 'All' ? 'Customers Age by Revenue' : `Customers Age by Revenue <br> in ${selectedCountry}`;

        const filteredData = selectedCountry === 'All' ? data : data.filter(item => item.Country === selectedCountry);


        // Create an object to store the total orders by age group
        const ageOrderMap = {};

        // Populate the object with total orders by age group
        filteredData.forEach(item => {
            const customerAge = Number(item.Customer_Age);
            const orderQuantity = Number(item.Order_Quantity);

            let ageGroup;
            if (customerAge >= 17 && customerAge <= 25) {
                ageGroup = '17-25';
            } else if (customerAge >= 26 && customerAge <= 35) {
                ageGroup = '26-35';
            } else if (customerAge >= 36 && customerAge <= 45) {
                ageGroup = '36-45';
            } else if (customerAge >= 46 && customerAge <= 55) {
                ageGroup = '46-55';
            } else if (customerAge >= 56 && customerAge <= 65) {
                ageGroup = '56-65';
            } else {
                ageGroup = '66+';
            }

            if (!ageOrderMap[ageGroup]) {
                ageOrderMap[ageGroup] = 0;
            }
            ageOrderMap[ageGroup] += orderQuantity;
        });

        // Prepare data for bar chart
        const labels = ['17-25', '26-35', '36-45', '46-55','56-65' ,'66+'];
        const orders = labels.map(ageGroup => ageOrderMap[ageGroup] || 0);

        // Format number with thousand separators
        const numberWithThousandSeparators = (number) => {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        // Create bar chart
        const ctx = document.getElementById('age-order-bar-canvas').getContext('2d');

        if (orderAge){
            orderAge.destroy();
        }
        orderAge = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Order Quantity',
                    data: orders,
                    backgroundColor: 'green', // Color of the bars
                }]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${numberWithThousandSeparators(context.raw)}`;
                            }
                        }
                    }
                    ,
                    datalabels: {
                        align: 'end',
                        color:'black',
                        formatter: (value, context) => {
                            return numberWithThousandSeparators(value);
                        }
                    }
                },
                indexAxis: 'y',
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Order Quantity'
                        },
                        beginAtZero: true, // Ensuring x-axis starts from zero
                        ticks: {
                            callback: function(value) {
                                return numberWithThousandSeparators(value);
                            },color:'black'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Age Group'
                        },
                        ticks:{color:'black'},
                        type: 'category' // Ensuring y-axis is treated as categories
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    } catch (error) {
        console.error('Error processing the semester data:', error);
    }
};

const usiaOrderScatter = async () => {
    try {
        // Fetch the data from the JSON file
        const data = await fetchSemesterData();

        const selectedCountry = document.getElementById('bq-4-dropdown').value;

        const filteredData = selectedCountry === 'All' ? data : data.filter(item => item.Country === selectedCountry);

        
        // Membuat objek untuk menyimpan total order quantity berdasarkan usia
        const ageOrderMap = {};

        // Mengisi objek dengan data total order quantity berdasarkan usia
        filteredData.forEach(item => {
            const customerAge = Number(item.Customer_Age);
            const orderQuantity = Number(item.Order_Quantity);

            if (!ageOrderMap[customerAge]) {
                ageOrderMap[customerAge] = 0;
            }
            ageOrderMap[customerAge] += orderQuantity;
        });

        // Menyiapkan data untuk bar chart
        const labels = Object.keys(ageOrderMap).sort((a, b) => a - b);
        const orderQuantities = labels.map(age => ageOrderMap[age]);

        // Format number with thousand separators
        const numberWithThousandSeparators = (number) => {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        // Buat bar chart
        const ctx = document.getElementById('age-order-scatter-canvas').getContext('2d');

        if (orderAgebar) {
            orderAgebar.destroy();
        } 
        orderAgebar = new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Order Quantity',
                    data: orderQuantities,
                    backgroundColor: 'green', // Warna batang
                }]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${numberWithThousandSeparators(context.raw)}`;
                            }
                        },datalabels: {
                            color:'black'
                        }
                    }
                    
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Customer Age'
                        },
                        type: 'linear', // Menggunakan skala linier
                        min: 10, // Mulai dari usia 0
                        max: 80, // Berakhir pada usia 100
                        stepSize: 10, // Langkah interval 10 tahun
                        ticks: {
                            callback: function(value) {
                                return `${value}`; // Label untuk setiap interval
                            },color:'black'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Order Quantity'
                        },
                        beginAtZero: true, // Ensuring y-axis starts from zero
                        ticks: {
                            callback: function(value) {
                                return numberWithThousandSeparators(value);
                            },color:'black'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error processing data:', error);
    }
};





document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('bq-4-dropdown');
    dropdown.addEventListener('change', () => {
        usiaRevenue();
        usiaOrderScatter();
        usiaOrder();
        usiaRevenueScatter();
    });

    // Initial call to render the chart with default data
    usiaRevenue();
    usiaOrderScatter();
    usiaOrder();
    usiaRevenueScatter();
});
let orderAgebar;
let orderAge;
let RevenuAgebar;
let RevenueAge;

TopProduct();
RevenueMonthBar();