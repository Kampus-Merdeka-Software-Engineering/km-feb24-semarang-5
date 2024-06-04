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

const aggregateMonthlyData = (data) => {
    const aggregatedData = {};

    data.forEach(item => {
        const date = new Date(item.Date);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' }); // Full month name

        if (!aggregatedData[month]) {
            aggregatedData[month] = {
                totalProfit2015: 0,
                totalProfit2016: 0
            };
        }

        if (year === 2015) {
            aggregatedData[month].totalProfit2015 += parseFloat(item.Profit);
        } else if (year === 2016) {
            aggregatedData[month].totalProfit2016 += parseFloat(item.Profit);
        }
    });

    return Object.keys(aggregatedData).map(month => ({
        month,
        totalProfit2015: aggregatedData[month].totalProfit2015,
        totalProfit2016: aggregatedData[month].totalProfit2016
    }));
};

const aggregateMonthlyRevenue = (data) => {
    const aggregatedData = {};

    data.forEach(item => {
        const date = new Date(item.Date);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' }); // Full month name

        if (!aggregatedData[month]) {
            aggregatedData[month] = {
                totalRevenue2015: 0,
                totalRevenue2016: 0
            };
        }

        if (year === 2015) {
            aggregatedData[month].totalRevenue2015 += parseFloat(item.Revenue);
        } else if (year === 2016) {
            aggregatedData[month].totalRevenue2016 += parseFloat(item.Revenue);
        }
    });

    return Object.keys(aggregatedData).map(month => ({
        month,
        totalRevenue2015: aggregatedData[month].totalRevenue2015,
        totalRevenue2016: aggregatedData[month].totalRevenue2016
    }));
};

const aggregateCostData = (data) => {
    const aggregatedData = {};

    data.forEach(item => {
        const date = new Date(item.Date);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' }); // Full month name

        if (!aggregatedData[month]) {
            aggregatedData[month] = {
                totalCost2015: 0,
                totalCost2016: 0
            };
        }

        if (year === 2015) {
            aggregatedData[month].totalCost2015 += parseFloat(item.Cost);
        } else if (year === 2016) {
            aggregatedData[month].totalCost2016 += parseFloat(item.Cost);
        }
    });

    return Object.keys(aggregatedData).map(month => ({
        month,
        totalCost2015: aggregatedData[month].totalCost2015,
        totalCost2016: aggregatedData[month].totalCost2016
    }));
};

const aggregateTotalProduct = (data) => {
    const aggregatedData = {};

    data.forEach(item => {
        const date = new Date(item.Date);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' }); // Full month name

        if (!aggregatedData[month]) {
            aggregatedData[month] = {
                totalSales2015: 0,
                totalSales2016: 0
            };
        }

        const totalSales = parseFloat(item.Order_Quantity) * parseFloat(item.Unit_Price);

        if (year === 2015) {
            aggregatedData[month].totalSales2015 += totalSales;
        } else if (year === 2016) {
            aggregatedData[month].totalSales2016 += totalSales;
        }
    });

    return Object.keys(aggregatedData).map(month => ({
        month,
        totalSales2015: aggregatedData[month].totalSales2015,
        totalSales2016: aggregatedData[month].totalSales2016
    }));
};



const generateSalesChart = (data) => {
    const monthlyData = aggregateTotalProduct(data);

    const labels = monthlyData.map(item => item.month);
    const sales2015 = monthlyData.map(item => item.totalSales2015);
    const sales2016 = monthlyData.map(item => item.totalSales2016);

    const ctx = document.getElementById('Sales-monthly-canvas2').getContext('2d');

    if (window.salesChart) {
        window.salesChart.destroy();
    }

    window.salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Sales 2015',
                    data: sales2015,
                    borderColor: '#C40C0C',
                    backgroundColor: '#C40C0C',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Sales 2016',
                    data: sales2016,
                    borderColor: '#FFBF78',
                    backgroundColor: '#FFBF78',
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                        ,color:'black'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                datalabels: {
                    display: false
                }
            }
        }
    });
};

