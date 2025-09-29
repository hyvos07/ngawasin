export function GET() {
  const serverTime = new Date();

  return new Response(
    JSON.stringify({
      serverTime: serverTime.toISOString(),
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}