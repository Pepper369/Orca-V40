import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function extractArticleContent(html: string): Promise<string> {
  // Remove scripts, styles, comments, iframes
  let content = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<noscript>[\s\S]*?<\/noscript>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<aside[\s\S]*?<\/aside>/gi, "")
    .replace(/<form[\s\S]*?<\/form>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "");

  // Try multiple strategies to find article content
  let articleText = "";

  // Strategy 1: <article> tag
  const articleMatch = content.match(/<article[\s\S]*?<\/article>/i);
  if (articleMatch) {
    articleText = articleMatch[0];
  }

  // Strategy 2: Common content divs
  if (!articleText) {
    const patterns = [
      /<div[^>]*class="[^"]*article[^"]*"[^>]*>[\s\S]*?<\/div>/i,
      /<div[^>]*class="[^"]*content[^"]*"[^>]*>[\s\S]*?<\/div>/i,
      /<div[^>]*id="article"[^>]*>[\s\S]*?<\/div>/i,
      /<div[^>]*class="[^"]*story[^"]*"[^>]*>[\s\S]*?<\/div>/i,
      /<div[^>]*class="[^"]*post[^"]*"[^>]*>[\s\S]*?<\/div>/i,
      /<main[\s\S]*?<\/main>/i,
    ];
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        articleText = match[0];
        break;
      }
    }
  }

  // Strategy 3: Use body if nothing else found
  if (!articleText) {
    const bodyMatch = content.match(/<body[\s\S]*?<\/body>/i);
    if (bodyMatch) {
      articleText = bodyMatch[0];
    } else {
      articleText = content;
    }
  }

  // Extract paragraphs
  const paragraphs = [...articleText.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => m[1])
    .map((p) => p.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
    .filter((p) => p.length > 30);

  if (paragraphs.length > 0) {
    return paragraphs.join("\n\n");
  }

  // Strategy 4: Extract all text from divs with substantial content
  const divs = [...articleText.matchAll(/<div[^>]*>([\s\S]*?)<\/div>/gi)]
    .map((m) => m[1])
    .map((d) => d.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
    .filter((d) => d.length > 100 && d.length < 2000);

  if (divs.length > 0) {
    return divs.slice(0, 20).join("\n\n");
  }

  // Strategy 5: Fallback - extract all text
  const allText = articleText.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return allText.length > 500 ? allText : "";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const articleUrl = url.searchParams.get("url");

  if (!articleUrl) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(articleUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
        "Cache-Control": "no-cache",
      },
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json({ 
        content: `Không thể tải bài viết (HTTP ${response.status}). Vui lòng nhấn 'Xem nguồn gốc bài viết' để đọc trên trang gốc.`,
        url: articleUrl 
      });
    }

    const html = await response.text();
    const content = await extractArticleContent(html);

    if (!content || content.length < 100) {
      return NextResponse.json({ 
        content: "Nội dung bài viết được bảo vệ hoặc yêu cầu JavaScript. Vui lòng nhấn 'Xem nguồn gốc bài viết' để đọc trên trang gốc.",
        url: articleUrl 
      });
    }

    return NextResponse.json({ content, url: articleUrl });
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json({ 
      content: "Không thể kết nối đến nguồn bài viết. Vui lòng nhấn 'Xem nguồn gốc bài viết' để đọc trên trang gốc.",
      url: articleUrl
    });
  }
}
