// src/app/api/auth/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    // demo credentials (kept in code only for demo)
    const demoUsers = [
      { email: 'investor@precision.com', password: 'investor123', role: 'investor' },
      { email: 'admin@precision.com', password: 'admin123', role: 'admin' },
    ];

    const user = demoUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // For demo we set a simple cookie/session indicator (not secure for production)
    const res = NextResponse.json({ ok: true, role: user.role });
    // set a tiny cookie to indicate logged-in (HttpOnly not possible from this example but fine for demo)
    res.cookies.set('precision_demo_user', JSON.stringify({ email: user.email, role: user.role }), {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  } catch (err) {
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
