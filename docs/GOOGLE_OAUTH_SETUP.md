# Google OAuth Kurulum Rehberi

Bu döküman, NomadPoint uygulaması için Google OAuth kurulumunu adım adım açıklar.

---

## 📋 Gerekli Hesaplar

1. **Google Cloud Console** hesabı - https://console.cloud.google.com
2. **Vercel** hesabı - https://vercel.com

---

## 🔧 ADIM 1: Google Cloud Console Yapılandırması

### 1.1 Yeni Proje Oluşturma (İlk kez yapıyorsanız)

1. https://console.cloud.google.com adresine gidin
2. Sol üstteki proje seçiciye tıklayın
3. "New Project" butonuna tıklayın
4. Proje adı girin (örn: "NomadPoint")
5. "Create" butonuna tıklayın

### 1.2 OAuth Consent Screen Yapılandırması

1. Sol menüden **"APIs & Services"** → **"OAuth consent screen"** seçin
2. User Type olarak **"External"** seçin → "Create"
3. Aşağıdaki bilgileri doldurun:
   - **App name**: NomadPoint
   - **User support email**: (email adresiniz)
   - **Developer contact email**: (email adresiniz)
4. "Save and Continue" tıklayın
5. Scopes sayfasında değişiklik yapmadan "Save and Continue"
6. Test users sayfasında kendi email adresinizi ekleyin (test aşamasında)
7. "Save and Continue" → "Back to Dashboard"

### 1.3 OAuth Client ID Oluşturma

1. Sol menüden **"APIs & Services"** → **"Credentials"** seçin
2. **"+ CREATE CREDENTIALS"** → **"OAuth client ID"** tıklayın
3. Application type: **"Web application"** seçin
4. Name: **"NomadPoint Web"** (veya istediğiniz bir isim)

### 1.4 Authorized JavaScript Origins

Aşağıdaki URL'leri ekleyin:

**Lokal Geliştirme için:**
```
http://localhost:3000
```

**Canlı Site için:**
```
https://www.nomadpointe.com
https://nomadpointe.com
```

### 1.5 Authorized Redirect URIs

Aşağıdaki URL'leri ekleyin:

**Lokal Geliştirme için:**
```
http://localhost:3000/api/auth/callback/google
```

**Canlı Site için:**
```
https://www.nomadpointe.com/api/auth/callback/google
https://nomadpointe.com/api/auth/callback/google
```

### 1.6 Client Bilgilerini Kaydetme

"Create" butonuna tıkladıktan sonra size gösterilecek:

| Bilgi | Açıklama |
|-------|----------|
| **Client ID** | `XXXXXX.apps.googleusercontent.com` formatında |
| **Client Secret** | `GOCSPX-XXXXXX` formatında |

⚠️ **ÖNEMLİ**: Bu bilgileri güvenli bir yere kaydedin! Client Secret sadece bir kez gösterilir.

---

## 🔧 ADIM 2: Vercel Environment Variables

### 2.1 Vercel Dashboard'a Gidin

1. https://vercel.com adresine gidin
2. Projenizi seçin (NomadPoint)
3. **"Settings"** sekmesine tıklayın
4. Sol menüden **"Environment Variables"** seçin

### 2.2 Gerekli Environment Variables

Aşağıdaki 5 değişkeni ekleyin:

| Değişken Adı | Değer | Açıklama |
|--------------|-------|----------|
| `AUTH_GOOGLE_ID` | `XXXXXX.apps.googleusercontent.com` | Google Cloud'dan aldığınız Client ID |
| `AUTH_GOOGLE_SECRET` | `GOCSPX-XXXXXX` | Google Cloud'dan aldığınız Client Secret |
| `AUTH_SECRET` | `rastgele-guclu-string` | NextAuth için güvenlik anahtarı |
| `NEXTAUTH_URL` | `https://www.nomadpointe.com` | Sitenizin URL'i |
| `AUTH_TRUST_HOST` | `true` | Production için gerekli |

### 2.3 AUTH_SECRET Oluşturma

Terminal'de şu komutu çalıştırarak güvenli bir secret oluşturabilirsiniz:

```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

Veya şu online araçları kullanabilirsiniz:
- https://generate-secret.vercel.app/32

### 2.4 Environment Seçimi

Her değişken için **"Environments"** kısmında şunları seçin:
- ✅ Production
- ✅ Preview
- ✅ Development

### 2.5 Kaydetme

"Save" butonuna tıklayın.

---

## 🔧 ADIM 3: Lokal Geliştirme (.env.local)

Projenizin kök dizininde `.env.local` dosyası oluşturun:

```env
# Google OAuth
AUTH_GOOGLE_ID=XXXXXX.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=GOCSPX-XXXXXX

