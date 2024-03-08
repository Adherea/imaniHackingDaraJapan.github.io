function sendMails(event) {
  event.preventDefault(); // Tambahkan ini untuk mencegah pengiriman formulir default

  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_dmq8eij";
  const templateID = "template_b8jq9mf";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("Your message sent successfully!");
    })
    .catch((err) => console.log(err));
}