const generateProfitChart = (data) => {
    const monthlyData = aggregateMonthlyData(data);

    const labels = monthlyData.map(item => item.month);
    const profit2015 = monthlyData.map(item => item.totalProfit2015);
    const profit2016 = monthlyData.map(item => item.totalProfit2016);

    const ctx = document.getElementById('profit-monthly-canvas2').getContext('2d');

    if (window.profitChart) {
        window.profitChart.destroy();
    }

    window.profitChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Profit 2015',
                    data: profit2015,
                    borderColor: '#81689D',
                    backgroundColor: '#81689D',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Profit 2016',
                    data: profit2016,
                    borderColor: '#1F2544',
                    backgroundColor: '#1F2544',
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                        ,color:'black'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                datalabels: {
                    display: false
                }
            }
        }
    });
};

const generateRevenueChart = (data) => {
    const monthlyData = aggregateMonthlyRevenue(data);

    const labels = monthlyData.map(item => item.month);
    const Revenue2015 = monthlyData.map(item => item.totalRevenue2015);
    const Revenue2016 = monthlyData.map(item => item.totalRevenue2016);

    const ctx = document.getElementById('revenue-monthly-canvas2').getContext('2d');

    if (window.revChart) {
        window.revChart.destroy();
    }

    window.revChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Revenue 2015',
                    data: Revenue2015,
                    borderColor: '#B5C18E',
                    backgroundColor: '#B5C18E',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Revenue 2016',
                    data: Revenue2016,
                    borderColor: '#016A70',
                    backgroundColor: '#016A70',
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                        ,color:'black'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                datalabels: {
                    display: false
                }
            }
        }
    });
};

const generateCostChart = (data) => {
    const monthlyData = aggregateCostData(data);

    const labels = monthlyData.map(item => item.month);
    const cost2015 = monthlyData.map(item => item.totalCost2015);
    const cost2016 = monthlyData.map(item => item.totalCost2016);

    const ctx = document.getElementById('cost-monthly-canvas2').getContext('2d');

    if (window.costChart) {
        window.costChart.destroy();
    }

    window.costChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Cost 2015',
                    data: cost2015,
                    borderColor: '#FFB5DA',
                    backgroundColor: '#FFB5DA',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Cost 2016',
                    data: cost2016,
                    borderColor: '#D10363',
                    backgroundColor: '#D10363',
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                        ,color:'black'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                datalabels: {
                    display: false
                }
            }
        }
    });
};

const hexToRgbA = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


typeRevenue = async () => {
    try {
        const data = await fetchSemesterData();

        const productMap = {};

        data.forEach(item => {
            const product = item.Product;
            const productName = product.split(' ')[0];// Get the product name (e.g. "Road-150 Red" -> "Road-150")
            // console.log(productName);
            const revenue = Number(item.Revenue);

            if (!productMap[productName]) {
                productMap[productName] = 0;
            }

            productMap[productName] += revenue;
        });

        const labels = Object.keys(productMap).sort((a, b) => a.localeCompare(b));
        const revenueData = labels.map(productName => productMap[productName]);

        const ctx = document.getElementById('type-chart').getContext('2d');

        if (typeRevenueChart) {
            typeRevenueChart.destroy();
        }

        typeRevenueChart = new Chart(ctx, {
            type: 'bar', // Change to 'horizontalBar'
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Revenue',
                        data: revenueData,
                        backgroundColor: 'green',
                        borderColor: 'black',
                        borderWidth: 1,
                        yAxisID: 'y'
                    }
                ]
            },
            options: {
                indexAxis: 'y', // Add this to make the chart horizontal
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                            }
                        }
                    },
                    datalabels: {
                        anchor: 'iddle',
                        align: 'end',
                        color: 'black',
                        formatter: (value) => `$${value.toLocaleString()}`
                    }
                },
                scales: {
                    y: { // Add this to make the y-axis vertical
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error processing data:', error);
    }
};
let typeRevenueChart;

