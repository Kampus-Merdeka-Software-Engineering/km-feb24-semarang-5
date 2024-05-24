const gender_size = async () => {
    try {
        const response = await fetch('/assets/json/size-gen.json');
        const gender_size = await response.json();
        return gender_size;
    } catch (error) {
        console.error('Error fetching the gender_size data:', error);
        throw error;
    }
};

const gender_type = async () => {
    try {
        const response = await fetch('/assets/json/type-gen.json');
        const gender_type = await response.json();
        return gender_type;
    } catch (error) {
        console.error('Error fetching the gender_type data:', error);
        throw error;
    }
};

const gender_sub = async () => {
    try {
        const response = await fetch('/assets/json/sub-gen.json');
        const gender_sub = await response.json();
        return gender_sub;
    } catch (error) {
        console.error('Error fetching the gender_sub data:', error);
        throw error;
    }
};

const gender_warna = async () => {
    try {
        const response = await fetch('/assets/json/warna-gen.json');
        const gender_warna = await response.json();
        return gender_warna;
    } catch (error) {
        console.error('Error fetching the gender_warna data:', error);
        throw error;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('bq-5-dropdown');
    dropdown.addEventListener('change', () => {
        sizeGender();
        typeGender();
        SubGender();
        warnaGender();
        PieGender();
    });

    // Initial call to render the chart with default data
    sizeGender();
    typeGender();
    SubGender();
    warnaGender();
    PieGender();
});

let sizeChart;
let typeChart;
let subChart;
let warnaChart;
let pieGenChart;

const sizeGender = async () => {
    try {
        const data = await gender_size();

        const selectedCountry = document.getElementById('bq-5-dropdown').value;

        // Update the header with the selected country
        const chartLabelComposition = document.getElementById('chart-label-bq5-composition');
        chartLabelComposition.innerHTML = selectedCountry === 'All' ? 'Composition Gender' : `Composition Gender <br> in ${selectedCountry}`;
        const chartLabelsize = document.getElementById('chart-label-bq5-size');
        chartLabelsize.innerHTML = selectedCountry === 'All' ? 'Bike Size Preference Orders' : `Size Preference Orders <br> in ${selectedCountry}`;
        const chartLabeltype = document.getElementById('chart-label-bq5-type');
        chartLabeltype.innerHTML = selectedCountry === 'All' ? 'Bike Type Preference Orders' : `Type Preference Orders <br> in ${selectedCountry}`;
        const chartLabelcategory = document.getElementById('chart-label-bq5-category');
        chartLabelcategory.innerHTML = selectedCountry === 'All' ? 'Bike Category Preference Orders' : `Category Preference Orders <br> in ${selectedCountry}`;
        const chartLabelcolor = document.getElementById('chart-label-bq5-color');
        chartLabelcolor.innerHTML = selectedCountry === 'All' ? 'Bike Color Preference Orders' : `Color Preference Orders <br> in ${selectedCountry}`;

        const filteredData = selectedCountry === 'All' ? data : data.filter(item => item.Country === selectedCountry);

        const genderOrderMap = {};

        filteredData.forEach(item => {
            const customerGender = item.Customer_Gender;
            const orderQuantity = Number(item.total_order);
            const Size = item.size;

            if (!genderOrderMap[customerGender]) {
                genderOrderMap[customerGender] = {};
            }
            if (!genderOrderMap[customerGender][Size]) {
                genderOrderMap[customerGender][Size] = 0;
            }
            genderOrderMap[customerGender][Size] += orderQuantity;
        });

        const labels = Object.keys(genderOrderMap['M'] || {}).sort((a, b) => a - b);
        const datasets = ['M', 'F'].map(gender => {
            const backgroundColor = gender === 'F' ? 'pink' : 'blue';
            const data = labels.map(Size => genderOrderMap[gender]?.[Size] || 0);
            return {
                label: gender === 'F' ? 'Female' : 'Male',
                data: data,
                backgroundColor: backgroundColor,
            };
        });

        const ctx = document.getElementById('gender-size').getContext('2d');

        if (sizeChart) {
            sizeChart.destroy();
        }

        sizeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets,
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
                            text: 'Size'
                        },
                        ticks : {                        
                            color: 'black'
                        }                  
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Order Quantity'
                        },
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return `${value}`;
                            },
                            color: 'black'
                            
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

