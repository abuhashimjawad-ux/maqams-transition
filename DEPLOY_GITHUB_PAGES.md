# نشر الصفحة على GitHub Pages

المشروع صار جاهزًا من جهة الملفات:
- الصفحة الرئيسية: `index.html`
- الفيديوهات المستخدمة موجودة داخل المشروع في: `audio/transitions/library`

اتبع الخطوات التالية:

1. أنشئ مستودعًا جديدًا على GitHub.
2. افتح الطرفية داخل هذا المجلد.
3. نفّذ الأوامر التالية بعد استبدال الرابط برابط مستودعك:

```powershell
git add .
git commit -m "Prepare site for GitHub Pages"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

4. افتح GitHub ثم ادخل إلى:
   `Settings > Pages`
5. في قسم `Build and deployment` اختر:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
6. اضغط `Save`.

بعد دقائق سيظهر رابط النشر بهذا الشكل غالبًا:

`https://USERNAME.github.io/REPO/`

ملاحظات:
- لأن الصفحة تعتمد على ملفات فيديو محلية داخل المشروع، يجب إبقاء مجلد `audio/transitions/library` كما هو عند الرفع.
- إذا أضفت فيديوهات جديدة لاحقًا، ارفعها داخل هذا المجلد ثم نفّذ:

```powershell
git add .
git commit -m "Add transition videos"
git push
```