const initializeDashboard = async () => {
    try {

        // Call the fetchSemesterData function with the selected country and year as query parameters
        const data = await fetchSemesterData();

        // Generate the charts with the filtered data
        generateProfitChart(data);
        generateRevenueChart(data);
        generateCostChart(data);
        generateSalesChart(data);
        PieGender(data);
        warnaRevenue(data);
        usiaRevenueScatter(data);
        subRevenue(data);
        typeRevenue(data);

        // Display scorecards with the filtered data
        displayScorecard(data);

    } catch (error) {
        console.error('Initialization error:', error);
    }
};


document.addEventListener('DOMContentLoaded', initializeDashboard);


const revenue_sub = async () => {
    try {
        const response = await fetch('/assets/json/sub-revenue.json');
        const revenue_sub = await response.json();
        return revenue_sub;
    } catch (error) {
        console.error('Error fetching the gender_sub data:', error);
        throw error;
    }
};
// const subRevenue = async () => {
//     try {
//         const data = await revenue_sub();

//         const revenueSizeMap = {};
//         const orderSizeMap = {};

//         data.forEach(item => {
//             const Size = item.Sub_Category;  // Using 'Size' from the data
//             const revenue = Number(item.total_revenue);

//             if (!revenueSizeMap[Size]) {
//                 revenueSizeMap[Size] = 0;
//             }

//             revenueSizeMap[Size] += revenue;
//         });

//         const labels = Object.keys(revenueSizeMap).sort((a, b) => a.localeCompare(b));
//         const revenueData = labels.map(Size => revenueSizeMap[Size]);

//         const colors = {
//             'Touring Bikes': '#f10090',
//             'Mountain Bikes': '#0072f0',
//             'Road Bikes': '#ffa800'
//         };

//         const ctx = document.getElementById('Subcategories-sales').getContext('2d');

//         if (subRevenueChart) {
//             subRevenueChart.destroy();
//         }

//         subRevenueChart = new Chart(ctx, {
//             type: 'bar',
//             data: {
//                 labels: labels,
//                 datasets: [
//                     {
//                         label: 'Total Revenue',
//                         data: revenueData,
//                         backgroundColor: labels.map(Size => colors[Size]),
//                         borderColor: 'black',
//                         borderWidth: 1,
//                         yAxisID: 'y'
//                     }
//                 ]
//             },
//             options: {
//                 plugins: {
//                     tooltip: {
//                         callbacks: {
//                             label: function(context) {
//                                 return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
//                             }
//                         }
//                     },
//                     datalabels: {
//                         anchor: 'middle',
//                         align: 'end',
//                         color: 'black',
//                         formatter: (value) => `$${value.toLocaleString()}`
//                     }
//                 },
//                 scales: {
//                     x: {
//                         title: {
//                             display: true,
//                             text: 'Sub Category'
//                         },
//                         ticks: { color: 'black' }
//                     },
//                     y: {
//                         title: {
//                             display: true,
//                             text: 'Total Revenue'
//                         },
//                         beginAtZero: true,
//                         ticks: {
//                             callback: function(value) {
//                                 return `${value}`;
//                             },
//                             color: 'black'
//                         }
//                     }
//                 }
//             }
//         });

