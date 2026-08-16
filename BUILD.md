# 全能生活工作台 · 安装包构建指南

本项目把单文件工作台 `www/index.html` 封装为可安装的 **桌面端** 与 **移动端** 应用。

- 桌面端：Electron → Windows `.exe` / macOS `.dmg` / Linux `AppImage`
- 移动端：Capacitor → Android `APK/AAB`；iOS `IPA`（需 Mac）

---

## 0. 准备环境

```bash
# 安装 Node.js 18+（已自带 npm）
cd package
npm install        # 安装 electron / electron-builder / capacitor
```

---

## 1. 桌面端安装包

```bash
# Windows 安装包（当前最常用）
npm run dist:win

# macOS
npm run dist:mac

# Linux
npm run dist:linux

# 或一次性按当前系统出包
npm run dist
```

产物在 `package/dist/`：
- Windows：`全能生活工作台-1.0.0-setup.exe`（NSIS 安装向导，可改安装目录、建桌面快捷方式）
- macOS：`全能生活工作台-1.0.0.dmg`
- Linux：`全能生活工作台-1.0.0.AppImage`

> 想换图标：在 `package/build/` 放 `icon.ico`(Win) / `icon.icns`(Mac) / `icon.png`(Linux)，并在 `package.json` 的 `build.win/mac/linux` 里加 `"icon":"build/icon.xxx"`。

---

## 2. Android 安装包（APK / AAB）

前置：安装 **Android Studio** 并配置 **Android SDK + 环境变量**（本沙箱无 SDK，需在本人机器执行）。

```bash
npm install
npx cap add android     # 生成 android/ 原生工程（首次）
npx cap sync android    # 把 www/ 同步进原生工程
```

然后用 **Android Studio** 打开 `package/android/`：
- 菜单 **Build → Generate Signed Bundle / APK**
- 选择 APK（直接安装）或 Android App Bundle（上架 Google Play）
- 输出 `.apk` / `.aab`，传到手机安装即可

---

## 3. iOS 安装包（IPA）

⚠️ **iOS 只能在 macOS + Xcode + 苹果开发者账号（$99/年）下构建**，Windows 无法生成 IPA。
工程已就绪，在 Mac 上执行：

```bash
npm install
npx cap add ios         # 生成 ios/ 原生工程（仅 Mac）
npx cap sync ios        # 同步 www/
```

用 **Xcode** 打开 `package/ios/App/App.xcworkspace`：
- 选真机或模拟器 → **Product → Run**（调试）
- 上架/出包：**Product → Archive** → 导出 IPA 或上传 App Store

---

## 4. 修改工作台内容

直接编辑 `package/www/index.html`（与根目录 `life-workspace.html` 是同一份），
重新跑对应构建命令即可。所有数据存在应用本地存储，桌面/手机各自独立。

---

## 5. 常见问题

- **macOS 打开 dmg 提示“已损坏”**：终端执行 `sudo xattr -rd com.apple.quarantine /Applications/全能生活工作台.app`（或用开发者签名）。
- **安卓真机装不上未知来源 APK**：手机设置里允许「安装未知来源应用」。
- **想自动更新**：可接入 electron-updater（桌面）/ Capacitor 应用内更新（移动），属进阶项，按需追加。
