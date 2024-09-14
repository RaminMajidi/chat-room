export function notifyMe(fullName, image = null) {

    const message = `new message from ${fullName}`

    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        const notification = new Notification("",{body:message,icon:image});
        // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                const notification = new Notification("",{body:message,icon:image});
                // …
            }
        });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
}
