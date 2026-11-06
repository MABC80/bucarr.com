(function () {
  var form = document.querySelector("[data-kontakt-form]");
  if (!form) return;

  var status = document.getElementById("kontakt-status");
  var submit = form.querySelector("[type='submit']");
  var placeholder = "WEB3FORMS_ACCESS_KEY";

  function setStatus(kind, text) {
    if (!status) return;
    status.dataset.state = kind;
    status.textContent = text;
  }

  function configured(key) {
    return typeof key === "string" && key.trim() !== "" && key.trim() !== placeholder;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var data = new FormData(form);
    var key = data.get("access_key");
    if (!configured(key)) {
      setStatus(
        "error",
        "Das Formular ist noch nicht aktiv. Bitte schreiben Sie direkt an info@bucarr.com."
      );
      return;
    }

    if (data.get("botcheck")) {
      setStatus("error", "Die Nachricht konnte nicht gesendet werden.");
      return;
    }

    setStatus("pending", "Wird gesendet …");
    if (submit) submit.disabled = true;

    var payload = {};
    data.forEach(function (value, name) {
      if (name === "botcheck") return;
      payload[name] = value;
    });

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return response.json().then(function (body) {
          return { ok: response.ok, body: body };
        });
      })
      .then(function (result) {
        if (result.ok && result.body && result.body.success === true) {
          setStatus("success", "Vielen Dank für Ihre Nachricht!");
          form.reset();
          return;
        }
        setStatus(
          "error",
          "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@bucarr.com."
        );
      })
      .catch(function () {
        setStatus(
          "error",
          "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@bucarr.com."
        );
      })
      .then(function () {
        if (submit) submit.disabled = false;
      });
  });
})();
