(() => {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const searchParams = Object.fromEntries(new URLSearchParams(location.search));

      await fetch("http://localhost:3000/api/leads", {
        method: "POST",
        body: JSON.stringify({
          formData,
          searchParams,
          url: location.href,
          origin: e.target.id,
          userAgent: navigator.userAgent
        })
      })
    })
  })
})()