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

//panggil revenue bar di BQ4.js


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
      showAlert("Name cannot be empty");
      return;
  }
  
  if (name.length <= 5) {
      showAlert("Name must be more than 5 characters");
      return;
  }

  if (email === '') {
      showAlert("Email cannot be empty");
      return;
  }
  
  if (message === '') {
      showAlert("Message cannot be empty");
      return;
  }

  if (!emailPattern.test(email)) {
      showAlert("Email should contain '@' and a domain like '.com'");
      return;
  }

  var messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages.push({ name: name, email: email, message: message });
  localStorage.setItem('messages', JSON.stringify(messages));

  // Show popup
  var popup = document.querySelector('.popup');
  popup.style.display = 'block';

  // Reset form after submit
  document.getElementById('recommendation-form').reset();
}

function showAlert(message) {
  // Displaying alert in the popup
  var popupText = document.getElementById('popup-text');
  popupText.textContent = message;
  var popup = document.getElementById('pop-rules');
  popup.style.display = 'block';
}

function closePopup() {
  // Closing the popup
  var popup = document.getElementById('pop-rules');
  popup.style.display = 'none';
}

window.onload = function() {
  displayData();
}

// Fungsi untuk menutup pop-up
document.querySelector('.popup button').addEventListener('click', function() {
  document.querySelector('.popup').style.display = 'none';
});


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
