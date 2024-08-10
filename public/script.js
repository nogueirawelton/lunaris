const BASE_URL = "http://localhost:3000";

(
  async () => {
    const customerId = document.querySelector("script[clientId]").getAttribute("clientId");

    const request = await fetch(`${BASE_URL}/api/customers/script`, {
      method: "POST",
      body: JSON.stringify({
        customerId
      })
    })


    if (request.status != 200) {
      console.error("Invalid Customer");
      return;
    }

    const script = document.createElement("script");
    script.src = `${BASE_URL}/api/customers/script`
    document.body.appendChild(script)
  }
)()