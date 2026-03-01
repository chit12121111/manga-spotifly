# Manga Spotifly

Demo UI โปรเจกต์ Manga แบบ Spotify-style (Vite + React + Tailwind).

## Deploy ขึ้น GitHub Pages

### 1. สร้าง Repo บน GitHub

- สร้าง repo ใหม่ (ชื่อ เช่น `manga-spotifly`)
- **ไม่ต้อง** ใส่ README / .gitignore (หรือจะใส่ก็ได้ แล้วค่อย merge)

### 2. Push โค้ดขึ้น repo

จากโฟลเดอร์ `manga-spotifly`:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

### 3. เปิดใช้ GitHub Pages

1. เข้า **Settings** ของ repo → **Pages**
2. ที่ **Source** เลือก **GitHub Actions**
3. พอ push ขึ้น branch `main` workflow จะ build และ deploy ให้
4. หลังรัน workflow เสร็จ หน้าเว็บจะอยู่ที่  
   `https://<username>.github.io/<repo-name>/`

### 4. (ถ้าต้องการ) Build เองก่อน push

- Build แบบ production (ใช้ base ตามชื่อ repo):  
  `VITE_BASE=manga-spotifly npm run build`
- ดูผล build แบบ local:  
  `npm run preview` แล้วเปิดตาม URL ที่แสดง (ต้องเข้า path `/manga-spotifly/`)

---

**หมายเหตุ:** ถ้า repo อยู่ใต้โฟลเดอร์ย่อย (เช่น repo คือ `ui` และมีโฟลเดอร์ `manga-spotifly` อยู่ข้างใน) ต้องแก้ใน `.github/workflows/deploy.yml` ให้ใช้ `working-directory: manga-spotifly` และ `path: manga-spotifly/dist` แทน
