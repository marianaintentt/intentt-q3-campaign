const UGC_QUOTE_ENDPOINT = 'https://ugc.intentt.com/api/quote';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ok: false, error: 'Method not allowed'});
  }

  try {
    const upstream = await fetch(UGC_QUOTE_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.body || {})
    });

    const payload = await upstream.text();
    response.status(upstream.status);
    response.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json; charset=utf-8');
    return response.send(payload);
  } catch (error) {
    return response.status(502).json({ok: false, error: 'Unable to submit quote request'});
  }
}
