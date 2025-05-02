function openChat(contactName, profilePic) {
    document.getElementById('chat-contact-name').innerText = contactName;
    document.getElementById('chat-profile-pic').src = profilePic; // Update profile pic
    document.getElementById('chat-messages').innerHTML = ''; // Clear previous messages
    document.getElementById('chat-window').style.display = 'flex';
    document.getElementById('chat-window').scrollIntoView({ behavior: 'smooth' });
}
function closeProfilePopup() {
    document.getElementById('profile-popup').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".contact-info").forEach(contactInfo => {
        contactInfo.addEventListener("click", function () {
            let contact = this.closest(".contact"); // Get the parent .contact element
            let contactName = contact.querySelector(".contact-name").innerText;
            let profilePic = contact.querySelector(".contact-img").src; // Get profile pic from img tag

            // Redirect to chat.html with name and image as query parameters
            window.location.href = `chat.html?name=${encodeURIComponent(contactName)}&pic=${encodeURIComponent(profilePic)}`;
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const contactName = urlParams.get("name");
    const profilePic = urlParams.get("pic");

    if (contactName && profilePic) {
        document.getElementById("chat-contact-name").innerText = contactName;
        document.getElementById("chat-profile-pic").src = decodeURIComponent(profilePic);
    } else {
        console.error("Chat details not found in URL parameters.");
    }
});


function sendMessage() {
    const chatInput = document.getElementById("chat-input");
    const message = chatInput.value.trim();
    if (message) {
        const chatMessages = document.getElementById("chat-messages");
        const messageDiv = document.createElement("div");
        messageDiv.className = "message sent";
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
        chatInput.value = "";
    }
}

function insertEmoji(emoji) {
    document.getElementById("chat-input").value += emoji;
}


function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function insertEmoji(emoji) {
    const chatInput = document.getElementById('chat-input');
    chatInput.value += emoji;
    chatInput.focus();
}


let isProfileOpen = false; // Track popup state

function viewProfile(imageSrc, event) {
    event.stopPropagation();
    const profilePopup = document.getElementById('profile-popup');
    const overlay = document.getElementById('overlay');

    if (isProfileOpen) {
        profilePopup.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        document.getElementById('popup-profile-pic').src = imageSrc;
        profilePopup.style.display = 'block';
        overlay.style.display = 'block';
    }

    isProfileOpen = !isProfileOpen; // Toggle state
}

function dpProfile(imageSrc, event) {
    event.stopPropagation();
    const profilePopup = document.getElementById('dp-popup');
    const overlay = document.getElementById('overlay-dp');

    if (isProfileOpen) {
        profilePopup.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        document.getElementById('dp-profile-pic').src = imageSrc;
        profilePopup.style.display = 'block';
        overlay.style.display = 'block';
    }

    isProfileOpen = !isProfileOpen; // Toggle state
}


function startChat() {
    // Get profile image source from the popup
    let profilePic = document.getElementById("popup-profile-pic").src;

    // Find the contact name from the profile popup (if available)
    let contactName = "";
    document.querySelectorAll(".contact").forEach(contact => {
        let imgSrc = contact.querySelector(".contact-img").src;
        if (imgSrc === profilePic) {
            contactName = contact.querySelector(".contact-name").innerText;
        }
    });

    // If a contact name is found, navigate to chat.html with name and image
    if (contactName) {
        window.location.href = `chat.html?name=${encodeURIComponent(contactName)}&pic=${encodeURIComponent(profilePic)}`;
    } else {
        alert("Contact not found.");
    }
}


function startCall() {
    document.getElementById('call-screen').style.display = 'block';
    document.getElementById('call-profile-pic').src = document.getElementById('popup-profile-pic').src;
}

function endCall() {
    document.getElementById('call-screen').style.display = 'none';
}

function closeProfilePopup() {
    document.getElementById('profile-popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
document.getElementById("chat-profile-pic").addEventListener("click", function () {
    let chatWindow = document.getElementById("chat-window");
    if (chatWindow.style.display === "none") {
        chatWindow.style.display = "block";
    } else {
        chatWindow.style.display = "none";
    }
});
