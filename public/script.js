const BASE_URL = "http://localhost:3000";

(
  async () => {
    const customerId = document.querySelector("script[clientId]").getAttribute("clientId");

    const request = await fetch(`${BASE_URL}/api/customers/auth`, {
      method: "POST",
      body: JSON.stringify({
        customerId
      })
    })

    const response = await request.json()

    if (request.status != 200) {
      console.log(response.message)
      return;
    }

    const script = document.createElement("script");
    script.src = `${BASE_URL}/api/script/${response.token}`
    document.body.appendChild(script)
  }
)()