//     } catch (error) {
//         console.error('Error processing data:', error);
//     }
// };
const subRevenue = async () => {
    try {
        const data = await fetchSemesterData();

        const ScatMap = {};

        data.forEach(item => {
            const category = item.Sub_Category;
            const revenue = Number(item.Revenue);

            if (!ScatMap[category]) {
                ScatMap[category] = 0;
            }
            ScatMap[category] += revenue;
        });

        const labels = Object.keys(ScatMap).sort((a, b) => a.localeCompare(b));
        const revenueData = labels.map(category => ScatMap[category]);

        const warna = {
            'Touring Bikes': '#f10090',
            'Mountain Bikes': '#0072f0',
            'Road Bikes': '#ffa800'
        };

        const defaultColor = '#000000'; // Default color (black)

        const ctx = document.getElementById('Subcategories-sales').getContext('2d');

        if (subRevenueChart) {
            subRevenueChart.destroy();
        }

        subRevenueChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Revenue',
                        data: revenueData,
                        backgroundColor: labels.map(color => warna[color] || defaultColor),
                        borderColor: 'black',
                        borderWidth: 1,
                        yAxisID: 'y'
                    }
                ]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                            }
                        }
                    },
                    datalabels: {
                        anchor: 'iddle',
                        align: 'end',
                        color: 'black',
                        formatter: (value) => `$${value.toLocaleString()}`
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error processing data:', error);
    }
};
let subRevenueChart;

const warnaRevenue = async () => {
    try {
        const data = await fetchSemesterData();

        const colorMap = {};

        data.forEach(item => {
            const product = item.Product;
            const color = product.split(' ')[1].replace(',', ''); // Remove comma from color string
            // console.log(color);
            const revenue = Number(item.Revenue);

            if (!colorMap[color]) {
                colorMap[color] = 0;
            }

            colorMap[color] += revenue;
        });

        const labels = Object.keys(colorMap).sort((a, b) => a.localeCompare(b));
        const revenueData = labels.map(color => colorMap[color]);

        const warna = {
            'Red': 'Red',
            'Black': '#B6BBC4',
            'Yellow': '#FEB941',
            'Blue': 'lightblue',
            'Silver': '#F2F1EB'
        };

        const defaultColor = '#000000'; // Default color (black)

        const ctx = document.getElementById('Color-Sales').getContext('2d');

        if (warnaRevenueChart) {
            warnaRevenueChart.destroy();
        }

        warnaRevenueChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Revenue',
                        data: revenueData,
                        backgroundColor: labels.map(color => warna[color] || defaultColor),
                        borderColor: 'black',
                        borderWidth: 1,
                        yAxisID: 'y'
                    }
                ]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                            }
                        }
                    },
                    datalabels: {
                        anchor: 'middle',
                        align: 'middle',
                        color: 'black',
                        font: {
                            size: 14
                        },
                        // formatter: (value) => `${(value * 100).toLocaleString()}%`
                        formatter: function (value, context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed();
                            return `${percentage}%`;
                        }
                    }
                    
                }
            },
            plugins: [ChartDataLabels]
        });

    } catch (error) {
        console.error('Error processing data:', error);
    }
};
let warnaRevenueChart;


const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const calculateTotalRevenue = (data) => {
    let totalRevenue = 0;
    data.forEach(item => {
        const date = new Date(item.Date);
        const year = date.getFullYear();
        if (year === 2015 || year === 2016) {
            totalRevenue += parseFloat(item.Order_Quantity) * parseFloat(item.Unit_Price);
        }
    });
    return formatNumberWithCommas(totalRevenue.toFixed()); // Return total revenue rounded to 2 decimal places with commas
};

const calculateTotalProductSold = (data) => {
    let totalProductSold = 0;
    data.forEach(item => {
        const date = new Date(item.Date);
        const year = date.getFullYear();
        if (year === 2015 || year === 2016) {
            totalProductSold += parseFloat(item.Order_Quantity);
        }
    });
    return formatNumberWithCommas(totalProductSold);
};

const calculateTotalCustomer = (data) => {
    let totalCustomer = 0;
    data.forEach(item => {
        const date = new Date(item.Date);
        const year = date.getFullYear();
        if (year === 2015 || year === 2016) {
            totalCustomer += 1; // Menghitung jumlah baris yang sesuai
        }
    });
    return formatNumberWithCommas (totalCustomer);
};

