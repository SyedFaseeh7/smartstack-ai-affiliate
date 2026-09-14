# SmartStack AI - Autonomous AI-Powered Affiliate Marketing Platform

**SmartStack AI** is a fully autonomous, AI-driven affiliate marketing web application and control center built to mine high-converting products, generate SEO-optimized product reviews and buyer guides, track affiliate referral clicks, and publish content automatically.

---

## 🌟 Key Features

- 🤖 **Autonomous AI Content Generator**: Generates high-intent product reviews, top 10 roundups, and comparison guides with JSON-LD schema markup, FTC disclosures, and CTA conversion links.
- 📦 **Automated Product Miner**: Mines high-converting products across **SaaS (PartnerStack)** and **Amazon Associates** (Amazon.in / Amazon.com).
- 🔒 **Encrypted Control Panel**: Access live click metrics, estimated revenue ($), and campaign settings behind a master passcode overlay (`/smartstack-control-panel-x99`).
- ⚡ **Click & SubID Referral Tracking**: Routes affiliate link clicks through `/api/track-click` for performance attribution.
- 🌐 **SEO Optimized Feeds**: Automatically builds dynamic `/sitemap.xml` and `/feed.xml` for instant search engine indexing.

---

## 🚀 Quick Start (Local Run)

```bash
# 1. Install dependencies
npm install

# 2. Launch server
node server.js
```

- **Public Site**: `http://localhost:3000`
- **Secret Control Panel**: `http://localhost:3000/smartstack-control-panel-x99`
- **Master PIN Passcode**: `admin123` (Configurable inside settings)

---

## ☁️ Deployment & GitHub Auto-Sync (Render / Vercel / Railway)

### Step 1: Initialize Git & Push to GitHub
Run the following commands in your terminal:

```bash
git init
git add .
git commit -m "Initial commit of SmartStack AI Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smartstack-ai-affiliate.git
git push -u origin main
```

### Step 2: Connect Free Hosting (Render / Railway / Vercel)

#### Option A: Render.com (Recommended for Node.js Express + Background Scheduler)
1. Log in to [Render.com](https://render.com/).
2. Click **New +** ➔ **Web Service**.
3. Connect your GitHub repository (`smartstack-ai-affiliate`).
4. Configure settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Click **Create Web Service**.

> 🎉 **Auto-Sync Enabled**: Render automatically deploys your updated website every time you `git push` to your GitHub repo!

---

## 🔑 How to Add Your Amazon Associate Tag
1. Open your control panel at `https://YOUR-APP.onrender.com/smartstack-control-panel-x99`.
2. Enter your master PIN (`admin123`).
3. Navigate to **Network Credentials**.
4. Enter your **Amazon Associate Store Tag ID** (e.g., `yourname-21` for Amazon India) and **PartnerStack ID**.
5. Click **Save Network Credentials**.
