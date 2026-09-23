// ==========================================
// PRAYER REQUEST SYSTEM
// ==========================================


// ==========================================
// SUBMIT PRAYER REQUEST
// ==========================================

const prayerForm =
    document.getElementById("prayerForm");

if (prayerForm) {

    prayerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
    document.getElementById("name").value.trim();

const email =
    document.getElementById("email").value.trim();

const request =
    document.getElementById("request").value.trim();

const anonymous =
    document.getElementById("anonymous").checked;


        if (name === "" || email === "" || request === "") {

            alert("Please fill in all fields.");

            return;
        }


        let requests =
            JSON.parse(
                localStorage.getItem("prayerRequests")
            ) || [];


const newRequest = {

    id: Date.now(),

    name: anonymous ? "Anonymous Member" : name,

    email: anonymous ? "Anonymous" : email,

    request: request,

    status: "Pending",

    date: new Date().toLocaleString()

};


        requests.push(newRequest);


        localStorage.setItem(
            "prayerRequests",
            JSON.stringify(requests)
        );


        prayerForm.reset();


        const successMessage =
            document.getElementById("successMessage");


        successMessage.textContent =
            "✓ Your prayer request has been submitted successfully. God bless you!";


        setTimeout(function() {

            successMessage.textContent = "";

        }, 5000);

    });

}


// ==========================================
// ADMIN LOGIN
// ==========================================

function adminLogin() {

    const username =
        document.getElementById("adminUsername").value.trim();

    const password =
        document.getElementById("adminPassword").value;


    // ======================================
    // CHANGE YOUR LOGIN DETAILS HERE
    // ======================================

    const correctUsername = "Saviour18";

    const correctPassword = "Zavizbee@18";


    if (
        username === correctUsername &&
        password === correctPassword
    ) {

        document.getElementById("loginPage")
            .style.display = "none";

        document.getElementById("dashboard")
            .style.display = "block";


        loadRequests();

    }

    else {

        document.getElementById("loginError")
            .textContent =
            "Invalid username or password.";

    }

}


// ==========================================
// LOAD PRAYER REQUESTS
// ==========================================

function loadRequests() {

    const container =
        document.getElementById("requestsContainer");


    if (!container) {
        return;
    }


    let requests =
        JSON.parse(
            localStorage.getItem("prayerRequests")
        ) || [];


    // ======================================
    // TOTAL REQUESTS
    // ======================================

    const total =
        document.getElementById("totalRequests");


    if (total) {

        total.textContent =
            requests.length;

    }


    // ======================================
    // LATEST REQUESTS
    // ======================================

    const latest =
        document.getElementById("latestRequests");


    if (latest) {

        latest.textContent =
            Math.min(requests.length, 5);

    }


    // Clear old display

    container.innerHTML = "";


    // ======================================
    // NO REQUESTS
    // ======================================

    if (requests.length === 0) {

        container.innerHTML = `

            <div class="no-request">

                🙏

                <br><br>

                No prayer requests
                have been submitted yet.

            </div>

        `;

        return;
    }


    // ======================================
    // NEWEST REQUEST FIRST
    // ======================================

    requests.sort(function(a, b) {

        return b.id - a.id;

    });


    // ======================================
    // DISPLAY REQUESTS
    // ======================================

    requests.forEach(function(item) {


        // Old requests that don't have
        // a status will become Pending

        if (!item.status) {

            item.status = "Pending";

        }


        const card =
            document.createElement("div");


        card.className =
            "request-card";


        // ==================================
        // BUTTON / STATUS
        // ==================================

        let actionArea = "";


        // PENDING

        if (item.status === "Pending") {

            actionArea = `

                <button
                    class="accept-btn"
                    onclick="acceptRequest(${item.id})"
                >
                    ✓ Accept Request
                </button>

            `;

        }


        // ACCEPTED

        else if (item.status === "Accepted") {

            actionArea = `

                <div class="accepted-message">

                    ✓ Request Accepted

                </div>

                <button
                    class="prayed-btn"
                    onclick="markAsPrayed(${item.id})"
                >

                    🙏 Mark as Prayed For

                </button>

            `;

        }


        // PRAYED FOR

        else if (item.status === "Prayed For") {

            actionArea = `

                <div class="prayed-message">

                    🙏 Prayer Completed

                </div>

            `;

        }


        // ==================================
        // CREATE CARD
        // ==================================

        card.innerHTML = `

            <h3>
                🙏 ${escapeHTML(item.name)}
            </h3>


            <p>

                <strong>
                    Email:
                </strong>

                ${escapeHTML(item.email)}

            </p>


            <p>

                <strong>
                    Prayer Request:
                </strong>

            </p>


            <p>

                ${escapeHTML(item.request)}

            </p>


            <p>

                <strong>
                    Status:
                </strong>

                <span class="status ${item.status.replace(" ", "-")}">

                    ${escapeHTML(item.status)}

                </span>

            </p>


            <p class="request-date">

                Submitted:

                ${escapeHTML(item.date)}

            </p>


            ${actionArea}


            <button
                class="delete-btn"
                onclick="deleteRequest(${item.id})"
            >

                Delete Request

            </button>

        `;


        container.appendChild(card);

    });


    // Save any old requests that received
    // the default Pending status

    localStorage.setItem(
        "prayerRequests",
        JSON.stringify(requests)
    );

}


// ==========================================
// ACCEPT REQUEST
// ==========================================

function acceptRequest(id) {

    let requests =
        JSON.parse(
            localStorage.getItem("prayerRequests")
        ) || [];


    requests = requests.map(function(item) {

        if (item.id === id) {

            item.status = "Accepted";

        }

        return item;

    });


    localStorage.setItem(
        "prayerRequests",
        JSON.stringify(requests)
    );


    loadRequests();

}


// ==========================================
// MARK AS PRAYED FOR
// ==========================================

function markAsPrayed(id) {

    let requests =
        JSON.parse(
            localStorage.getItem("prayerRequests")
        ) || [];


    requests = requests.map(function(item) {

        if (item.id === id) {

            item.status = "Prayed For";

        }

        return item;

    });


    localStorage.setItem(
        "prayerRequests",
        JSON.stringify(requests)
    );


    loadRequests();

}


// ==========================================
// DELETE REQUEST
// ==========================================

function deleteRequest(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this prayer request?"
        );


    if (!confirmDelete) {

        return;

    }


    let requests =
        JSON.parse(
            localStorage.getItem("prayerRequests")
        ) || [];


    requests =
        requests.filter(function(item) {

            return item.id !== id;

        });


    localStorage.setItem(
        "prayerRequests",
        JSON.stringify(requests)
    );


    loadRequests();

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    document.getElementById("dashboard")
        .style.display = "none";


    document.getElementById("loginPage")
        .style.display = "block";


    document.getElementById("adminUsername")
        .value = "";


    document.getElementById("adminPassword")
        .value = "";


    document.getElementById("loginError")
        .textContent = "";

}


// ==========================================
// PROTECT DISPLAYED TEXT
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;

}