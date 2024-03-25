export async function POST(request: Request) {
  const {
    start,
    end,
    summary,
    description,
    attendee_name,
    attendee_email,
    phone,
  } = await request.json();

  const response = await fetch(`${process.env.MAKE_URL_WEBHOOK}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      start,
      end,
      summary,
      description,
      attendee_name,
      attendee_email,
      phone,
    }),
  });

  const data = await response.text();

  return Response.json(data);
}
