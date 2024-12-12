window.onload = function() {
    let box2 = document.querySelector('.box2');
    let box6 = document.querySelector('.box6');

    let temp = box2.innerHTML;
    box2.innerHTML = box6.innerHTML;
    box6.innerHTML = temp;

    let savedColor = localStorage.getItem('borderColor');
    if (savedColor) {
        let boxes = document.querySelectorAll('.box');
        boxes.forEach(box => box.style.borderColor = savedColor);
    }

    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.width = 200;
        img.height = 150;
        imageContainer.appendChild(img);
    });

    const cookieData = document.cookie.split('; ').find(row => row.startsWith('minMax'));
    
    if (cookieData) {
        const cookieValue = cookieData.split('=')[1];
        const [savedMin, savedMax] = cookieValue.split(',');
        const confirmDelete = confirm(`У вас є збережені дані. Мінімум: ${savedMin}, максимум: ${savedMax}. Видалити їх?`);

        if (confirmDelete) {
            document.cookie = "minMax=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            location.reload(); 
        } else {
            alert('Будь ласка, перезавантажте сторінку для видалення даних.');
        }
    }
};

const imageContainer = document.querySelector('.box1');
const imageForm = document.getElementById('imageForm');
const clearButton = document.getElementById('clearImages');

imageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const imageUrl = document.getElementById('imageUrl').value;
    
    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.width = 200;
        img.height = 150;
        imageContainer.appendChild(img);

        let images = JSON.parse(localStorage.getItem('images')) || [];
        images.push(imageUrl);
        localStorage.setItem('images', JSON.stringify(images));
    }
});

clearButton.addEventListener('click', function() {
    localStorage.removeItem('images');
    location.reload();
});

document.getElementById('colorPicker').addEventListener('input', function() {
    let color = this.value;
    localStorage.setItem('borderColor', color);

    let boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.style.borderColor = color);
});

function calculateArea() {
    const d1 = parseFloat(document.getElementById('d1').value);
    const d2 = parseFloat(document.getElementById('d2').value);

    if (isNaN(d1) || isNaN(d2)) {
        alert('Введіть обидві діагоналі');
        return;
    }

    const area = (d1 * d2) / 2;
    document.getElementById('result').textContent = `Площа ромба: ${area} квадратних одиниць.`;
}

function findMinMax() {
    const nums = [];
    for (let i = 1; i <= 10; i++) {
        nums.push(parseFloat(document.getElementById(`num${i}`).value));
    }

    if (nums.some(isNaN)) {
        alert('Будь ласка, введіть усі числа.');
        return;
    }

    const min = Math.min(...nums);
    const max = Math.max(...nums);
    alert(`Мінімум: ${min}, Максимум: ${max}`);

    document.cookie = `minMax=${min},${max}; path=/;`;

    const cookieData = document.cookie.split('; ').find(row => row.startsWith('minMax'));
    
    if (cookieData) {
        const cookieValue = cookieData.split('=')[1];
        const [savedMin, savedMax] = cookieValue.split(',');

        const confirmDelete = confirm(`Збережено мінімум: ${savedMin}, максимум: ${savedMax}. Видалити ці дані?`);
        if (confirmDelete) {
            document.cookie = "minMax=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            location.reload(); 
        } else {
            alert('Будь ласка, перезавантажте сторінку для видалення даних.');
        }
    }
}


