# NestJS — Google & GitHub OAuth2 ro'yxatdan o'tish

Bu loyiha NestJS + Passport.js yordamida Google va GitHub orqali
ro'yxatdan o'tish/kirish (OAuth 2.0) misolini o'z ichiga oladi.

## O'rnatish

```bash
npm install
```

## Sozlash

1. `.env.example` faylini nusxalab `.env` nomida saqlang:

```bash
cp .env.example .env
```

2. Google uchun: https://console.cloud.google.com/apis/credentials
   - "Create Credentials" → "OAuth client ID" → "Web application"
   - Authorized redirect URI: `http://localhost:3000/auth/google/callback`

3. GitHub uchun: https://github.com/settings/developers
   - "New OAuth App"
   - Authorization callback URL: `http://localhost:3000/auth/github/callback`

4. Olingan Client ID / Client Secret larni `.env` fayliga qo'ying.

## Ishga tushirish

```bash
npm run start:dev
```

Server: http://localhost:3000

## Endpointlar

| Endpoint                  | Tavsif                                   |
|----------------------------|-------------------------------------------|
| `GET /auth/google`         | Google login sahifasiga yo'naltiradi      |
| `GET /auth/google/callback`| Google javobini qabul qilib JWT qaytaradi |
| `GET /auth/github`         | GitHub login sahifasiga yo'naltiradi      |
| `GET /auth/github/callback`| GitHub javobini qabul qilib JWT qaytaradi |
| `GET /auth/profile`        | JWT bilan himoyalangan namuna route       |

## Eslatma

`UsersService` da xotiradagi (in-memory) massiv ishlatilgan — bu shunchaki
namuna. Haqiqiy loyihada uni TypeORM, Prisma yoki Mongoose orqali haqiqiy
bazaga ulang.

## Frontendga ulash

Foydalanuvchi tugma bosganda brauzerni to'g'ridan-to'g'ri quyidagi
manzilga yo'naltiring (fetch emas!):

```
http://localhost:3000/auth/google
http://localhost:3000/auth/github
```

Muvaffaqiyatli kirishdan so'ng foydalanuvchi
`FRONTEND_URL/oauth-success?token=...` manziliga qaytariladi — u yerda
tokenni URL'dan olib `localStorage`ga saqlashingiz mumkin.
