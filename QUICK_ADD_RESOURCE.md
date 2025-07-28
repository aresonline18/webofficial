# 🚀 Quick Add Resource Guide

## 30-Second Resource Addition

### Step 1: Copy Template
Choose your resource type and copy the appropriate template:

**Case Study:**
```typescript
{
  id: "case-study-[amount]-[time]",
  imageUrl: "https://your-image.com/image.jpg",
  imageAlt: "Case Study Screenshot",
  title: "CASE STUDY: $[Amount] in [Time]",
  description: "How I achieved <strong class=\"font-bold text-[var(--shadow-navy)]\">$[amount] in [timeframe]</strong>",
  buttonText: "See case study",
  buttonUrl: "https://your-link.com",
  buttonColor: "blue",
  isActive: true
}
```

**Video Training:**
```typescript
{
  id: "[topic]-training",
  imageUrl: "https://your-image.com/thumb.jpg",
  imageAlt: "Video Training Thumbnail",
  title: "[Outcome] in [Timeframe]",
  description: "Watch me <strong class=\"font-bold text-[var(--shadow-navy)]\">demonstrate [process]</strong> step-by-step",
  buttonText: "Watch training",
  buttonUrl: "https://youtube.com/watch?v=xxx",
  buttonColor: "red",
  isActive: true
}
```

**Guide/Tool:**
```typescript
{
  id: "[name]-guide",
  imageUrl: "https://your-image.com/guide.jpg",
  imageAlt: "Guide Cover Image",
  title: "Complete Guide to [Topic]",
  description: "Step-by-step guide to <strong class=\"font-bold text-[var(--shadow-navy)]\">achieve [outcome]</strong>",
  buttonText: "Get free guide",
  buttonUrl: "https://your-link.com",
  buttonColor: "blue",
  isActive: true
}
```

### Step 2: Fill in Your Details
Replace all bracketed placeholders:
- `[amount]` → `2.67M`, `500K`, `1M`
- `[time]` → `19months`, `6weeks`, `1year`
- `[topic]` → `lead-generation`, `sales-funnel`
- `[outcome]` → `double your revenue`, `get 1000 leads`
- `[process]` → `cold email sequences`, `sales calls`

### Step 3: Add to Website
1. Open `client/src/data/resources.ts`
2. Paste your resource object into the `resources` array
3. Save the file
4. ✅ Done! Your resource appears automatically

## Button Color Guide
- **🔴 Red**: High-priority content (YouTube videos, main training)
- **🔵 Blue**: Secondary content (case studies, tools, guides)

## Image Requirements
- **Format**: Square (1:1 ratio)
- **Size**: 400x400px minimum
- **Quality**: High resolution, clear text
- **Background**: White or transparent preferred

## Writing Tips
- **Headlines**: Keep under 8 words, focus on outcome
- **Descriptions**: 1-2 lines max, bold the main benefit
- **Buttons**: Use action verbs ("Get", "See", "Watch", "Download")

## Examples of Great Headlines
✅ "$2.67M Case Study"
✅ "Double Your Sales in 30 Days"
✅ "Generate 10,000 Leads Monthly"

❌ "Business Growth Case Study Document"
❌ "Sales Training Video Series"
❌ "Lead Generation Information"

---

**Need help?** Check the full documentation in `RESOURCE_WORKFLOW.md`