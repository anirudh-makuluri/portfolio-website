# 🤖 Gemini AI Chatbot Setup Guide

## ✅ What's Been Changed

### 1. **Removed Knowledge Graph Visualization**
- ❌ No more background graph display
- ✅ Graph data structure still exists for chatbot context

### 2. **Integrated Google Gemini AI**
- ✅ Installed `@google/generative-ai` package
- ✅ Updated chat API to use Gemini Pro model
- ✅ Knowledge graph provides context to Gemini

### 3. **Chatbot Repositioned**
- Moved back to bottom-right corner (6rem from edges)
- Larger, more prominent button (14 x 14)

---

## 🔑 Setting Up Your API Key (IMPORTANT!)

### Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy the API key

### Step 2: Create `.env.local` File

In your project root (`portfolio-website` folder), create a file named `.env.local`:

```bash
# In the same folder as package.json
touch .env.local
```

### Step 3: Add Your API Key

Open `.env.local` and add:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

**Replace `your_actual_api_key_here` with the key you copied!**

Example:
```env
GEMINI_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567
```

### Step 4: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🔒 Security - How Your Key is Protected

### ✅ What We Did:
1. **`.env.local` is in `.gitignore`** - Never committed to Git
2. **Server-side only** - API key only used in backend API routes
3. **Not exposed to browser** - Client never sees the key
4. **Environment variable** - Secure storage method

### ⚠️ What to NEVER Do:
- ❌ Don't commit `.env.local` to Git
- ❌ Don't share your API key publicly
- ❌ Don't use API key in client-side code
- ❌ Don't hardcode the key in your code

---

## 🧠 How the Chatbot Works

### Architecture:

```
User Types Message
      ↓
Client (chatbot.tsx)
      ↓
API Route (/api/chat)
      ↓
1. Build Knowledge Graph (your portfolio data)
2. Query graph for relevant nodes
3. Build context from nodes + connections
4. Send to Gemini with system prompt
      ↓
Gemini AI (with portfolio context)
      ↓
Response back to user
```

### Knowledge Graph Context:

The chatbot has access to:
- ✅ All your **projects** (with descriptions, tech stacks)
- ✅ All your **skills** and **technologies**
- ✅ Your **experience** (companies, roles, dates)
- ✅ Your **certificates** (names, issuers, descriptions)
- ✅ **Connections** between everything (which projects use which tech, etc.)

---

## 💬 Testing Your Chatbot

### Sample Questions to Try:

1. **"What projects has Anirudh built?"**
   - Should list SmartDeploy, Chatify, LexiGuess, etc.

2. **"What are his AI/ML skills?"**
   - Should mention Gen AI, Langchain, TensorFlow, etc.

3. **"Tell me about his experience at Shardings"**
   - Should describe his role and work

4. **"Which projects use React and Firebase?"**
   - Should find Chatify, Shardings Meet

5. **"What certifications does he have?"**
   - Should list Oracle, Machine Learning, etc.

6. **"How does SmartDeploy work?"**
   - Should explain based on the description

---

## 🎯 API Configuration

### Current Settings:
```typescript
model: 'gemini-pro'              // Gemini Pro model
maxOutputTokens: 500             // Response length limit
temperature: 0.7                 // Creativity (0-1)
history: last 5 messages         // Conversation context
```

### To Adjust:

In `app/api/chat/route.ts`:

```typescript
// For longer responses:
maxOutputTokens: 1000

// For more creative responses:
temperature: 0.9

// For more factual responses:
temperature: 0.3

// For more conversation history:
const chatHistory = history?.slice(-10)  // Last 10 instead of 5
```

---

## 🚨 Troubleshooting

### Error: "Gemini API key not configured"
**Solution:** Make sure `.env.local` exists with your API key, then restart server

### Error: "Failed to generate response"
**Solutions:**
- Check if API key is valid
- Check if you have API quota remaining
- Check internet connection
- Look at terminal logs for detailed error

### Chatbot not responding:
1. Check browser console (F12) for errors
2. Check terminal for API errors
3. Verify `.env.local` is in project root
4. Restart dev server

### Response seems wrong or generic:
- The AI uses your knowledge graph for context
- If data is missing, add it to `lib/data.ts`
- The knowledge graph will automatically include it

---

## 📁 File Structure

```
portfolio-website/
├── .env.local                          ← YOUR API KEY HERE (create this!)
├── .env.example                        ← Template (will create)
├── app/
│   └── api/
│       └── chat/
│           └── route.ts                ← Gemini integration
├── components/
│   └── chatbot.tsx                     ← Chat UI
├── lib/
│   └── knowledge-graph.ts              ← Your portfolio data structure
└── GEMINI-SETUP.md                     ← This file
```

---

## 💡 Benefits of This Setup

### Why Gemini + Knowledge Graph?

1. **Accurate Responses**
   - Gemini gets exact data from your portfolio
   - No hallucinations about your experience

2. **Context-Aware**
   - Understands connections (projects ↔ tech ↔ skills)
   - Can answer complex queries

3. **Natural Conversation**
   - Gemini's language model makes it conversational
   - Maintains chat history

4. **Cost-Effective**
   - Gemini has generous free tier
   - Knowledge graph reduces token usage

5. **Easy to Update**
   - Just update `lib/data.ts`
   - Knowledge graph automatically rebuilds

---

## 🎨 Chatbot UI Features

- 💬 **Floating button** - Bottom right, gradient design
- 🎭 **Smooth animations** - Framer Motion
- 📱 **Responsive** - Works on all screen sizes
- 🌓 **Dark/Light mode** - Matches your theme
- ⌨️ **Keyboard support** - Press Enter to send
- 💬 **Typing indicator** - Shows when AI is thinking
- 📝 **Sample questions** - Helps users get started

---

## 📊 API Limits

### Gemini Free Tier:
- ✅ 60 requests per minute
- ✅ Plenty for a portfolio site!
- ✅ No credit card required

If you need more:
- Upgrade to paid plan
- Or add rate limiting to your API

---

## 🎯 Next Steps

1. ✅ **Add your API key to `.env.local`**
2. ✅ **Restart dev server**
3. ✅ **Test the chatbot!**
4. 🚀 **Deploy** (API key will be in deployment environment variables)

---

## 🚀 Deployment

### Vercel/Netlify:
1. Go to project settings
2. Add environment variable:
   - Name: `GEMINI_API_KEY`
   - Value: Your API key
3. Redeploy

### Other platforms:
- Add `GEMINI_API_KEY` to environment variables
- Make sure it's available to server-side code

---

## ✨ Your Chatbot is Ready!

Once you add the API key, visitors can:
- 💬 Ask about your experience
- 🎯 Learn about your projects
- 🛠️ Discover your skills
- 📜 View your certifications
- 🤝 Get personalized insights

**All powered by your knowledge graph and Gemini AI!** 🚀

---

## 📞 Support

If you have issues:
1. Check this guide first
2. Look at browser console
3. Check terminal logs
4. Verify API key is correct
5. Try the sample questions above

**The chatbot uses your portfolio data, so it's always accurate!** 🎯

