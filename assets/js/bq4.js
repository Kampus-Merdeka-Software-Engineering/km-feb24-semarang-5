const revenue_size = async () => {
    try {
        const response = await fetch('/assets/json/size-revenue.json');
        const revenue_size = await response.json();
        return revenue_size;
    } catch (error) {
        console.error('Error fetching the gender_type data:', error);
        throw error;
    }
};

const revenue_type = async () => {
    try {
        const response = await fetch('/assets/json/type-revenue.json');
        const revenue_type = await response.json();
        return revenue_type;
    } catch (error) {
        console.error('Error fetching the gender_type data:', error);
        throw error;
    }
};

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

const revenue_warna = async () => {
    try {
        const response = await fetch('/assets/json/warna-revenue.json');
        const revenue_warna = await response.json();
        return revenue_warna;
    } catch (error) {
        console.error('Error fetching the gender_warna data:', error);
        throw error;
    }
};

const sizeRevenue = async () => {
    try {
        const data = await revenue_size();

        const selectedCountry = document.getElementById('bq-6-dropdown').value;

        // Update the header with the selected country
        const chartLabelsize = document.getElementById('chart-label-bq6-size');
        chartLabelsize.innerHTML = selectedCountry === 'All' ? 'Bike Size Preference Revenue and Orders' : `Size Revenue & Orders <br> in ${selectedCountry}`;
        const chartLabeltype = document.getElementById('chart-label-bq6-type');
        chartLabeltype.innerHTML = selectedCountry === 'All' ? 'Bike Type Preference Revenue and Orders' : `Type Revenue &  Orders <br> in ${selectedCountry}`;
        const chartLabelcategory = document.getElementById('chart-label-bq6-category');
        chartLabelcategory.innerHTML = selectedCountry === 'All' ? 'Bike Category Preference Revenue and Orders' : `Category Revenue &  Orders <br> in ${selectedCountry}`;
        const chartLabelcolor = document.getElementById('chart-label-bq6-color');
        chartLabelcolor.innerHTML = selectedCountry === 'All' ? 'Bike Color Preference Revenue and Orders' : `Color Revenue &  Orders <br> in ${selectedCountry}`;

        const filteredData = selectedCountry === 'All' ? data : data.filter(item => item.Country === selectedCountry);

       
        const revenueSizeMap = {};
        const orderSizeMap = {};

        filteredData.forEach(item => {
            const Size = item.size;  // Menggunakan 'Size' dari data
            const revenue = Number(item.total_revenue);
            const orderQuantity = Number(item.total_order);

            if (!revenueSizeMap[Size]) {
                revenueSizeMap[Size] = 0;
            }
            if (!orderSizeMap[Size]) {
                orderSizeMap[Size] = 0;
            }

            revenueSizeMap[Size] += revenue;
            orderSizeMap[Size] += orderQuantity;
        });

        const labels = Object.keys(revenueSizeMap).sort((a, b) => a - b);
        const revenueData = labels.map(Size => revenueSizeMap[Size]);
        const orderData = labels.map(Size => orderSizeMap[Size]);

        const ctx = document.getElementById('product-size-canvas').getContext('2d');

        if (sizeRevenueChart) {
            sizeRevenueChart.destroy();
        }

        sizeRevenueChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Revenue',
                        data: revenueData,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Total Order Quantity',
                        data: orderData,
                        type: 'bar',
                        backgroundColor: 'rgba(153, 102, 255, 0.5)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 3,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
                            }
                        }
                    }
                    ,
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        color: 'black'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Size'
                        },
                        ticks:{color:'black'}
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Total Revenue'
                        },
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return `${value}`;
                            },color:'black'
                        }
                    },
                    y1: {
                        title: {
                            display: true,
                            text: 'Total Order Quantity'
                        },
                        beginAtZero: true,
                        position: 'right',
                        ticks: {
                            callback: function(value) {
                                return `${value}`;
                            },color:'black'
                        },
                        grid: {
                            drawOnChartArea: false 
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

const typeRevenue = async () => {
    try {
        const data = await revenue_type();

        const selectedCountry = document.getElementById('bq-6-dropdown').value;
        const filteredData = selectedCountry === 'All' ? data : data.filter(item => item.Country === selectedCountry);
        
        const revenueSizeMap = {};
        const orderSizeMap = {};

        filteredData.forEach(item => {
            const Size = item.type;  
            const revenue = Number(item.total_revenue);
            const orderQuantity = Number(item.total_order);

            if (!revenueSizeMap[Size]) {
                revenueSizeMap[Size] = 0;
            }
            if (!orderSizeMap[Size]) {
                orderSizeMap[Size] = 0;
            }

            revenueSizeMap[Size] += revenue;
            orderSizeMap[Size] += orderQuantity;
        });

        const labels = Object.keys(revenueSizeMap).sort((a, b) => a - b);
        const revenueData = labels.map(Size => revenueSizeMap[Size]);
        const orderData = labels.map(Size => orderSizeMap[Size]);

        const ctx = document.getElementById('product-type-canvas').getContext('2d');
        if (typeRevenueChart) {
            typeRevenueChart.destroy();
        }
        typeRevenueChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Revenue',
                        data: revenueData,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Total Order Quantity',
                        data: orderData,
                        type: 'bar',
                        backgroundColor: 'rgba(153, 102, 255, 0.5)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 3,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
                            }
                        }
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        color: 'black'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Type'
                        }, ticks:{color:'black'}
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Total Revenue'
                        },
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return `${value}`;
                            },color:'black'
                        }
                    },
                    y1: {
                        title: {
                            display: true,
                            text: 'Total Order Quantity'
                        },
                        beginAtZero: true,
                        position: 'right',
                        ticks: {
                            callback: function(value) {
                                return `${value}`;
                            },color:'black'
                        },
                        grid: {
                            drawOnChartArea: false 
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

const subRevenue = async () => {
    try {
        const data = await revenue_sub();

        const selectedCountry = document.getElementById('bq-6-dropdown').value;
        const filteredData = selectedCountry === 'All' ? data : data.filter(item => item.Country === selectedCountry);
        

        const revenueSizeMap = {};
        const orderSizeMap = {};

        filteredData.forEach(item => {
            const Size = item.Sub_Category;  // Menggunakan 'Size' dari data
            const revenue = Number(item.total_revenue);
            const orderQuantity = Number(item.total_order);

            if (!revenueSizeMap[Size]) {
                revenueSizeMap[Size] = 0;
            }
            if (!orderSizeMap[Size]) {
                orderSizeMap[Size] = 0;
            }

            revenueSizeMap[Size] += revenue;
            orderSizeMap[Size] += orderQuantity;
        });


        const labels = Object.keys(revenueSizeMap).sort((a, b) => a.localeCompare(b));
        const revenueData = labels.map(Size => revenueSizeMap[Size]);
        const orderData = labels.map(Size => orderSizeMap[Size]);

        const colors = {
            'Touring Bikes': '#f10090',
            'Mountain Bikes': '#0072f0',
            'Road Bikes': '#ffa800'
        };

        const ctx = document.getElementById('product-sub-canvas').getContext('2d');

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
                        // type: 'bar',
                        backgroundColor: labels.map(Size => colors[Size]),
                        borderColor: 'black',
                        borderWidth: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Total Order Quantity',
                        data: orderData,
                        type: 'bar',
                        backgroundColor: '#FFE6E6' ,
                        borderColor:labels.map(Size => colors[Size]) ,
                        borderWidth: 7,
                        yAxisID: 'y1'
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
                        align: 'end',
                        color: 'black',
                        formatter: (value) => `$${value.toLocaleString()}`
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Sub Category'
                        },ticks:{ color:'black'}
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Total Revenue'
                        },
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return `${value}`;
                            },color:'black'
                        }
                    },
                    y1: {
                        title: {
                            display: true,
                            text: 'Total Order Quantity'
                        },
                        beginAtZero: true,
                        position: 'right',
                        ticks: {
                            callback: function(value) {
                                return `${value}`;
                            },color:'black'
                        },
                        grid: {
                            drawOnChartArea: false 
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

const warnaRevenue = async () => {
    try {
        const data = await revenue_warna();        
        
        const selectedCountry = document.getElementById('bq-6-dropdown').value;
        const filteredData = selectedCountry === 'All' ? data : data.filter(item => item.Country === selectedCountry);


        const revenueSizeMap = {};
        const orderSizeMap = {};



        filteredData.forEach(item => {
            const Size = item.color;  
   
            const revenue = Number(item.total_revenue);
            const orderQuantity = Number(item.total_order);

            if (!revenueSizeMap[Size]) {
                revenueSizeMap[Size] = 0;
            }
            if (!orderSizeMap[Size]) {
                orderSizeMap[Size] = 0;
            }

            revenueSizeMap[Size] += revenue;
            orderSizeMap[Size] += orderQuantity;
        });

        const labels = Object.keys(revenueSizeMap).sort((a, b) => a.localeCompare(b));
        const revenueData = labels.map(Size => revenueSizeMap[Size]);
        const orderData = labels.map(Size => orderSizeMap[Size]);

        const colors = {
            'Red': 'red',
            'Black': 'darkgray',
            'Yellow': '#FEB941',
            'Blue': 'lightblue',
            'Silver': '#F1F1F1'
        };

        const ctx = document.getElementById('product-warna-canvas').getContext('2d');
        if (warnaRevenueChart) {
            warnaRevenueChart.destroy();
        }
        warnaRevenueChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Revenue',
                        data: revenueData,
                        backgroundColor: labels.map(Size => colors[Size] || 'rgba(75, 192, 192, 0.5)'),
                        borderColor: 'black',
                        borderWidth: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Total Order Quantity',
                        data: orderData,
                        type: 'bar',
                        backgroundColor: '#FFE6E6' ,
                        borderColor:labels.map(Size => colors[Size]) ,
                        borderWidth: 7,
                        yAxisID: 'y1'
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
                        align: 'end',
                        color: 'black',
                        formatter: (value) => `$${value.toLocaleString()}`
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Color'
                        },ticks:{
                            color:'black'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Total Revenue'
                        },
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return `${value}`;
                            },
                            color:'black'
                        }
                    },
                    y1: {
                        title: {
                            display: true,
                            text: 'Total Order Quantity'
                        },
                        beginAtZero: true,
                        position: 'right',
                        ticks: {
                            callback: function(value) {
                                return `${value}`;
                            },color:'black'
                        },
                        grid: {
                            drawOnChartArea: false 
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


document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('bq-6-dropdown');
    dropdown.addEventListener('change', () => {
        sizeRevenue();
        typeRevenue();
        subRevenue();
        warnaRevenue();
    });

    // Initial call to render the chart with default data
    sizeRevenue();
    typeRevenue();
    subRevenue();
    warnaRevenue();
});

let sizeRevenueChart;
let typeRevenueChart;
let subRevenueChart;
let warnaRevenueChart;


