# NomadPoint - Proje Dokümantasyonu

Bu döküman, NomadPoint uygulamasında kullanılan tüm servisleri, hesapları ve yapılandırmaları içerir.

---

## 📋 İçindekiler

1. [Proje Özeti](#proje-özeti)
2. [Hosting & Deployment](#hosting--deployment)
3. [Veritabanı (Supabase)](#veritabanı-supabase)
4. [Authentication](#authentication)
5. [E-posta Servisi (Resend)](#e-posta-servisi-resend)
6. [Analytics (Google Analytics)](#analytics-google-analytics)
7. [Görsel API (Unsplash)](#görsel-api-unsplash)
8. [Affiliate Programları](#affiliate-programları)
9. [Environment Variables](#environment-variables)
10. [Lokal Geliştirme](#lokal-geliştirme)

---

## 🌍 Proje Özeti

**NomadPoint** dijital göçebeler için şehir karşılaştırma ve seyahat planlama platformudur.

| Bilgi | Değer |
|-------|-------|
| **Proje Adı** | NomadPoint |
| **Domain** | www.nomadpointe.com |
| **Framework** | Next.js 14 |
| **UI** | React 18 + Tailwind CSS |
| **Dil** | TypeScript |
| **Test** | Jest + Playwright |

---

## ☁️ Hosting & Deployment

### Vercel

| Bilgi | Değer |
|-------|-------|
| **Platform** | Vercel |
| **URL** | https://vercel.com |
| **Dashboard** | https://vercel.com/dashboard |
| **Proje** | NomadPoint |

#### Yönetim İşlemleri

1. **Deployment görüntüleme**: Vercel Dashboard → Deployments
2. **Environment Variables**: Settings → Environment Variables
3. **Domain ayarları**: Settings → Domains
4. **Analytics**: Analytics sekmesi

#### Otomatik Deployment

- `main` branch'e push yapıldığında otomatik production deployment
- Pull Request açıldığında preview deployment

---

## 🗄️ Veritabanı (Supabase)

### Hesap Bilgileri

| Bilgi | Değer |
|-------|-------|
| **Platform** | Supabase |
| **URL** | https://supabase.com |
| **Dashboard** | https://app.supabase.com |
| **Kayıt** | https://supabase.com/dashboard/sign-in |

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
```

### Veritabanı Şeması

Aşağıdaki tablolar kullanılmaktadır:

| Tablo | Açıklama |
|-------|----------|
| `users` | Kullanıcı profilleri (auth.users ile ilişkili) |
| `favorites` | Kullanıcı favori şehirleri |
| `trips` | Seyahat planları |
| `trip_cities` | Seyahatteki şehir durakları |
| `checklists` | Vize/paketleme kontrol listeleri |
| `visited_cities` | Ziyaret edilen şehirler |

### Yönetim İşlemleri

1. **Tablolara erişim**: Table Editor sekmesi
2. **SQL sorguları**: SQL Editor sekmesi
3. **API ayarları**: Project Settings → API
4. **Auth ayarları**: Authentication → Providers

### Row Level Security (RLS)

Tüm tablolarda RLS aktif. Kullanıcılar sadece kendi verilerini görebilir/düzenleyebilir.

---

## 🔐 Authentication

Uygulama NextAuth.js v5 kullanarak OAuth authentication sağlar.

### Google OAuth

| Bilgi | Değer |
|-------|-------|
| **Platform** | Google Cloud Console |
| **URL** | https://console.cloud.google.com |
| **Proje** | NomadPoint |

#### Environment Variables

```env
AUTH_GOOGLE_ID=[CLIENT_ID].apps.googleusercontent.com
AUTH_GOOGLE_SECRET=GOCSPX-[SECRET]
AUTH_SECRET=[RANDOM_SECRET]
NEXTAUTH_URL=https://www.nomadpointe.com
AUTH_TRUST_HOST=true
```

#### Yönetim İşlemleri

1. **Credentials görüntüleme**: APIs & Services → Credentials
2. **OAuth izinleri**: APIs & Services → OAuth consent screen
3. **Test kullanıcıları ekleme**: OAuth consent screen → Test users

📄 **Detaylı rehber**: [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)

---

### GitHub OAuth (Opsiyonel)

| Bilgi | Değer |
|-------|-------|
| **Platform** | GitHub Developer Settings |
| **URL** | https://github.com/settings/developers |

#### Environment Variables

```env
AUTH_GITHUB_ID=[CLIENT_ID]
AUTH_GITHUB_SECRET=[CLIENT_SECRET]
```

#### Kurulum Adımları

1. https://github.com/settings/developers adresine gidin
2. "OAuth Apps" → "New OAuth App" tıklayın
3. Bilgileri doldurun:
   - Application name: NomadPoint
   - Homepage URL: https://www.nomadpointe.com
   - Authorization callback URL: https://www.nomadpointe.com/api/auth/callback/github
4. "Register application" tıklayın
5. Client ID ve Client Secret'ı Vercel'e ekleyin

---

## 📧 E-posta Servisi (Resend)

### Hesap Bilgileri

| Bilgi | Değer |
|-------|-------|
| **Platform** | Resend |
| **URL** | https://resend.com |
| **Dashboard** | https://resend.com/dashboard |
| **Kayıt** | https://resend.com/signup |

#### Environment Variables

```env
RESEND_API_KEY=re_[API_KEY]
```

### Yönetim İşlemleri

1. **API anahtarı oluşturma**: API Keys → Create API Key
2. **Domain doğrulama**: Domains → Add Domain
3. **E-posta logları**: Emails sekmesi

### E-posta Şablonları

Uygulamada tanımlı e-posta şablonları:

| Şablon | Açıklama |
|--------|----------|
| `welcome` | Hoş geldin e-postası |
| `tripReminder` | Seyahat hatırlatması |
| `weeklyDigest` | Haftalık özet |

### Domain Ayarları

E-postaların `noreply@nomadpoint.com` adresinden gönderilmesi için:

1. Resend Dashboard → Domains → Add Domain
2. `nomadpoint.com` domain'ini ekleyin
3. DNS kayıtlarını domain sağlayıcınıza ekleyin
4. Doğrulama yapın

---

## 📊 Analytics (Google Analytics)

### Hesap Bilgileri

| Bilgi | Değer |
|-------|-------|
| **Platform** | Google Analytics 4 |
| **URL** | https://analytics.google.com |
| **Property Type** | GA4 |

#### Environment Variables

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Kurulum Adımları

1. https://analytics.google.com adresine gidin
2. "Admin" → "Create Property" tıklayın
3. Property adı: NomadPoint
4. Web stream oluşturun:
   - URL: https://www.nomadpointe.com
5. Measurement ID'yi (G-XXXXXXXX) alın
6. Vercel'e environment variable olarak ekleyin

### Takip Edilen Olaylar

| Olay | Açıklama |
|------|----------|
| `city_view` | Şehir sayfası görüntüleme |
| `compare_cities` | Şehir karşılaştırma |
| `favorite_add` | Favorilere ekleme |
| `trip_create` | Seyahat oluşturma |
| `affiliate_click` | Affiliate link tıklama |
| `sign_up` | Kayıt olma |
| `login` | Giriş yapma |

---

## 🖼️ Görsel API (Unsplash)

### Hesap Bilgileri

| Bilgi | Değer |
|-------|-------|
| **Platform** | Unsplash Developers |
| **URL** | https://unsplash.com/developers |
| **Durum** | ⚠️ Opsiyonel (fallback URL'ler mevcut) |

#### Environment Variables

```env
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=[ACCESS_KEY]
```

### Kurulum Adımları (Opsiyonel)

1. https://unsplash.com/developers adresine gidin
2. "Your apps" → "New Application" tıklayın
3. Uygulamayı oluşturun
4. Access Key'i alın

> **Not**: Unsplash API key tanımlanmamışsa, uygulama önceden tanımlı şehir görsellerini veya fallback URL'leri kullanır.

---

## 💰 Affiliate Programları

### Aktif Programlar

#### SafetyWing ✅

| Bilgi | Değer |
|-------|-------|
| **Platform** | SafetyWing Ambassador |
| **URL** | https://www.safetywing.com/ambassador |
| **Dashboard** | https://www.safetywing.com/ambassador/dashboard |
| **Affiliate ID** | `26461265` |
| **Durum** | ✅ Aktif |

**Kazanç**: Satış başına $10, 30 gün cookie süresi

### Kurulacak Programlar

#### Booking.com ⏳

| Bilgi | Değer |
|-------|-------|
| **Platform** | Booking.com Affiliate Partner Centre |
| **Kayıt URL** | https://www.booking.com/affiliate-program/ |
| **Durum** | ⏳ Henüz kurulmadı |

**Kurulum**:
1. https://www.booking.com/affiliate-program/ adresine gidin
2. "Join Now" tıklayın
3. Başvuruyu tamamlayın
4. Onaylandıktan sonra Affiliate ID'yi alın
5. `src/lib/affiliates.ts` dosyasında `BOOKING_AFFILIATE_ID` değerini güncelleyin

---

#### NordVPN ⏳

| Bilgi | Değer |
|-------|-------|
| **Platform** | NordVPN Affiliate Program |
| **Kayıt URL** | https://nordvpn.com/affiliate/ |
| **Durum** | ⏳ Henüz kurulmadı |

**Kurulum**:
1. https://nordvpn.com/affiliate/ adresine gidin
2. "Become an affiliate" tıklayın
3. Başvuruyu tamamlayın
4. Onaylandıktan sonra referral ID'yi alın
5. `src/lib/affiliates.ts` dosyasında `NORDVPN_AFFILIATE_ID` değerini güncelleyin

---

#### Wise (TransferWise) ⏳

| Bilgi | Değer |
|-------|-------|
| **Platform** | Wise Affiliate Program |
| **Kayıt URL** | https://wise.com/invite/ |
| **Durum** | ⏳ Henüz kurulmadı |

**Kurulum**:
1. https://wise.com adresinde hesap oluşturun
2. Invite linkini alın
3. `src/lib/affiliates.ts` dosyasında `WISE_AFFILIATE_ID` değerini güncelleyin

---

## 🔧 Environment Variables

### Tüm Environment Variables Listesi

Vercel Dashboard → Settings → Environment Variables bölümünde tanımlanması gereken değişkenler:

#### Zorunlu

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `AUTH_SECRET` | NextAuth güvenlik anahtarı | `rastgele-32-karakter-string` |
| `NEXTAUTH_URL` | Site URL'i | `https://www.nomadpointe.com` |
| `AUTH_TRUST_HOST` | Host güveni | `true` |
| `AUTH_GOOGLE_ID` | Google OAuth Client ID | `xxx.apps.googleusercontent.com` |
| `AUTH_GOOGLE_SECRET` | Google OAuth Secret | `GOCSPX-xxx` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase proje URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | `eyJxxx...` |

#### Opsiyonel

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `AUTH_GITHUB_ID` | GitHub OAuth Client ID | `Iv1.xxx` |
| `AUTH_GITHUB_SECRET` | GitHub OAuth Secret | `xxx` |
| `RESEND_API_KEY` | Resend API anahtarı | `re_xxx` |
| `CONTACT_TO_EMAIL` | Contact form hedef alıcı e-posta (server-only) | `sedatcngz@gmail.com` |
| `CONTACT_PUBLIC_EMAIL` | UI’da gösterilecek destek e-postası | `support@nomadpoint.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` | Unsplash API key | `xxx` |

---

## 💻 Lokal Geliştirme

### .env.local Dosyası

Projenin kök dizininde `.env.local` dosyası oluşturun:

```env
# Authentication
AUTH_SECRET=lokal-gelistirme-icin-secret
NEXTAUTH_URL=http://localhost:3000
AUTH_TRUST_HOST=true

# Google OAuth
AUTH_GOOGLE_ID=xxx.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=GOCSPX-xxx

# GitHub OAuth (opsiyonel)
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# Email (opsiyonel)
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=sedatcngz@gmail.com
CONTACT_PUBLIC_EMAIL=support@nomadpoint.com

# Analytics (opsiyonel)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Unsplash (opsiyonel)
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=xxx
```

### Geliştirme Sunucusunu Başlatma

```bash
npm install
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışır.

---

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── api/               # API routes
│   ├── cities/            # Şehir detay sayfaları
│   ├── compare/           # Karşılaştırma sayfası
│   ├── dashboard/         # Kullanıcı dashboard
│   ├── login/             # Giriş sayfası
│   ├── profile/           # Profil sayfası
│   ├── tools/             # Araçlar (currency, timezone)
│   └── trips/             # Seyahat planlama
├── components/            # React bileşenleri
├── data/                  # Şehir verileri
├── hooks/                 # Custom React hooks
├── lib/                   # Utility fonksiyonlar
│   ├── auth/             # NextAuth yapılandırması
│   ├── email/            # E-posta servisi
│   └── supabase/         # Supabase client
└── types/                 # TypeScript type tanımları
```

---

## 🔗 Hızlı Linkler

### Dashboardlar

| Servis | URL |
|--------|-----|
| Vercel | https://vercel.com/dashboard |
| Supabase | https://app.supabase.com |
| Google Cloud | https://console.cloud.google.com |
| Google Analytics | https://analytics.google.com |
| Resend | https://resend.com/dashboard |
| SafetyWing | https://www.safetywing.com/ambassador/dashboard |

### Dokümantasyonlar

| Servis | URL |
|--------|-----|
| Next.js | https://nextjs.org/docs |
| NextAuth.js | https://authjs.dev |
| Supabase | https://supabase.com/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| Resend | https://resend.com/docs |

---

## 📞 Notlar

### Yapılacaklar

- [ ] Booking.com affiliate başvurusu
- [ ] NordVPN affiliate başvurusu
- [ ] Wise affiliate kurulumu
- [ ] GitHub OAuth kurulumu (opsiyonel)
- [ ] Resend domain doğrulaması
- [ ] Google Analytics property oluşturma

### Önemli Hatırlatmalar

1. **Environment Variables**: Her değişiklikten sonra Vercel'de redeploy yapın
2. **Google OAuth**: Test modundan çıkmak için OAuth consent screen'i "Publish" yapın
3. **Supabase RLS**: Yeni tablolar eklerken RLS policy'lerini unutmayın
4. **Affiliate ID'ler**: `src/lib/affiliates.ts` dosyasında güncelleyin

---

*Son güncelleme: Ocak 2026*