# NextAuth
AUTH_SECRET=lokal-test-icin-rastgele-string
NEXTAUTH_URL=http://localhost:3000
```

⚠️ **ÖNEMLİ**: `.env.local` dosyası `.gitignore`'da olmalı, Git'e commit edilmemeli!

---

## 🔧 ADIM 4: Deployment

### 4.1 Vercel'de Redeploy

Environment variables değiştirdikten sonra:

1. Vercel Dashboard'da **"Deployments"** sekmesine gidin
2. En son deployment'ın yanındaki **⋯** (üç nokta) menüsüne tıklayın
3. **"Redeploy"** seçin
4. "Use existing Build Cache" kutusunu **işaretlemeyin**
5. "Redeploy" butonuna tıklayın

### 4.2 Test Etme

Deployment tamamlandıktan sonra:

1. https://www.nomadpointe.com/login adresine gidin
2. "Continue with Google" butonuna tıklayın
3. Google hesabınızla giriş yapın

---

## 🔧 ADIM 5: Production'a Geçiş

Test aşamasında her şey çalıştıktan sonra:

### 5.1 OAuth Consent Screen'i Yayınlama

1. Google Cloud Console → OAuth consent screen
2. **"PUBLISH APP"** butonuna tıklayın
3. Onaylayın

Bu sayede sadece test kullanıcıları değil, herkes Google ile giriş yapabilir.

---

## ❗ Sık Karşılaşılan Hatalar

### Hata: `redirect_uri_mismatch`

**Sebep**: Google Cloud Console'daki redirect URI ile uygulamanın kullandığı URI eşleşmiyor.

**Çözüm**: 
- Google Cloud Console → Credentials → OAuth Client
- "Authorized redirect URIs" kısmını kontrol edin
- Tam URL olmalı: `https://www.nomadpointe.com/api/auth/callback/google`

---

### Hata: `error=Configuration`

**Sebep**: NextAuth yapılandırması eksik veya hatalı.

**Çözüm**:
1. Vercel'de tüm environment variables'ların doğru tanımlı olduğunu kontrol edin
2. `AUTH_SECRET` değerinin boş olmadığından emin olun
3. `AUTH_GOOGLE_ID` ve `AUTH_GOOGLE_SECRET` değerlerinin Google Cloud'dakilerle aynı olduğunu kontrol edin
4. Redeploy yapın

---

### Hata: `access_denied`

**Sebep**: OAuth Consent Screen "Testing" modunda ve kullanıcı test listesinde değil.

**Çözüm**:
- Google Cloud Console → OAuth consent screen → Test users
- Giriş yapmaya çalışan email adresini ekleyin
- VEYA uygulamayı "Publish" edin (production için)

---

### Hata: Client Secret Görünmüyor

**Sebep**: Google artık güvenlik nedeniyle mevcut secret'ları göstermiyor.

**Çözüm**:
1. Google Cloud Console → Credentials → OAuth Client
2. "Client secrets" bölümünde **"+ Add secret"** tıklayın
3. Yeni secret oluşturulduğunda **hemen kopyalayın** (sadece bir kez gösterilir!)
4. Eski secret'ı silin veya disable edin
5. Vercel'de `AUTH_GOOGLE_SECRET` değerini güncelleyin
6. Redeploy yapın

---

## 📁 Proje Dosya Yapısı

```
src/
├── lib/
│   └── auth/
│       ├── config.ts    # NextAuth yapılandırması
│       └── index.ts     # NextAuth export'ları
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts  # Auth API endpoint
│   └── login/
│       └── page.tsx     # Login sayfası
```

---

## 🔗 Faydalı Linkler

- [Google Cloud Console](https://console.cloud.google.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [NextAuth.js Dokümantasyonu](https://authjs.dev)
- [NextAuth Google Provider](https://authjs.dev/getting-started/providers/google)

---

## 📞 Destek

Sorun yaşarsanız kontrol edin:
1. Google Cloud Console'da tüm URI'lar doğru mu?
2. Vercel'de tüm environment variables tanımlı mı?
3. Secret değerleri Google ve Vercel'de aynı mı?
4. Redeploy yapıldı mı?

---

*Son güncelleme: Ocak 2026*

