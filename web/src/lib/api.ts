const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

export const api = {
  async get(path: string, options?: { params?: Record<string, any> }) {
    const url = new URL(path, baseURL);
    if (options?.params) {
      for (const [k, v] of Object.entries(options.params)) {
        if (v !== undefined) url.searchParams.set(k, String(v));
      }
    }
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async post(path: string, body?: any) {
    const url = new URL(path, baseURL);
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
};
