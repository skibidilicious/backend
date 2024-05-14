// Function to generate a unique identifier
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Function to get a cookie by name
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Function to set a cookie with a long expiration date
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to generate a device fingerprint (simplified example)
function getFingerprint() {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    ctx.textBaseline = "top";
    ctx.font = "16px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125,1,62,20);
    ctx.fillStyle = "#069";
    ctx.fillText("https://example.com", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("https://example.com", 4, 17);
    return canvas.toDataURL();
}

// Combine identifiers
function getCombinedIdentifier() {
    let deviceID = localStorage.getItem('deviceID') || getCookie('deviceID') || null;

    if (!deviceID) {
        deviceID = generateUUID();
        localStorage.setItem('deviceID', deviceID);
        setCookie('deviceID', deviceID, 365);
    }

    let fingerprint = getFingerprint();
    return deviceID + '-' + fingerprint;
}

document.addEventListener('DOMContentLoaded', function() {
    let combinedIdentifier = getCombinedIdentifier();
    console.log('Combined Identifier:', combinedIdentifier);
});