const calculateTotalCost = (data) => {
    let totalCost = 0;
    data.forEach(item => {
        const date = new Date(item.Date);
        const year = date.getFullYear();
        if (year === 2015 || year === 2016) {
            totalCost += parseFloat(item.Unit_Cost) * parseFloat(item.Order_Quantity);
        }
    });
    return formatNumberWithCommas(totalCost.toFixed()); // Return total cost rounded to 2 decimal places with commas
};

const calculateTotalSales = (data) => {
    let totalSalesProduct = 0;
    data.forEach(item => {
        const date = new Date(item.Date);
        const year = date.getFullYear();
        if (year === 2015 || year === 2016) {
            totalSalesProduct += parseFloat(item.Unit_Price) * parseFloat(item.Order_Quantity);
        }
    });
    return formatNumberWithCommas(totalSalesProduct.toFixed()); // Return total cost rounded to 2 decimal places with commas
};

const calculateTotalProfit = (data) => {
    let totalProfit = 0;
    data.forEach(item => {
        const date = new Date(item.Date);
        const year = date.getFullYear();
        if (year === 2015 || year === 2016) {
            totalProfit += (parseFloat(item.Unit_Price) - parseFloat(item.Unit_Cost)) * parseFloat(item.Order_Quantity);
        }
    });
    return formatNumberWithCommas(totalProfit.toFixed()); // Return total profit rounded to 2 decimal places with commas
};

const displayScorecard = (data) => {
    document.getElementById('total-revenue').textContent = '$' + calculateTotalRevenue(data);
    document.getElementById('total-product-sold').textContent = calculateTotalProductSold(data);
    document.getElementById('total-Cost').textContent = '$' + calculateTotalCost(data);
    document.getElementById('total-Profit').textContent = '$' + calculateTotalProfit(data);
    document.getElementById('total-customer').textContent = calculateTotalCustomer(data);
    document.getElementById('total-product-sales').textContent = '$' + calculateTotalSales(data);
};

const PieGender = async () => {
    const data = [
        { "Customer_Gender": "Male", "Jumlah": "976", "Country": "United States" },
        { "Customer_Gender": "Female", "Jumlah": "864", "Country": "United States" },
        { "Customer_Gender": "Male", "Jumlah": "151", "Country": "Canada" },
        { "Customer_Gender": "Female", "Jumlah": "159", "Country": "Canada" }
    ];

    const genderOrderMap = data.reduce((acc, item) => {
        const gender = item.Customer_Gender;
        const count = parseInt(item.Jumlah);

        if (!acc[gender]) {
            acc[gender] = 0;
        }
        acc[gender] += count;

        return acc;
    }, {});

    const labels = Object.keys(genderOrderMap);
    const counts = Object.values(genderOrderMap);

    const ctx = document.getElementById('gender-pie-chart2').getContext('2d');

    // Destroy the existing chart if it exists
    if (pieGenChart2) {
        pieGenChart2.destroy();
    }

    pieGenChart2 = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Customer Gender',
                data: counts,
                backgroundColor: ['#A7E6FF', '#FFD0EC'],
                hoverOffset: 4,
                borderColor: 'black',
                borderWidth: 1,
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = counts.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed();
                            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                },datalabels: {
                    anchor: 'middle',
                    align: 'middle',
                    color: 'black',
                    font: {
                        size: 25
                    },
                    formatter: function (value, context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed();
                        return `${percentage}%`;
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
};
let pieGenChart2;

const usiaRevenueScatter = async () => {
    try {
        // Fetch the data from the JSON file
        const data = await fetchSemesterData();
        
        // Membuat objek untuk menyimpan total order quantity berdasarkan usia
        const ageOrderMap = {};        

        // Mengisi objek dengan data total order quantity berdasarkan usia
        data.forEach(item => {
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
        const ctx = document.getElementById('Age-Distribution').getContext('2d');

        if (AgeScatter) {
            AgeScatter.destroy();
        }


        AgeScatter = new Chart(ctx, {
            type: 'bubble',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Age vs Order Quantity',
                    data: orderQuantities,
                    backgroundColor: '#006769',  
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
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
let AgeScatter;
