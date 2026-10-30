
const form = document.getElementById("bookingForm");

let bookings = JSON.parse(
  localStorage.getItem("eventBookings") || "[]"
);

const saveBookings = () => {
  localStorage.setItem(
    "eventBookings",
    JSON.stringify(bookings)
  );
};

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value.trim();
  const event = document.getElementById("event").value;
  const date = document.getElementById("date").value;
  const slot = document.getElementById("slot").value;
  const guests = document.getElementById("guests").value;

  if (date < new Date().toLocaleDateString("en-CA")) {
    alert("Please select a future date");
    return;
  }

  // Prevent duplicate active slot bookings
  const alreadyBooked = bookings.some(b =>
    b.date === date &&
    b.slot === slot &&
    b.status !== "Cancelled"
  );

  if (alreadyBooked) {
    alert("This date and time slot is already booked!");
    return;
  }

  const booking = {
    id: "EVT" + Date.now(),
    name,
    mobile,
    email,
    event,
    date,
    slot,
    guests: Number(guests),
    status: "Pending",
    paymentStatus: "Unpaid",
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);

  saveBookings();
  form.reset();

  document.getElementById("message").textContent =
    "Booking submitted successfully!";

  displayBookings();
});

function displayBookings() {
  const list = document.getElementById("bookingList");

  const search = document.getElementById("search")
    .value.toLowerCase();

  const filtered = bookings.filter(b =>
    b.name.toLowerCase().includes(search) ||
    b.id.toLowerCase().includes(search)
  );

  list.innerHTML = "";

  filtered.forEach(b => {
    const div = document.createElement("div");
    div.className = "booking";

    const title = document.createElement("h3");
    title.textContent = b.name;

    const details = document.createElement("p");
    details.textContent =
      `${b.id} | ${b.event} | ${b.date} | ${b.slot} | Guests: ${b.guests}`;

    const status = document.createElement("p");
    status.textContent =
      `Status: ${b.status} | Payment: ${b.paymentStatus}`;

    div.append(title, details, status);

    if (b.status === "Pending") {
      const confirmBtn = document.createElement("button");
      confirmBtn.textContent = "Approve";
      confirmBtn.addEventListener("click", () =>
        updateStatus(b.id, "Confirmed")
      );
      div.appendChild(confirmBtn);
    }

    if (b.status !== "Cancelled") {
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.addEventListener("click", () =>
        updateStatus(b.id, "Cancelled")
      );
      div.appendChild(cancelBtn);
    }

    list.appendChild(div);
  });

  document.getElementById("total").textContent =
    bookings.length;

  document.getElementById("pending").textContent =
    bookings.filter(b => b.status === "Pending").length;

  document.getElementById("confirmed").textContent =
    bookings.filter(b => b.status === "Confirmed").length;

  document.getElementById("cancelled").textContent =
    bookings.filter(b => b.status === "Cancelled").length;
}

function updateStatus(id, status) {
  bookings = bookings.map(b =>
    b.id === id ? {...b, status} : b
  );

  saveBookings();
  displayBookings();
}

document.getElementById("search").addEventListener(
  "input", displayBookings
);

displayBookings();
