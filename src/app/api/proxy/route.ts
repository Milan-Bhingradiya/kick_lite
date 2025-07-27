export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid 'url' parameter" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const response = await fetch(url, { method: "GET" });
    const headers = new Headers();
    response.headers.forEach((value, key) => {
      headers.set(key, value);
    });

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Proxy failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