const typeGender = async () => {
    try {
        const data = await gender_type();

        const selectedCountry = document.getElementById('bq-5-dropdown').value;

        const filteredData = selectedCountry === 'All' ? data : data.filter(item => item.Country === selectedCountry);

        const genderOrderMap = {};

        filteredData.forEach(item => {
            const customerGender = item.Customer_Gender;
            const orderQuantity = parseInt(item.total_order);
            const type = item.type;

            if (!genderOrderMap[customerGender]) {
                genderOrderMap[customerGender] = {};
            }
            if (!genderOrderMap[customerGender][type]) {
                genderOrderMap[customerGender][type] = 0;
            }
            genderOrderMap[customerGender][type] += orderQuantity;
        });

        const labels = Object.keys(genderOrderMap['M'] || {}).sort();
        const datasets = ['M', 'F'].map(gender => {
            const backgroundColor = gender === 'F' ? 'pink' : 'blue';
            const data = labels.map(type => genderOrderMap[gender]?.[type] || 0);
            return {
                label: gender === 'F' ? 'Female' : 'Male',
                data: data,
                backgroundColor: backgroundColor,
            };
        });

        const ctx = document.getElementById('gender-type').getContext('2d');

        if (typeChart) {
            typeChart.destroy();
        }

        typeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets,
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
                        },
                        ticks:{color: 'black'}
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Order Quantity'
                        },
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return `${value}`;
                            },
                            color: 'black'
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

const SubGender = async () => {
    try {
        const data = await gender_sub();

        const selectedCountry = document.getElementById('bq-5-dropdown').value;

        const filteredData = selectedCountry === 'All' ? data : data.filter(item => item.Country === selectedCountry);

        const genderOrderMap = {};

        filteredData.forEach(item => {
            const customerGender = item.Customer_Gender;
            const orderQuantity = parseInt(item.total_order);
            const type = item.Sub_Category;

            if (!genderOrderMap[customerGender]) {
                genderOrderMap[customerGender] = {};
            }
            if (!genderOrderMap[customerGender][type]) {
                genderOrderMap[customerGender][type] = 0;
            }
            genderOrderMap[customerGender][type] += orderQuantity;
        });

        const labels = Object.keys(genderOrderMap['M'] || {}).sort();
        const datasets = ['M', 'F'].map(gender => {
            const backgroundColor = gender === 'F' ? 'pink' : 'blue';
            const data = labels.map(type => genderOrderMap[gender]?.[type] || 0);
            return {
                label: gender === 'F' ? 'Female' : 'Male',
                data: data,
                backgroundColor: backgroundColor,
            };
        });

        const ctx = document.getElementById('gender-category').getContext('2d');

        if (subChart) {
            subChart.destroy();
        }

        subChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets,
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
                            text: 'Sub Category'
                        },
                        ticks:{color: 'black'}
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Order Quantity'
                        },
                        color: 'black',
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return `${value}`;
                            }
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

const warnaGender = async () => {
    try {
        const data = await gender_warna();

        const selectedCountry = document.getElementById('bq-5-dropdown').value;

        const filteredData = selectedCountry === 'All' ? data : data.filter(item => item.Country === selectedCountry);

        const genderOrderMap = {};

        filteredData.forEach(item => {
            const customerGender = item.Customer_Gender;
            const orderQuantity = parseInt(item.total_order);
            const type = item.color;

            if (!genderOrderMap[customerGender]) {
                genderOrderMap[customerGender] = {};
            }
            if (!genderOrderMap[customerGender][type]) {
                genderOrderMap[customerGender][type] = 0;
            }
            genderOrderMap[customerGender][type] += orderQuantity;
        });

        const labels = Object.keys(genderOrderMap['M'] || {}).sort();
        const datasets = ['M', 'F'].map(gender => {
            const backgroundColor = gender === 'F' ? 'pink' : 'blue';
            const data = labels.map(type => genderOrderMap[gender]?.[type] || 0);
            return {
                label: gender === 'F' ? 'Female' : 'Male',
                data: data,
                backgroundColor: backgroundColor,
            };
        });

        const ctx = document.getElementById('gender-warna').getContext('2d');

        if (warnaChart) {
            warnaChart.destroy();
        }

        warnaChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets,
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
                            text: 'Color'
                        },
                        ticks:{color: 'black'}
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Order Quantity'
                        },
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return `${value}`;
                            },color: 'black'
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


const PieGender = async () => {
    const data = [
        { "Customer_Gender": "M", "Jumlah": "976", "Country": "United States" },
        { "Customer_Gender": "F", "Jumlah": "864", "Country": "United States" },
        { "Customer_Gender": "M", "Jumlah": "151", "Country": "Canada" },
        { "Customer_Gender": "F", "Jumlah": "159", "Country": "Canada" }
    ];

    const selectedCountry = document.getElementById('bq-5-dropdown').value;
    const filteredData = selectedCountry === 'All' ? data : data.filter(item => item.Country === selectedCountry);

    const genderOrderMap = filteredData.reduce((acc, item) => {
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

    const ctx = document.getElementById('gender-pie-chart').getContext('2d');

    // Destroy the existing chart if it exists
    if (pieGenChart) {
        pieGenChart.destroy();
    }

    pieGenChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Customer Gender',
                data: counts,
                backgroundColor: ['blue', 'pink'],
                hoverOffset: 4
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
                            const percentage = ((value / total) * 100).toFixed(2);
                            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
};