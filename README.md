.  

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Booking Management</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <div class="container">
    <h1>Event Booking System</h1>

    <section class="card">
      <h2>Book Your Event</h2>

      <form id="bookingForm">
        <input id="name" placeholder="Customer Name" required>

        <input id="mobile" type="tel"
          placeholder="Mobile Number"
          pattern="[0-9]{10}" required>

        <input id="email" type="email"
          placeholder="Email Address" required>

        <select id="event" required>
          <option value="">Select Event</option>
          <option value="Wedding">Wedding</option>
          <option value="Birthday">Birthday</option>
          <option value="Conference">Conference</option>
          <option value="Seminar">Seminar</option>
        </select>

        <input id="date" type="date" required>

        <select id="slot" required>
          <option value="">Select Time Slot</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>

        <input id="guests" type="number"
          min="1" placeholder="Number of Guests" required>

        <button type="submit">Confirm Booking</button>
      </form>

      <p id="message"></p>
    </section>

    <section class="card">
      <h2>Booking Dashboard</h2>

      <div class="stats">
        <div>Total: <span id="total">0</span></div>
        <div>Pending: <span id="pending">0</span></div>
        <div>Confirmed: <span id="confirmed">0</span></div>
        <div>Cancelled: <span id="cancelled">0</span></div>
      </div>

      <input id="search" placeholder="Search by name or booking ID">

      <div id="bookingList"></div>
    </section>
  </div>

  <script src="js/booking.js"></script>
</body>
</html>
