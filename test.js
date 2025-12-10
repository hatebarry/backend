document.getElementById("userForm").addEventListener("submit", (event) => {
  event.preventDefault();

  let firstName = document.getElementById("first_name").value.trim();
  let lastName = document.getElementById("last_name").value.trim();
  let Age = Number(document.getElementById("age").value);
  let email = document.getElementById("email").value.trim();
  let phoneNumber = document.getElementById("phone").value.trim();

  let error1 = document.getElementById("error1");
  let error2 = document.getElementById("error2");
  let error3 = document.getElementById("error3");
  let error4 = document.getElementById("error4");
  let error5 = document.getElementById("error5");

  error1.textContent = "";
  error2.textContent = "";
  error3.textContent = "";
  error4.textContent = "";
  error5.textContent = "";

  if (firstName === "" || !isNaN(firstName)) {
    error1.textContent = "Please enter your first name";
    return;
  }

  if (lastName === "" || !isNaN(lastName)) {
    error2.textContent = "Please enter your last name";
    return;
  }

  if (isNaN(Age)) {
    error3.textContent = "Please enter your age";
    return;
  }

  if (Age < 18) {
    error3.textContent = "Your age is not qualified";
    return;
  }

  if (Age > 80) {
    error3.textContent = "Age limit exceeded";
    return;
  }

  if (phoneNumber === "" || isNaN(phoneNumber) || phoneNumber.length !== 10) {
    error4.textContent = "Phone number must be 10 digits";
    return;
  }

  if (email === "") {
    error5.textContent = "Please enter your email";
    return;
  }

  
// AFTER validation passes:
fetch("http://localhost:3000/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    first_name: firstName,
    last_name: lastName,
    age: Age,
    phone: phoneNumber,
    email: email,
  }),
})
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Form submitted successfully!");
      document.getElementById("userForm").reset();
    } else {
      alert("Error: " + data.error);
    }
  })
  .catch(err => {
    alert("Request failed: " + err);
  });
});
