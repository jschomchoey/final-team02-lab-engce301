export async function login({ email_text, password_text }) {
  const token = '1234567890';
  return await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({ email_text, password_text }),
    headers: { "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
     },
  })
    .then((response) => {
      console.log(response)
      // If request is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function searchArtworks({ keyword }) {
  return await fetch(`/api/homepage/getArtworks/${keyword}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      // If request is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
