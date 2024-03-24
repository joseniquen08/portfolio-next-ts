export async function POST(request: Request) {
  const { start, end, summary, description, attendee_name, attendee_email } =
    await request.json();

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
    }),
  });

  const data = await response.text();
  console.log("🚀 ~ POST ~ data:", data);

  return Response.json(data);
}
